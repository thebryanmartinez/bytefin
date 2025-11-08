"use client";

import { useEffect } from "react";
import { BalanceChart, Funds, Header, Loading } from "@/components/modules";
import { useDatabase } from "@/lib";
import useLocalization from "@/lib/useLocalization";

export function RegisterServiceWorker() {
  const { t } = useLocalization();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log(t("serviceWorker.registrationSuccess")))
        .catch((err) =>
          console.error(t("serviceWorker.registrationFailed"), err),
        );
    }
  }, [t]);

  return null;
}

export default function Home() {
  const { account, isLoading, addFund, deleteFund, addTransaction } =
    useDatabase();

  return (
    <main className="flex min-h-screen w-full justify-center bg-background sm:items-start">
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
