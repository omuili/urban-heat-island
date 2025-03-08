import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AlertSystem({ data, selectedCity }: { data: any[]; selectedCity: string }) {
  const latestData =
    data && data.length > 0
      ? data
          .filter((item) => item.city === selectedCity)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
      : null

  const getAlertLevel = (temperature: number) => {
    if (temperature >= 90) return { level: "Extreme Heat", variant: "destructive" }
    if (temperature >= 80) return { level: "Heat Warning", variant: "warning" }
    return { level: "Normal", variant: "default" }
  }

  const alert =
    latestData && latestData.temperature
      ? getAlertLevel(Number.parseFloat(latestData.temperature))
      : { level: "No Data", variant: "default" }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heat Alert System</CardTitle>
        <CardDescription>Current alerts for {selectedCity}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Current Status:</span>
            <Badge variant={alert.variant as "default" | "secondary" | "destructive" | "warning"}>{alert.level}</Badge>
          </div>
          {latestData && latestData.temperature ? (
            <>
              <p className="text-sm">Current temperature: {latestData.temperature}°F</p>
              <ul className="text-sm list-disc list-inside">
                <li>Stay hydrated</li>
                <li>Avoid outdoor activities during peak heat hours</li>
                <li>Check on vulnerable neighbors</li>
              </ul>
            </>
          ) : (
            <p className="text-sm">No current temperature data available for {selectedCity}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

