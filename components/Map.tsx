"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

const CITY_COORDINATES: { [key: string]: [number, number] } = {
  "New York": [-74.006, 40.7128],
  "Los Angeles": [-118.2437, 34.0522],
  Chicago: [-87.6298, 41.8781],
  Houston: [-95.3698, 29.7604],
  Phoenix: [-112.074, 33.4484],
}

interface MapProps {
  selectedCity: string
  data: any[]
}

export default function Map({ selectedCity, data }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(-74.006)
  const [lat, setLat] = useState(40.7128)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [lng, lat],
        zoom: zoom,
      })

      map.current.on("load", () => {
        if (map.current) {
          map.current.addSource("temperature-data", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [],
            },
          })

          map.current.addLayer({
            id: "temperature-heat",
            type: "heatmap",
            source: "temperature-data",
            paint: {
              "heatmap-weight": ["interpolate", ["linear"], ["get", "temperature"], 0, 0, 100, 1],
              "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(33,102,172,0)",
                0.2,
                "rgb(103,169,207)",
                0.4,
                "rgb(209,229,240)",
                0.6,
                "rgb(253,219,199)",
                0.8,
                "rgb(239,138,98)",
                1,
                "rgb(178,24,43)",
              ],
              "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
              "heatmap-opacity": 0.8,
            },
          })
        }
      })
    }
  }, [lng, lat, zoom])

  useEffect(() => {
    if (!map.current || !selectedCity) return

    const [newLng, newLat] = CITY_COORDINATES[selectedCity] || CITY_COORDINATES["New York"]
    setLng(newLng)
    setLat(newLat)

    map.current.flyTo({
      center: [newLng, newLat],
      zoom: 9,
      essential: true,
    })
  }, [selectedCity])

  useEffect(() => {
    if (!map.current || !data || data.length === 0) return

    const features = data.map((point) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          CITY_COORDINATES[selectedCity][0] + (Math.random() - 0.5) * 0.1,
          CITY_COORDINATES[selectedCity][1] + (Math.random() - 0.5) * 0.1,
        ],
      },
      properties: {
        temperature: Number(point.temperature),
      },
    }))

    if (map.current.getSource("temperature-data")) {
      ;(map.current.getSource("temperature-data") as mapboxgl.GeoJSONSource).setData({
        type: "FeatureCollection",
        features: features as any,
      })
    }
  }, [data, selectedCity])

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-96" />
      <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-sm">{selectedCity}</div>
    </div>
  )
}

