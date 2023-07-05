import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ModalProvider } from '@/providers/modal-provider'

import './globals.css'
import prismadb from '@/lib/prismadb'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Ecommerce Dashboard Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const store = prismadb.store

  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}  className={inter.className}>
          <ModalProvider/>
            {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
