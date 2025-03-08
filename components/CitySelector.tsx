import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CitySelector({
  cities,
  selectedCity,
  setSelectedCity,
}: {
  cities: string[]
  selectedCity: string
  setSelectedCity: (city: string) => void
}) {
  return (
    <Select value={selectedCity} onValueChange={setSelectedCity}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent>
        {cities.map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

