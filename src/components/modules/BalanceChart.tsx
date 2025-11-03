"use client";

import { PieChart as PieChartIcon } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import EmptyState from "@/components/modules/EmptyState";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Account } from "@/lib";

interface BalanceChartProps {
  account: Account;
}

const COLORS = [
  "var(--mono-chart-1)",
  "var(--mono-chart-2)",
  "var(--mono-chart-3)",
  "var(--mono-chart-4)",
  "var(--mono-chart-5)",
  "var(--mono-chart-6)",
  "var(--mono-chart-7)",
  "var(--mono-chart-8)",
];

export const BalanceChart = ({ account }: BalanceChartProps) => {
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
          title="No funds yet"
          description="Add your first fund to see your balance distribution"
        />
      ) : account.totalBalance === 0 ? (
        <EmptyState
          icon={PieChartIcon}
          title="No transactions yet"
          description="Add your first transaction to see your balance distribution"
        />
      ) : (
        <ChartContainer
          className="mx-auto aspect-square max-h-[250px]"
          config={{}}
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
