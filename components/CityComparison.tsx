"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CityComparisonProps {
  data: any[]
  cities: string[]
}

export default function CityComparison({ data, cities }: CityComparisonProps) {
  // Process data to get average temperatures by month for each city
  const processedData = data.reduce((acc: any[], item) => {
    const date = new Date(item.date)
    const month = date.toLocaleString("default", { month: "short" })
    const city = item.city
    const temp = Number(item.temperature)

    const existingEntry = acc.find((entry) => entry.month === month)
    if (existingEntry) {
      if (!existingEntry[`${city}_count`]) {
        existingEntry[`${city}_count`] = 0
        existingEntry[`${city}_sum`] = 0
      }
      existingEntry[`${city}_count`]++
      existingEntry[`${city}_sum`] += temp
      existingEntry[city] = existingEntry[`${city}_sum`] / existingEntry[`${city}_count`]
    } else {
      const newEntry: any = { month }
      cities.forEach((c) => {
        newEntry[`${c}_count`] = 0
        newEntry[`${c}_sum`] = 0
      })
      newEntry[`${city}_count`] = 1
      newEntry[`${city}_sum`] = temp
      newEntry[city] = temp
      acc.push(newEntry)
    }
    return acc
  }, [])

  // Sort months chronologically
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const sortedData = processedData.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month))

  // Generate unique colors for each city
  const cityColors = cities.reduce(
    (acc, city, index) => {
      acc[city] = `hsl(${(index * 360) / cities.length}, 70%, 50%)`
      return acc
    },
    {} as { [key: string]: string },
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>City Temperature Comparison</CardTitle>
        <CardDescription>Average monthly temperatures across cities</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: "°F", angle: -90, position: "insideLeft" }} />
            <Tooltip formatter={(value: number) => [`${value.toFixed(1)}°F`, "Temperature"]} />
            <Legend />
            {cities.map((city) => (
              <Line
                key={city}
                type="monotone"
                dataKey={city}
                stroke={cityColors[city]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

