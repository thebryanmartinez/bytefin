"use client";

import { useEffect, useState } from "react";
import { database } from "./database";
import type { Account, Fund, Transaction } from "./index";

export function useDatabase() {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    try {
      const accounts = await database.accounts.toArray();
      if (accounts.length === 0) {
        // Create default account
        const defaultAccount: Account = {
          id: "1",
          name: "My Account",
          funds: [],
          totalBalance: 0,
        };
        await database.accounts.add(defaultAccount);
        setAccount(defaultAccount);
      } else {
        // Load existing account with sections and transactions
        const account = accounts[0];
        const funds = await database.funds
          .where("accountId")
          .equals(account.id)
          .toArray();

        // Load transactions for each section
        const fundsWithTransactions = await Promise.all(
          funds.map(async (fund: Fund) => {
            const transactions = await database.transactions
              .where("fundId")
              .equals(fund.id)
              .toArray();
            return { ...fund, transactions };
          }),
        );

        const accountWithFunds = { ...account, funds: fundsWithTransactions };
        setAccount(accountWithFunds);
      }
    } catch (error) {
      console.error("Error loading account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAccount = async (updates: Partial<Account>) => {
    if (!account) return;

    try {
      const updatedAccount = { ...account, ...updates };
      await database.accounts.update(account.id, updates);
      setAccount(updatedAccount);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const addFund = async (name: string) => {
    if (!account || !name.trim()) return;

    try {
      const newFund: Fund = {
        id: Date.now().toString(),
        name: name.trim(),
        transactions: [],
        total: 0,
        accountId: account.id,
      };

      await database.funds.add({ ...newFund, accountId: account.id });

      const updatedFunds = [...account.funds, newFund];
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
      // Delete all transactions in the section
      await database.transactions.where("fundId").equals(fundId).delete();
      // Delete the section
      await database.funds.delete(fundId);

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

  const addTransaction = async (
    fundId: string,
    amount: number,
    description: string,
  ) => {
    if (!account || !description.trim() || isNaN(amount)) return;

    try {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount,
        description: description.trim(),
        date: new Date().toISOString(),
        fundId,
      };

      await database.transactions.add(newTransaction);

      // Update section with new transaction
      const updatedFunds = account.funds.map((fund) => {
        if (fund.id === fundId) {
          const updatedTransactions = [...fund.transactions, newTransaction];
          const newTotal = updatedTransactions.reduce(
            (sum, t) => sum + t.amount,
            0,
          );
          return {
            ...fund,
            transactions: updatedTransactions,
            total: newTotal,
          };
        }
        return fund;
      });

      const newTotalBalance = updatedFunds.reduce((sum, s) => sum + s.total, 0);

      await updateAccount({
        funds: updatedFunds,
        totalBalance: newTotalBalance,
      });

      // Update fund total in database
      const fundToUpdate = updatedFunds.find((f) => f.id === fundId);
      if (fundToUpdate) {
        await database.funds.update(fundId, { total: fundToUpdate.total });
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return {
    account,
    isLoading,
    addFund,
    deleteFund,
    addTransaction,
    updateAccount,
  };
}
