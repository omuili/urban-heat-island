import Dashboard from "@/components/Dashboard"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <h1 className="text-4xl font-bold mb-8">Urban Heat Island AI Dashboard</h1>
      <Dashboard />
    </main>
  )
}

