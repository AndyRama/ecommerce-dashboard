import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'

import './globals.css'
import prismadb from '@/lib/prismadb'
import { ThemeProvider } from '@/providers/theme-provider'

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
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider/>
            <ModalProvider/>
              {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
