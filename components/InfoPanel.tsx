import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InfoPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Urban Heat Island Effect</CardTitle>
        <CardDescription>Understanding the impact on our cities</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-2">
          Urban Heat Islands are metropolitan areas that are significantly warmer than their surrounding rural areas due
          to human activities.
        </p>
        <p className="mb-2">Key factors contributing to this effect include:</p>
        <ul className="list-disc list-inside mb-2">
          <li>High density of buildings</li>
          <li>Lack of green spaces</li>
          <li>Heat-absorbing surfaces (e.g., asphalt)</li>
          <li>Waste heat from vehicles and industry</li>
        </ul>
        <p>
          Our AI-powered dashboard helps urban planners and policymakers visualize, predict, and mitigate these effects
          for more resilient cities.
        </p>
      </CardContent>
    </Card>
  )
}

