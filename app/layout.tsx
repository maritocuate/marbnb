import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from './components/navbar'
import RegisterModal from './components/modal/registerModal'
import RentModal from './components/modal/rentModal'
import LoginModal from './components/modal/loginModal'
import ToasterProvider from './components/providers/toasterProvider'
import getCurrentUser from './actions/getCurrentUsers'

export const metadata = {
  title: 'Marbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={ currentUser } />
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
