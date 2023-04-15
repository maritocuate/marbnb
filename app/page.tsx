import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import RegisterModal from './components/modal/registerModal'
import ToasterProvider from './components/providers/toasterProvider'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <ToasterProvider />
      <RegisterModal />
      <Navbar />
      <h1 className="text-rose-500 text-2xl">Marbnb</h1>
    </main>
  )
}
