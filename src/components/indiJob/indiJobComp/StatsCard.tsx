interface Stat {
  label: string
  value: number
}

interface StatsCardsProps {
  stats: Stat[]
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-600">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

