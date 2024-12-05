'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Film, Tv, Bookmark } from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col items-center justify-between w-16 md:w-20 lg:w-24 bg-gray-800 py-6">
      <div className="flex flex-col items-center space-y-8">
        <Link href="/" className="text-orange-500 hover:text-white transition-colors">
          <Home size={24} className={pathname === '/' ? 'text-white' : ''} />
        </Link>
        <Link href="/movies" className="text-gray-400 hover:text-orange-500 transition-colors">
          <Film size={24} className={pathname === '/movies' ? 'text-orange-500' : ''} />
        </Link>
        <Link href="/tv" className="text-gray-400 hover:text-orange-500 transition-colors">
          <Tv size={24} className={pathname === '/tv' ? 'text-orange-500' : ''} />
        </Link>
        <Link href="/bookmarks" className="text-gray-400 hover:text-orange-500 transition-colors">
          <Bookmark size={24} className={pathname === '/bookmarks' ? 'text-orange-500' : ''} />
        </Link>
      </div>
      <div className="w-8 h-8 rounded-full bg-orange-500"></div>
    </nav>
  )
}

export default Sidebar

