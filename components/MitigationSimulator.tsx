"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function MitigationSimulator({ data, selectedCity }: { data: any[]; selectedCity: string }) {
  const [strategies, setStrategies] = useState<{ [key: string]: number }>({})
  const [temperatureReduction, setTemperatureReduction] = useState(0)

  useEffect(() => {
    const cityData = data.filter((item) => item.city === selectedCity)
    const uniqueStrategies = [...new Set(cityData.map((item) => item.strategy))]
    const initialStrategies = uniqueStrategies.reduce(
      (acc, strategy) => {
        acc[strategy] = 0
        return acc
      },
      {} as { [key: string]: number },
    )
    setStrategies(initialStrategies)
  }, [data, selectedCity])

  useEffect(() => {
    const reduction = Object.entries(strategies).reduce((total, [strategy, value]) => {
      const strategyData = data.find((item) => item.city === selectedCity && item.strategy === strategy)
      if (strategyData) {
        return total + (value / 100) * Number.parseFloat(strategyData.temperature_reduction)
      }
      return total
    }, 0)
    setTemperatureReduction(reduction)
  }, [strategies, data, selectedCity])

  const handleStrategyChange = (strategy: string, value: number[]) => {
    setStrategies((prev) => ({ ...prev, [strategy]: value[0] }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mitigation Simulator</CardTitle>
        <CardDescription>Simulate heat reduction strategies for {selectedCity}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(strategies).map(([strategy, value]) => (
            <div key={strategy}>
              <label className="text-sm font-medium">{strategy} (%)</label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[value]}
                onValueChange={(newValue) => handleStrategyChange(strategy, newValue)}
              />
              <span className="text-sm">{value}%</span>
            </div>
          ))}
          <div>
            <p className="text-sm font-medium">Estimated Temperature Reduction</p>
            <p className="text-2xl font-bold">{temperatureReduction.toFixed(2)}°F</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

