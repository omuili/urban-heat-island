"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

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
      // Find the latest data for the selected city
      const cityLandUseData = landUseData.filter((item) => item.city === selectedCity)
      const cityEnergyData = energyData.filter((item) => item.city === selectedCity)

      const latestLandUse = cityLandUseData.length > 0 ? cityLandUseData[0] : null
      const latestEnergy = cityEnergyData.length > 0 ? cityEnergyData[0] : null

      if (!latestLandUse || !latestEnergy) {
        throw new Error("Missing required data for prediction")
      }

      // Prepare query parameters
      const params = new URLSearchParams({
        city: selectedCity,
        hour: "12", // Noon
        totalConsumption: latestEnergy.total_consumption || "5000",
        coolingSpecific: latestEnergy.cooling_specific || "1000",
        builtUpArea: latestLandUse.built_up_area || "50000",
        greenSpace: latestLandUse.green_space || "10000",
      })

      // Make API request
      const response = await fetch(`/api/predict?${params}`)

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`API error: ${errorData}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setPrediction(Number(data.prediction))
    } catch (err) {
      console.error("Prediction error:", err)
      setError(err instanceof Error ? err.message : "Failed to generate prediction")
    } finally {
      setLoading(false)
    }
  }

  // Determine if the prediction is concerning
  const isPredictionHigh = prediction !== null && prediction > 85

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Predictions</CardTitle>
        <CardDescription>Future heat island effects for {selectedCity}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Click the button to get a temperature prediction based on current data:</p>
        <Button onClick={getPrediction} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Prediction"
          )}
        </Button>

        {prediction !== null && (
          <div className="mt-4 p-4 border rounded-md bg-slate-50">
            <p className="text-lg font-semibold">
              Predicted temperature:
              <span className={isPredictionHigh ? "text-red-600" : "text-green-600"}> {prediction.toFixed(1)}°F</span>
            </p>

            <p className="mt-2 text-sm text-slate-600">
              This prediction is based on current land use patterns, energy consumption, and historical temperature
              data.
            </p>

            {isPredictionHigh && (
              <p className="mt-2 text-sm text-red-600">
                This temperature is concerning and may lead to increased health risks. Consider implementing mitigation
                strategies.
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

