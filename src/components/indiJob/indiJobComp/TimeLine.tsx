import { CalendarDays, Users, UserCheck } from 'lucide-react'

interface TimelineEvent {
  id: number
  title: string
  date: string
  icon: 'post' | 'applications' | 'interviews'
}

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <CalendarDays className="h-5 w-5" />
      case 'applications':
        return <Users className="h-5 w-5" />
      case 'interviews':
        return <UserCheck className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-white">
            {getIcon(event.icon)}
          </div>
          <div>
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-gray-600">{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

