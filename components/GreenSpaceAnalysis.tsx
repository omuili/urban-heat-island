import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function GreenSpaceAnalysis({ data, selectedCity }: { data: any[]; selectedCity: string }) {
  const latestData = data[data.length - 1]
  const totalArea = Number.parseFloat(latestData.total_area)
  const greenSpace = Number.parseFloat(latestData.green_space)
  const waterBodies = Number.parseFloat(latestData.water_bodies)
  const bareSoil = Number.parseFloat(latestData.bare_soil)

  const greenSpacePercentage = (greenSpace / totalArea) * 100
  const waterBodiesPercentage = (waterBodies / totalArea) * 100
  const bareSoilPercentage = (bareSoil / totalArea) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Green Space Analysis</CardTitle>
        <CardDescription>Green coverage in {selectedCity}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Green Space</span>
              <span className="text-sm font-medium">{greenSpacePercentage.toFixed(1)}%</span>
            </div>
            <Progress value={greenSpacePercentage} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Water Bodies</span>
              <span className="text-sm font-medium">{waterBodiesPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={waterBodiesPercentage} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Bare Soil</span>
              <span className="text-sm font-medium">{bareSoilPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={bareSoilPercentage} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

