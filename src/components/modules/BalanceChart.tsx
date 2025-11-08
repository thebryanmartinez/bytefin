"use client";

import { PieChart as PieChartIcon } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import EmptyState from "@/components/modules/EmptyState";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import type { Account } from "@/lib";
import useLocalization from "@/lib/useLocalization";

interface BalanceChartProps {
  account: Account;
}

const COLORS = [
  "var(--chart-0)",
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="border-border bg-background grid min-w-[6rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-shadow">
        <div className="text-center flex flex-col items-center">
          <span className="text-muted-foreground font-bold">{data.name}</span>
          <span className="text-foreground font-mono font-medium tabular-nums">
            {data.value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const BalanceChart = ({ account }: BalanceChartProps) => {
  const { t } = useLocalization();

  const chartData = account.funds.map((fund, index) => ({
    name: fund.name,
    value: fund.total,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <section className="w-full ">
      {account.funds.length === 0 ? (
        <EmptyState
          icon={PieChartIcon}
          title={t("balanceChart.noFundsYet")}
          description={t("balanceChart.noFundsDescription")}
        />
      ) : account.totalBalance === 0 ? (
        <EmptyState
          icon={PieChartIcon}
          title={t("balanceChart.noTransactionsYet")}
          description={t("balanceChart.noTransactionsDescription")}
        />
      ) : (
        <ChartContainer
          className="mx-auto aspect-square max-h-[250px]"
          config={{}}
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-lg font-bold"
                        >
                          {account.totalBalance.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
    </section>
  );
};
