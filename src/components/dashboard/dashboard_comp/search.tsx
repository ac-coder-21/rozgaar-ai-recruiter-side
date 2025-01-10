import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
      <Input
        type="search"
        placeholder="Find recruitment"
        className="pl-8"
      />
    </div>
  )
}

