"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface DataPanelProps {
  data: any[]
  selectedCity: string
  selectedDate: Date
}

export default function DataPanel({ data, selectedCity, selectedDate }: DataPanelProps) {
  const filteredData = data.filter(
    (item) => item.city === selectedCity && new Date(item.date).toDateString() === selectedDate.toDateString(),
  )

  const calculateStats = () => {
    if (filteredData.length === 0) return null

    const temperatures = filteredData.map((item) => Number(item.temperature))
    const avgTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length
    const maxTemp = Math.max(...temperatures)
    const heatIndex = maxTemp + (Math.random() * 5 + 3) // Simulated heat index

    return {
      avgTemp: avgTemp.toFixed(1),
      maxTemp: maxTemp.toFixed(1),
      heatIndex: heatIndex.toFixed(1),
    }
  }

  const stats = calculateStats()

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Urban Heat Data</CardTitle>
          <CardDescription>No data available for selected date</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Urban Heat Data</CardTitle>
        <CardDescription>
          {selectedCity} - {format(selectedDate, "PPP")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Average Temperature</p>
            <p className="text-2xl font-bold">{stats.avgTemp}°F</p>
          </div>
          <div>
            <p className="text-sm font-medium">Maximum Temperature</p>
            <p className="text-2xl font-bold">{stats.maxTemp}°F</p>
          </div>
          <div>
            <p className="text-sm font-medium">Heat Index</p>
            <p className="text-2xl font-bold">{stats.heatIndex}°F</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

