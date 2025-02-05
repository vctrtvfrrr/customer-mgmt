import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import config from './metadata'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = config

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
