"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface EnergyConsumptionProps {
  data: any[]
  selectedCity: string
}

export default function EnergyConsumption({ data, selectedCity }: EnergyConsumptionProps) {
  const latestData = data
    .filter((item) => item.city === selectedCity)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

  if (!latestData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption</CardTitle>
          <CardDescription>No data available for {selectedCity}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const total = Number.parseFloat(latestData.total_consumption) || 0
  const chartData = [
    { name: "Residential", value: Number.parseFloat(latestData.residential) || 0 },
    { name: "Commercial", value: Number.parseFloat(latestData.commercial) || 0 },
    { name: "Industrial", value: Number.parseFloat(latestData.industrial) || 0 },
    { name: "Cooling", value: Number.parseFloat(latestData.cooling_specific) || 0 },
  ].map((item) => ({
    ...item,
    percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : "0.0",
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Consumption</CardTitle>
        <CardDescription>Breakdown for {selectedCity}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value.toFixed(1)} kWh`, "Consumption"]} />
            <Legend
              formatter={(value, entry: any) => {
                const dataEntry = chartData[entry.payload.index]
                return dataEntry ? `${value} (${dataEntry.percentage}%)` : value
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

