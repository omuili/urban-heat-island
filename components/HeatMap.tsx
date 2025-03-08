"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface HeatMapProps {
  data: any[]
  selectedCity: string
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export default function HeatMap({ data, selectedCity, selectedDate }: HeatMapProps) {
  const filteredData = data
    .filter((item) => new Date(item.date).toDateString() === selectedDate.toDateString())
    .sort((a, b) => Number.parseInt(a.hour) - Number.parseInt(b.hour))
    .map((item) => ({
      ...item,
      temperature: Number(item.temperature),
      time: `${item.hour.padStart(2, "0")}:00`,
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Heatmap</CardTitle>
        <CardDescription>
          {selectedCity} - {format(selectedDate, "PPP")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} label={{ value: "°F", angle: -90, position: "insideLeft" }} />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}°F`, "Temperature"]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

