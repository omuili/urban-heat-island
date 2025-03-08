import { NextResponse } from "next/server"
import { spawn } from "child_process"
import path from "path"

export async function GET(request: Request) {
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

  return new Promise((resolve) => {
    const pythonProcess = spawn("python", [
      path.join(process.cwd(), "predict.py"),
      city,
      hour,
      totalConsumption,
      coolingSpecific,
      builtUpArea,
      greenSpace,
    ])

    let result = ""
    let errorOutput = ""

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString()
    })

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString()
    })

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error("Python script error:", errorOutput)
        resolve(NextResponse.json({ error: "Prediction failed", details: errorOutput }, { status: 500 }))
      } else {
        try {
          const prediction = Number.parseFloat(result.trim())
          if (isNaN(prediction)) {
            throw new Error("Invalid prediction value")
          }
          resolve(NextResponse.json({ prediction }))
        } catch (error) {
          console.error("Parsing error:", error)
          resolve(
            NextResponse.json({ error: "Failed to parse prediction result", details: error.message }, { status: 500 }),
          )
        }
      }
    })
  })
}

