"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Account } from "@/lib";
import EmptyState from "@/components/modules/EmptyState";
import { PieChart as PieChartIcon } from "lucide-react";

interface BalanceChartProps {
  account: Account;
}

const COLORS = [
  "#f8f9fa",
  "#e9ecef",
  "#dee2e6",
  "#ced4da",
  "#adb5bd",
  "#6c757d",
  "#495057",
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
          config={{
            value: {
              label: "Amount",
            },
          }}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="funds"
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
