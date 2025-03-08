"use client"

import { useState, useEffect } from "react"
import HeatMap from "./HeatMap"
import DataPanel from "./DataPanel"
import PredictionPanel from "./PredictionPanel"
import InfoPanel from "./InfoPanel"
import CitySelector from "./CitySelector"
import CityComparison from "./CityComparison"
import GreenSpaceAnalysis from "./GreenSpaceAnalysis"
import EnergyConsumption from "./EnergyConsumption"
import MitigationSimulator from "./MitigationSimulator"
import HealthImpact from "./HealthImpact"
import AlertSystem from "./AlertSystem"
import LoadingSpinner from "./LoadingSpinner"
import Map from "./Map"
import UrbanHeatSection from "./UrbanHeatSection"

interface Dataset {
  [key: string]: any[]
}

const DATASETS = [
  "temperature_data",
  "land_use_data",
  "energy_consumption_data",
  "health_impact_data",
  "air_quality_data",
  "weather_station_data",
  "mitigation_strategies_data",
  "urban_development_data",
]

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [cities, setCities] = useState<string[]>([])
  const [datasets, setDatasets] = useState<Dataset>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCities()
  }, [])

  useEffect(() => {
    if (selectedCity) {
      fetchAllDatasets()
    }
  }, [selectedCity])

  const fetchCities = async () => {
    const response = await fetch("/api/data?dataset=temperature_data")
    const data = await response.json()
    const uniqueCities = [...new Set(data.map((item: any) => item.city))] as string[]
    setCities(uniqueCities)
    setSelectedCity(uniqueCities[0])
  }

  const fetchAllDatasets = async () => {
    setLoading(true)
    const fetchedDatasets: { [key: string]: any[] } = {}

    try {
      const promises = DATASETS.map((dataset) =>
        fetch(`/api/data?dataset=${dataset}&city=${selectedCity}`).then((res) => res.json()),
      )
      const results = await Promise.all(promises)

      DATASETS.forEach((dataset, index) => {
        fetchedDatasets[dataset] = results[index]
      })

      setDatasets(fetchedDatasets)
    } catch (error) {
      console.error("Error fetching datasets:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <CitySelector cities={cities} selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        <Map selectedCity={selectedCity} data={datasets.temperature_data || []} />
        <CityComparison data={datasets.temperature_data} cities={cities} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GreenSpaceAnalysis data={datasets.land_use_data} selectedCity={selectedCity} />
          <EnergyConsumption data={datasets.energy_consumption_data} selectedCity={selectedCity} />
          <UrbanHeatSection selectedCity={selectedCity} data={datasets.temperature_data} />
        </div>
      </div>
      <div className="space-y-4">
        <HeatMap
          data={datasets.temperature_data || []}
          selectedCity={selectedCity}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <DataPanel data={datasets.temperature_data} selectedCity={selectedCity} selectedDate={selectedDate} />
        <PredictionPanel
          selectedCity={selectedCity}
          temperatureData={datasets.temperature_data || []}
          landUseData={datasets.land_use_data || []}
          energyData={datasets.energy_consumption_data || []}
        />
        <MitigationSimulator data={datasets.mitigation_strategies_data} selectedCity={selectedCity} />
        <HealthImpact data={datasets.health_impact_data} selectedCity={selectedCity} />
        <AlertSystem data={datasets.weather_station_data} selectedCity={selectedCity} />
      </div>
      <div className="md:col-span-3">
        <InfoPanel />
      </div>
    </div>
  )
}

