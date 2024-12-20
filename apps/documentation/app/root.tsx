import React from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { MetaFunction, LinksFunction } from '@remix-run/node'
import stylesheet from './tailwind.css?url'
import Sidebar from './components/sidebar'

// Meta Configuration
export const meta: MetaFunction = () => [
  {
    title: 'Molecular: State Management Library'
  }
]

// Links Configuration
export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  { rel: 'stylesheet', href: stylesheet },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
  }
]

// Layout Component
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen">
        <div className="flex h-full">
          {/* Sidebar */}
          <SidebarContainer />

          {/* Main Content */}
          <MainContent>{children}</MainContent>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

// Sidebar Container Component
const SidebarContainer = () => (
  <div className="w-64 border-r border-gray-600 shrink-0">
    <Sidebar />
  </div>
)

// Main Content Component
const MainContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1 p-6 overflow-y-auto">{children}</div>
)

// App Component
export default function App() {
  return <Outlet />
}
