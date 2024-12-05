'use client'

import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import MediaCard from '../../components/MediaCard'

interface TVShow {
  id: number
  name: string
  first_air_date: string
  vote_average: number
  poster_path: string
}

export default function TVSeries() {
  const [tvShows, setTVShows] = useState<TVShow[]>([])
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const [searchResults, setSearchResults] = useState<TVShow[]>([])

  useEffect(() => {
    fetchTVShows()
  }, [])

  const fetchTVShows = async () => {
    const response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=e2dc77d3c8882f5544e121827fa5f47b')
    const data = await response.json()
    setTVShows(data.results)
  }

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([])
      return
    }
    const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=YOUR_TMDB_API_KEY&query=${encodeURIComponent(query)}`)
    const data = await response.json()
    setSearchResults(data.results)
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

  const showsToDisplay = searchResults.length > 0 ? searchResults : tvShows

  return (
    <div>
      <SearchBar placeholder="Search for TV series" onSearch={handleSearch} />
      <h2 className="text-2xl font-bold mt-8 mb-4">
        {searchResults.length > 0 ? 'Search Results' : 'Popular TV Series'}
      </h2>
      {showsToDisplay && showsToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {showsToDisplay.map((show) => (
            <MediaCard
              key={show.id}
              title={show.name}
              year={new Date(show.first_air_date).getFullYear()}
              category="TV Series"
              rating={`${show.vote_average.toFixed(1)}/10`}
              thumbnail={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              isBookmarked={bookmarks.has(show.id)}
              onBookmark={() => toggleBookmark(show.id)}
            />
          ))}
        </div>
      ) : (
        <p>No TV shows to display</p>
      )}
    </div>
  )
}

