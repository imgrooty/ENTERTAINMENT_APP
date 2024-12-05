import Image from 'next/image'
import { Bookmark } from 'lucide-react'

interface MediaCardProps {
  title: string
  year: number
  category: string
  rating: string
  thumbnail: string
  isBookmarked: boolean
  onBookmark: () => void
}

const MediaCard = ({ title, year, category, rating, thumbnail, isBookmarked, onBookmark }: MediaCardProps) => {
  return (
    <div className="relative group">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <Image src={thumbnail} alt={title} layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white bg-opacity-25 rounded-full p-2">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0C6.715 0 0 6.715 0 15C0 23.285 6.715 30 15 30C23.285 30 30 23.285 30 15C30 6.715 23.285 0 15 0ZM21.645 15.92L11.645 21.92C11.445 22.04 11.225 22.1 11 22.1C10.775 22.1 10.555 22.04 10.355 21.92C9.955 21.68 9.7 21.26 9.7 20.8V8.8C9.7 8.34 9.955 7.92 10.355 7.68C10.755 7.44 11.245 7.44 11.645 7.68L21.645 13.68C22.045 13.92 22.3 14.34 22.3 14.8C22.3 15.26 22.045 15.68 21.645 15.92Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center text-sm text-gray-400">
          <span>{year}</span>
          <span className="mx-2">•</span>
          <span>{category}</span>
          <span className="mx-2">•</span>
          <span>{rating}</span>
        </div>
        <h3 className="text-lg font-medium mt-1">{title}</h3>
      </div>
      <button
        className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 rounded-full p-2"
        onClick={onBookmark}
      >
        <Bookmark size={20} className={isBookmarked ? 'text-orange-500' : 'text-white'} />
      </button>
    </div>
  )
}

export default MediaCard

