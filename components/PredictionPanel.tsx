"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PredictionPanelProps {
  selectedCity: string
  temperatureData: any[]
  landUseData: any[]
  energyData: any[]
}

export default function PredictionPanel({
  selectedCity,
  temperatureData,
  landUseData,
  energyData,
}: PredictionPanelProps) {
  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getPrediction = async () => {
    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const latestLandUse = landUseData.find((item) => item.city === selectedCity)
      const latestEnergy = energyData.find((item) => item.city === selectedCity)

      if (!latestLandUse || !latestEnergy) {
        throw new Error("Missing required data for prediction")
      }

      const queryParams = new URLSearchParams({
        city: selectedCity,
        hour: "12",
        totalConsumption: latestEnergy.total_consumption,
        coolingSpecific: latestEnergy.cooling_specific,
        builtUpArea: latestLandUse.built_up_area,
        greenSpace: latestLandUse.green_space,
      })

      const response = await fetch(`/api/predict?${queryParams}`)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to generate prediction: ${errorText}`)
      }

      const data = await response.json()
      setPrediction(Number(data.prediction))
    } catch (err) {
      console.error("Prediction error:", err)
      setError(err instanceof Error ? err.message : "Failed to generate prediction")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Predictions</CardTitle>
        <CardDescription>Future heat island effects for {selectedCity}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Click the button to get a temperature prediction based on current data:</p>
        <Button onClick={getPrediction} disabled={loading}>
          {loading ? "Generating..." : "Generate Prediction"}
        </Button>
        {prediction !== null && (
          <div className="mt-4 space-y-2">
            <p className="text-lg font-semibold">Predicted temperature: {prediction.toFixed(1)}°F</p>
            <p className="text-sm text-muted-foreground">
              This prediction is based on current land use patterns and energy consumption data.
            </p>
          </div>
        )}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </CardContent>
    </Card>
  )
}

