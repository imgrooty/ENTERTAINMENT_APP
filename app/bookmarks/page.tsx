'use client'

import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import MediaCard from '../../components/MediaCard'

interface Media {
  id: number
  title: string
  name: string
  release_date: string
  first_air_date: string
  media_type: string
  vote_average: number
  poster_path: string
}

export default function Bookmarks() {
  const [bookmarkedMedia, setBookmarkedMedia] = useState<Media[]>([])
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const [searchResults, setSearchResults] = useState<Media[]>([])

  useEffect(() => {
    fetchBookmarkedMedia()
  }, [])

  const fetchBookmarkedMedia = async () => {
    // In a real application, you would fetch this data from your backend
    // For now, we'll just use some mock data
    const mockData: Media[] = [
      {
        id: 1,
        title: 'Bookmarked Movie',
        name: '',
        release_date: '2023-01-01',
        first_air_date: '',
        media_type: 'movie',
        vote_average: 8.5,
        poster_path: '/path/to/poster.jpg'
      },
      {
        id: 2,
        title: '',
        name: 'Bookmarked TV Show',
        release_date: '',
        first_air_date: '2023-02-01',
        media_type: 'tv',
        vote_average: 9.0,
        poster_path: '/path/to/poster.jpg'
      }
    ]
    setBookmarkedMedia(mockData)
    setBookmarks(new Set(mockData.map(item => item.id)))
  }

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([])
      return
    }
    const filteredResults = bookmarkedMedia.filter(item =>
      (item.title || item.name).toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filteredResults)
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
    setBookmarkedMedia((prevMedia) => prevMedia.filter(item => bookmarks.has(item.id)))
  }

  const mediaToDisplay = searchResults.length > 0 ? searchResults : bookmarkedMedia

  return (
    <div>
      <SearchBar placeholder="Search bookmarked shows" onSearch={handleSearch} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Bookmarked Shows</h2>
      {mediaToDisplay && mediaToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaToDisplay.map((item) => (
            <MediaCard
              key={item.id}
              title={item.title || item.name}
              year={new Date(item.release_date || item.first_air_date).getFullYear()}
              category={item.media_type === 'movie' ? 'Movie' : 'TV Series'}
              rating={`${item.vote_average.toFixed(1)}/10`}
              thumbnail={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              isBookmarked={bookmarks.has(item.id)}
              onBookmark={() => toggleBookmark(item.id)}
            />
          ))}
        </div>
      ) : (
        <p>No bookmarked media to display</p>
      )}
    </div>
  )
}

