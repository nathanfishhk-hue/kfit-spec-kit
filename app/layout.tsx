import './globals.css'
import type { Metadata } from 'next'
import Layout from '@/components/layout/layout'
import { QueryProvider } from '@/components/query-provider'

export const metadata: Metadata = {
  title: "KFIT Persello's Fitness Centre | Transform Here. Thrive Everywhere.",
  description: "Knysna's largest and most popular gym with state-of-the-art equipment, elite trainers, and flexible membership options.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <QueryProvider>
          <Layout>{children}</Layout>
        </QueryProvider>
      </body>
    </html>
  )
}