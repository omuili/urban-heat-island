"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CityComparisonProps {
  data: any[]
  cities: string[]
}

export default function CityComparison({ data, cities }: CityComparisonProps) {
  // Group and calculate monthly averages
  const monthlyData = data.reduce((acc: any[], item) => {
    const date = new Date(item.date)
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()
    const key = `${month}-${year}`

    // Find or create entry for this month
    let entry = acc.find((e) => e.key === key)
    if (!entry) {
      entry = {
        key,
        month,
        year,
        monthIndex: date.getMonth(),
      }
      // Initialize temperature sums and counts for each city
      cities.forEach((city) => {
        entry[`${city}_sum`] = 0
        entry[`${city}_count`] = 0
        entry[city] = null
      })
      acc.push(entry)
    }

    // Add temperature data
    if (item.temperature && !isNaN(Number(item.temperature))) {
      entry[`${item.city}_sum`] += Number(item.temperature)
      entry[`${item.city}_count`] += 1
      entry[item.city] = entry[`${item.city}_sum`] / entry[`${item.city}_count`]
    }

    return acc
  }, [])

  // Get the most recent year's data
  const latestYear = Math.max(...monthlyData.map((item) => item.year))
  const chartData = monthlyData.filter((item) => item.year === latestYear).sort((a, b) => a.monthIndex - b.monthIndex)

  // Generate colors for each city
  const cityColors = {
    "New York": "#FF4136", // Red
    "Los Angeles": "#FFDC00", // Yellow
    Chicago: "#2ECC40", // Green
    Houston: "#0074D9", // Blue
    Phoenix: "#B10DC9", // Purple
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>City Temperature Comparison</CardTitle>
        <CardDescription>Average monthly temperatures across cities</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" padding={{ left: 20, right: 20 }} />
            <YAxis
              label={{
                value: "Temperature (°F)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}°F`, "Temperature"]}
              labelFormatter={(label) => `${label}`}
            />
            <Legend />
            {cities.map((city) => (
              <Line
                key={city}
                type="monotone"
                dataKey={city}
                name={city}
                stroke={cityColors[city as keyof typeof cityColors]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

