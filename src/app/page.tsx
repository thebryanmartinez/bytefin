"use client";

import { BalanceChart, Funds, Header, Loading } from "@/components/modules";
import { useDatabase } from "@/lib";

export default function Home() {
  const { account, isLoading, addFund, deleteFund, addTransaction } =
    useDatabase();

  return (
    <main className="flex min-h-screen w-full justify-center bg-slate-50 dark:bg-slate-950 sm:items-start">
      <div className="flex flex-col w-full max-w-xl px-8 flex-1 h-dvh">
        {isLoading || !account ? (
          <div className="flex justify-center h-full items-center">
            <Loading />
          </div>
        ) : (
          <>
            <Header />
            <BalanceChart account={account} />
            <Funds
              funds={account.funds}
              addFund={addFund}
              deleteFund={deleteFund}
              addTransaction={addTransaction}
            />
          </>
        )}
      </div>
    </main>
  );
}
