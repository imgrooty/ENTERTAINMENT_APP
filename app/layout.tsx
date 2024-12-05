import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '../components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Entertainment Web App',
  description: 'Your favorite movies and TV shows in one place',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6 md:p-8 lg:p-10">{children}</main>
        </div>
      </body>
    </html>
  )
}

