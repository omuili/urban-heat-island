import { NextResponse } from "next/server"

// Simple JavaScript-based prediction model
function generatePrediction(
  city: string,
  hour: number,
  totalConsumption: number,
  coolingSpecific: number,
  builtUpArea: number,
  greenSpace: number,
): number {
  // Base temperatures for different cities
  const cityBaseTemps: Record<string, number> = {
    "New York": 75,
    "Los Angeles": 80,
    Chicago: 72,
    Houston: 85,
    Phoenix: 90,
  }

  // Get base temperature for the city or use default
  const baseTemp = cityBaseTemps[city] || 75

  // Time of day factor (peak at noon/afternoon)
  const hourFactor = 5 * Math.sin((hour / 24) * Math.PI)

  // Energy consumption impact (more energy = higher temps)
  const consumptionFactor = (totalConsumption / 10000) * 2

  // Cooling specific impact
  const coolingFactor = (coolingSpecific / 1000) * 1.5

  // Built-up area impact (more buildings = higher temps)
  const builtUpFactor = (builtUpArea / 50000) * 3

  // Green space impact (more green space = lower temps)
  const greenSpaceFactor = (greenSpace / 10000) * -2

  // Calculate prediction with some randomness for realism
  const prediction =
    baseTemp +
    hourFactor +
    consumptionFactor +
    coolingFactor +
    builtUpFactor +
    greenSpaceFactor +
    (Math.random() * 2 - 1) // Add slight randomness

  return Math.round(prediction * 10) / 10 // Round to 1 decimal place
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")
    const hour = searchParams.get("hour")
    const totalConsumption = searchParams.get("totalConsumption")
    const coolingSpecific = searchParams.get("coolingSpecific")
    const builtUpArea = searchParams.get("builtUpArea")
    const greenSpace = searchParams.get("greenSpace")

    if (!city || !hour || !totalConsumption || !coolingSpecific || !builtUpArea || !greenSpace) {
      return NextResponse.json({ error: "All parameters are required" }, { status: 400 })
    }

    // Generate prediction using JavaScript model
    const prediction = generatePrediction(
      city,
      Number.parseInt(hour),
      Number.parseFloat(totalConsumption),
      Number.parseFloat(coolingSpecific),
      Number.parseFloat(builtUpArea),
      Number.parseFloat(greenSpace),
    )

    return NextResponse.json({ prediction })
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json(
      { error: "Failed to generate prediction", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

