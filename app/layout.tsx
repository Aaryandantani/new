import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Serenity Bay Resort | Luxury Tropical Paradise',
  description: 'Experience unparalleled luxury at Serenity Bay Resort. Pristine beaches, world-class spa, exquisite dining, and unforgettable memories await you in paradise.',
  keywords: 'luxury resort, beach resort, tropical vacation, spa, fine dining, overwater villa',
}

export const viewport: Viewport = {
  themeColor: '#5a4a3a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
