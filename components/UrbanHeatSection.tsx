"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UrbanHeatSectionProps {
  selectedCity: string
  data: any[]
}

export default function UrbanHeatSection({ selectedCity, data }: UrbanHeatSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw the cross-section
    const drawCrossSection = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#87CEEB") // Sky blue
      gradient.addColorStop(1, "#F5F5F5") // Light gray
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Temperature curve
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.6)

      // Create the temperature curve
      for (let x = 0; x <= canvas.width; x++) {
        const progress = x / canvas.width
        let y = canvas.height * 0.6 // Base height

        // Add the urban heat island effect
        if (progress > 0.2 && progress < 0.8) {
          const intensity = Math.sin(((progress - 0.2) * Math.PI) / 0.6)
          y -= intensity * 50 // Maximum temperature difference
        }

        ctx.lineTo(x, y)
      }

      // Fill the temperature curve
      const tempGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      tempGradient.addColorStop(0, "rgba(255, 100, 100, 0.5)") // Warm air
      tempGradient.addColorStop(1, "rgba(255, 100, 100, 0)") // Fade out
      ctx.fillStyle = tempGradient
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.fill()

      // Draw buildings and trees
      const drawBuilding = (x: number, height: number, width: number) => {
        ctx.fillStyle = "#666"
        ctx.fillRect(x, canvas.height - height, width, height)
        // Windows
        ctx.fillStyle = "#888"
        for (let i = 10; i < height - 10; i += 20) {
          for (let j = 5; j < width - 5; j += 15) {
            ctx.fillRect(x + j, canvas.height - height + i, 8, 12)
          }
        }
      }

      const drawTree = (x: number, height: number) => {
        // Trunk
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(x - 5, canvas.height - height, 10, height * 0.3)
        // Leaves
        ctx.fillStyle = "#228B22"
        ctx.beginPath()
        ctx.moveTo(x, canvas.height - height)
        ctx.lineTo(x + 20, canvas.height - height * 0.8)
        ctx.lineTo(x - 20, canvas.height - height * 0.8)
        ctx.fill()
      }

      // Rural area (left)
      for (let i = 0; i < 5; i++) {
        drawTree(50 + i * 40, 60 + Math.random() * 20)
      }

      // Suburban area
      for (let i = 0; i < 3; i++) {
        drawBuilding(200 + i * 80, 80 + Math.random() * 20, 50)
        drawTree(220 + i * 80, 50)
      }

      // Urban center
      for (let i = 0; i < 5; i++) {
        drawBuilding(400 + i * 60, 120 + Math.random() * 80, 40)
      }

      // Labels
      ctx.fillStyle = "#000"
      ctx.font = "14px sans-serif"
      ctx.fillText("Rural", 50, 30)
      ctx.fillText("Suburban", 250, 30)
      ctx.fillText("Urban Center", 450, 30)

      // Temperature indicators
      ctx.font = "12px sans-serif"
      ctx.fillStyle = "#FF4444"
      ctx.fillText("Cooler", 20, canvas.height * 0.6)
      ctx.fillText("Warmer", 450, canvas.height * 0.4)
    }

    drawCrossSection()

    // Redraw on window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawCrossSection()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Urban Heat Island Profile</CardTitle>
        <CardDescription>Temperature variation from rural to urban areas in {selectedCity}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full" style={{ height: "300px" }}>
          <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>The urban heat island effect shows how cities tend to be warmer than surrounding rural areas due to:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Heat-absorbing materials (concrete, asphalt)</li>
            <li>Reduced vegetation and natural cooling</li>
            <li>Heat from human activities</li>
            <li>Changes in airflow patterns</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

