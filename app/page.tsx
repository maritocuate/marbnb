import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import RegisterModal from './components/modal/registerModal'
import LoginModal from './components/modal/loginModal'
import ToasterProvider from './components/providers/toasterProvider'
import getCurrentUser from './actions/getCurrentUsers'
import RentModal from './components/modal/rentModal'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const currentUser = await getCurrentUser()
  return (
    <main>
      <ToasterProvider />
      <RentModal />
      <LoginModal />
      <RegisterModal />
      <Navbar currentUser={ currentUser } />
      <h1 className="text-rose-500 text-2xl">Marbnb</h1>
    </main>
  )
}
