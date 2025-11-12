"use client";

import { useEffect } from "react";
import { BalanceChart, Funds, Header, Loading } from "@/components/modules";
import { useDatabase } from "@/lib/useSupabase";
import useLocalization from "@/lib/useLocalization";
import { useAuth } from "@/lib/useAuth";

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
  const { account, isLoading, addFund, deleteFund, updateFundBalance } =
    useDatabase();
  const { isAuthenticated, isLoading: authLoading, redirectToLogin } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated, authLoading, redirectToLogin]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex justify-center h-full items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  // Don't render main content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

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
              updateFundBalance={updateFundBalance}
            />
          </>
        )}
      </div>
    </main>
  );
}
