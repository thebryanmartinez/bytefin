"use client";

import { useEffect, useState } from "react";
import type { Database } from "@/lib/supabase";
import { createClient } from "@/lib/supabase";
import type { Account, Fund } from "./index";

type BytefinFund = Database["public"]["Tables"]["bytefin_funds"]["Row"];

export function useDatabase() {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    try {
      const { data: supabaseAccounts, error: accountError } = await supabase
        .from("bytefin_accounts")
        .select("*");

      if (accountError) {
        throw accountError;
      }

      if (!supabaseAccounts || supabaseAccounts.length === 0) {
        // Create default account in Supabase
        const { data: newAccount, error: insertError } = await supabase
          .from("bytefin_accounts")
          .insert({ name: "My Account", balance: 0 })
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        const defaultAccount: Account = {
          id: newAccount.id.toString(),
          name: newAccount.name || "My Account",
          funds: [],
          totalBalance: newAccount.balance || 0,
        };
        setAccount(defaultAccount);
      } else {
        // Load existing account with funds
        const supabaseAccount = supabaseAccounts[0];

        // Load funds for this account
        const { data: supabaseFunds, error: fundsError } = await supabase
          .from("bytefin_funds")
          .select("*")
          .eq("account_id", supabaseAccount.id);

        if (fundsError) {
          throw fundsError;
        }

        // Convert Supabase funds to our local format
        const funds: Fund[] = (supabaseFunds || []).map(
          (fund: BytefinFund) => ({
            id: fund.id.toString(),
            name: fund.name || "Unnamed Fund",
            transactions: [],
            total: fund.balance || 0,
            accountId: fund.account_id?.toString() || "",
          }),
        );

        const accountWithFunds: Account = {
          id: supabaseAccount.id.toString(),
          name: supabaseAccount.name || "My Account",
          funds,
          totalBalance: supabaseAccount.balance || 0,
        };
        setAccount(accountWithFunds);
      }
    } catch (error) {
      console.error("Error loading account from Supabase:", error);
      setAccount(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAccount = async (updates: Partial<Account>) => {
    if (!account) return;

    try {
      const updatedAccount = { ...account, ...updates };

      const { error } = await supabase
        .from("bytefin_accounts")
        .update({
          name: updatedAccount.name,
          balance: updatedAccount.totalBalance,
        })
        .eq("id", account.id);

      if (error) {
        throw error;
      }

      setAccount(updatedAccount);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const addFund = async (name: string) => {
    if (!account || !name.trim()) return;

    try {
      const { data: newFund, error } = await supabase
        .from("bytefin_funds")
        .insert({
          name: name.trim(),
          balance: 0,
          account_id: parseInt(account.id),
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      const fund: Fund = {
        id: newFund.id.toString(),
        name: newFund.name || name.trim(),
        transactions: [],
        total: newFund.balance || 0,
        accountId: newFund.account_id?.toString() || account.id,
      };

      const updatedFunds = [...account.funds, fund];
      const newTotalBalance = updatedFunds.reduce((sum, s) => sum + s.total, 0);

      await updateAccount({
        funds: updatedFunds,
        totalBalance: newTotalBalance,
      });
    } catch (error) {
      console.error("Error adding fund:", error);
    }
  };

  const deleteFund = async (fundId: string) => {
    if (!account) return;

    try {
      const { error } = await supabase
        .from("bytefin_funds")
        .delete()
        .eq("id", fundId);

      if (error) {
        throw error;
      }

      const updatedFunds = account.funds.filter((s) => s.id !== fundId);
      const newTotalBalance = updatedFunds.reduce((sum, s) => sum + s.total, 0);

      await updateAccount({
        funds: updatedFunds,
        totalBalance: newTotalBalance,
      });
    } catch (error) {
      console.error("Error deleting fund:", error);
    }
  };

  const updateFundBalance = async (fundId: string, newBalance: number) => {
    if (!account) return;

    try {
      let { error } = await supabase
        .from("bytefin_funds")
        .update({ balance: newBalance })
        .eq("id", fundId);

      if (error) {
        const numericId = parseInt(fundId);
        const { error: numericError } = await supabase
          .from("bytefin_funds")
          .update({ balance: newBalance })
          .eq("id", numericId);

        if (numericError) {
          throw numericError;
        }
      }

      // Update local state
      const updatedFunds = account.funds.map((fund) => {
        if (fund.id === fundId) {
          return { ...fund, total: newBalance };
        }
        return fund;
      });

      const newTotalBalance = updatedFunds.reduce((sum, s) => sum + s.total, 0);

      await updateAccount({
        funds: updatedFunds,
        totalBalance: newTotalBalance,
      });
    } catch (error) {
      console.error("Error updating fund balance:", error);
    }
  };

  return {
    account,
    isLoading,
    addFund,
    deleteFund,
    updateFundBalance,
    updateAccount,
  };
}
