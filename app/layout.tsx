import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DIY Label - Local Print, Global Reach',
  description: 'Connect creators, local print shops, and Shopify store owners in a sustainable merch ecosystem. Empower independent design and reduce textile waste.',
  keywords: 'local printing, sustainable merch, Shopify integration, print on demand, eco-friendly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}