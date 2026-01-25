import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAccounts } from "./useAccounts";

export const useFunds = () => {
  const { accounts } = useAccounts();
  const funds = useQuery(api.funds.get);

  const createFund = useMutation(api.funds.createFund);
  const deleteFund = useMutation(api.funds.deleteFund);
  const updateFundBalance = useMutation(api.funds.updateFundBalance);

  const handleCreateFund = (name: string) => {
    try {
      if (accounts && accounts.length > 0)
        createFund({ name, balance: 0, accountId: accounts[0]._id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFund = (id: string) => {
    try {
      deleteFund({ id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateFundBalance = (
    id: string,
    currentBalance: number,
    amount: number,
  ) => {
    try {
      updateFundBalance({ id, currentBalance, amount });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    funds,
    accounts,
    handleCreateFund,
    handleDeleteFund,
    handleUpdateFundBalance,
  };
};
