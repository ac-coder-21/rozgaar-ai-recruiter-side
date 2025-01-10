import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Nav() {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold">
          Recruit.io
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/candidates" className="text-gray-600 hover:text-gray-900">
            Candidates
          </Link>
          <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
            Jobs
          </Link>
          <Link href="/companies" className="text-gray-600 hover:text-gray-900">
            Companies
          </Link>
          <Link href="/reports" className="text-gray-600 hover:text-gray-900">
            Reports
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="default">New</Button>
        <Avatar>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}


