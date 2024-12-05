'use client'

import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import MediaCard from '../components/MediaCard'

interface Media {
  id: number
  title?: string
  name?: string
  release_date?: string
  first_air_date?: string
  media_type: string
  vote_average: number
  poster_path: string
}

export default function Home() {
  const [trendingMedia, setTrendingMedia] = useState<Media[]>([])
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const [searchResults, setSearchResults] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrendingMedia()
  }, [])

  const fetchTrendingMedia = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=e2dc77d3c8882f5544e121827fa5f47b')
      if (!response.ok) {
        throw new Error('Failed to fetch trending media')
      }
      const data = await response.json()
      setTrendingMedia(data.results)
    } catch (err) {
      setError('Failed to fetch trending media')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([])
      return
    }
    try {
      setIsLoading(true)
      const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=e2dc77d3c8882f5544e121827fa5f47b&query=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Failed to search media')
      }
      const data = await response.json()
      setSearchResults(data.results)
    } catch (err) {
      setError('Failed to search media')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleBookmark = (id: number) => {
    setBookmarks((prevBookmarks) => {
      const newBookmarks = new Set(prevBookmarks)
      if (newBookmarks.has(id)) {
        newBookmarks.delete(id)
      } else {
        newBookmarks.add(id)
      }
      return newBookmarks
    })
  }

  const mediaToDisplay = searchResults.length > 0 ? searchResults : trendingMedia

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  return (
    <div>
      <SearchBar placeholder="Search for movies or TV series" onSearch={handleSearch} />
      <h2 className="text-2xl font-bold mt-8 mb-4 text-orange-500">
        {searchResults.length > 0 ? 'Search Results' : 'Trending'}
      </h2>
      {mediaToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaToDisplay.map((item) => (
            <MediaCard
              key={item.id}
              title={item.title || item.name || 'Unknown Title'}
              year={new Date(item.release_date || item.first_air_date || Date.now()).getFullYear()}
              category={item.media_type === 'movie' ? 'Movie' : 'TV Series'}
              rating={`${item.vote_average.toFixed(1)}/10`}
              thumbnail={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              isBookmarked={bookmarks.has(item.id)}
              onBookmark={() => toggleBookmark(item.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-8">No media to display</p>
      )}
    </div>
  )
}

