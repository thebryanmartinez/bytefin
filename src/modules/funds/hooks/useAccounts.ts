import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

export const useAccounts = () => {
  const accounts = useQuery(api.accounts.get);

  const updateAccountBalance = useMutation(api.accounts.updateAccountBalance);

  const handleUpdateAccountBalance = (
    id: Id<"accounts">,
    currentBalance: number,
    amount: number,
  ) => {
    try {
      updateAccountBalance({ id, currentBalance, amount });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    accounts,
    handleUpdateAccountBalance,
  };
};
