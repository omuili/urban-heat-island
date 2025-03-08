import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import csv from "csv-parser"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dataset = searchParams.get("dataset")
  const city = searchParams.get("city")
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

  if (!dataset) {
    return NextResponse.json({ error: "Dataset parameter is required" }, { status: 400 })
  }

  const filePath = path.join(process.cwd(), "data", `${dataset}.csv`)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Dataset not found" }, { status: 404 })
  }

  return new Promise((resolve) => {
    const results: any[] = []
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        if (!city || data.city === city) {
          results.push(data)
        }
      })
      .on("end", () => {
        const limitedResults = limit ? results.slice(-limit) : results
        resolve(NextResponse.json(limitedResults))
      })
  })
}

