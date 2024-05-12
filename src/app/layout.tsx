import RouterChangeListener from '@/RouteChangeListener'
import type { Viewport } from 'next'
export const metadata = {
  title: 'Pardeep Kumar',
  description: 'Senior Software Engineer | Mobile Application Developer',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



