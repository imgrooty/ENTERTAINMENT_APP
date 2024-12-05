import { Search } from 'lucide-react'

interface SearchBarProps {
  placeholder: string
  onSearch: (query: string) => void
}

const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500" size={24} />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar

