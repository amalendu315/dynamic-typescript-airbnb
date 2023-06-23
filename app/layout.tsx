import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/Modals/RegisterModal'
import Navbar from './components/Navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToastProvider from './providers/ToastProvider'
import LoginModal from './components/Modals/LoginModal'
import { getCurrentUser } from './actions/getCurrentUser'
import RentModal from './components/Modals/RentModal'
import SearchModal from './components/Modals/SearchModal'

const inter = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences',
  description: 'Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToastProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
