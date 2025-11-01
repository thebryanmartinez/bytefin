"use client"

import { useMemo } from "react"
import {Label, Pie, PieChart} from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface BalanceChartProps {
    chartDatas: ChartConfig;
}

const chartData = [
    {funds: "chrome", balance: 275, fill: "var(--color-chrome)"},
    {funds: "safari", balance: 200, fill: "var(--color-safari)"},
    {funds: "firefox", balance: 287, fill: "var(--color-firefox)"},
    {funds: "edge", balance: 173, fill: "var(--color-edge)"},
    {funds: "other", balance: 190, fill: "var(--color-other)"},
]

const chartConfig = {
    visitors: {
        label: "Balance",
    },
    chrome: {
        label: "Chrome",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Firefox",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Edge",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export const BalanceChart = ({chartDatas}: BalanceChartProps) => {
    const totalVisitors = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.balance, 0)
    }, [])

    return (
        <section className="w-full ">
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel/>}
                />
                <Pie
                    data={chartData}
                    dataKey="balance"
                    nameKey="funds"
                    innerRadius={60}
                    strokeWidth={5}
                >
                    <Label
                        content={({viewBox}) => {
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
                                            className="fill-foreground text-2xl font-bold"
                                        >
                                            {totalVisitors.toLocaleString()}$
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
        </section>
    )
}
