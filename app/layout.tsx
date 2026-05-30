import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout/layout'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/components/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KFIT Persello\'s Fitness Centre | Transform Here. Thrive Everywhere.',
  description: 'Knysna\'s largest and most popular gym with state-of-the-art equipment, elite trainers, and flexible membership options.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <QueryProvider>
            <Layout>{children}</Layout>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}