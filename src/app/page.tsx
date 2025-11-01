import {BalanceChart} from "@/components/modules";

export default function Home() {
  return (
      <main className="flex min-h-screen items-center w-full justify-center bg-white dark:bg-black sm:items-start">
          <div className="flex flex-col items-center justify-center w-full max-w-xl">
            <BalanceChart chartDatas={{}}/>
          </div>
      </main>
  );
}
