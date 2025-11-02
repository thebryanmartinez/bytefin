"use client";

import { BalanceChart, Funds, Header } from "@/components/modules";
import { useDatabase } from "@/lib";

export default function Home() {
  const { account, isLoading, addFund, deleteFund, addTransaction } = useDatabase();

  return (
    <main className="flex min-h-screen w-full justify-center bg-white dark:bg-black sm:items-start">
      <div className="flex flex-col w-full max-w-xl px-8">
        {isLoading || !account ? (
          <>Loader...</>
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
