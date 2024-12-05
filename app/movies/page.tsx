'use client'

import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import MediaCard from '../../components/MediaCard'

interface Movie {
  id: number
  title: string
  release_date: string
  vote_average: number
  poster_path: string
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const [searchResults, setSearchResults] = useState<Movie[]>([])

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=e2dc77d3c8882f5544e121827fa5f47b')
    const data = await response.json()
    setMovies(data.results)
  }

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([])
      return
    }
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_TMDB_API_KEY&query=${encodeURIComponent(query)}`)
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

  const moviesToDisplay = searchResults.length > 0 ? searchResults : movies

  return (
    <div>
      <SearchBar placeholder="Search for movies" onSearch={handleSearch} />
      <h2 className="text-2xl font-bold mt-8 mb-4">
        {searchResults.length > 0 ? 'Search Results' : 'Popular Movies'}
      </h2>
      {moviesToDisplay && moviesToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {moviesToDisplay.map((movie) => (
            <MediaCard
              key={movie.id}
              title={movie.title}
              year={new Date(movie.release_date).getFullYear()}
              category="Movie"
              rating={`${movie.vote_average.toFixed(1)}/10`}
              thumbnail={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              isBookmarked={bookmarks.has(movie.id)}
              onBookmark={() => toggleBookmark(movie.id)}
            />
          ))}
        </div>
      ) : (
        <p>No movies to display</p>
      )}
    </div>
  )
}

