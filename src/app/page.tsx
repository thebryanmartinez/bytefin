import { BalanceChart, Funds, Header } from "@/components/modules";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full justify-center bg-white dark:bg-black sm:items-start">
      <div className="flex flex-col w-full max-w-xl px-8">
        <Header />
        <BalanceChart chartDatas={{}} />
        <Funds
          funds={[
            { name: "Car", balance: 500, id: "1" },
            { name: "Car", balance: 500, id: "2" },
          ]}
        />
      </div>
    </main>
  );
}
