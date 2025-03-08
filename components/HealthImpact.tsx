import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HealthImpact({ data, selectedCity }: { data: any[]; selectedCity: string }) {
  const latestData = data[data.length - 1]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Impact Assessment</CardTitle>
        <CardDescription>Estimated health effects in {selectedCity}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <span className="font-medium">Heat-related illnesses:</span> {latestData.heat_related_illnesses} cases
          </li>
          <li>
            <span className="font-medium">Respiratory issues:</span> {latestData.respiratory_issues} cases
          </li>
          <li>
            <span className="font-medium">Mental health reports:</span> {latestData.mental_health_reports} cases
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

