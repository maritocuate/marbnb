import { Inter } from 'next/font/google'
import Navbar from './components/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1 className="text-rose-500 text-2xl">Marbnb</h1>
    </main>
  )
}
