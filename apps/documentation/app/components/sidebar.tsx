import { Link } from '@remix-run/react'
import { useState, memo } from 'react'

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white">
      <div className="flex items-center space-x-2 p-4 text-lg font-bold">
        <span>⚛️</span>
        <span>Molecular</span>
      </div>
      <nav>
        <SidebarItem title="Getting Started" route="/getting-started" />
        <SidebarItem
          title="Concepts"
          route="/concepts"
          subItems={[
            { title: 'Atoms', route: '/concepts/atoms' },
            { title: 'Bonds', route: '/concepts/bonds' },
            { title: 'Molecules', route: '/concepts/molecules' },
            { title: 'Store', route: '/concepts/store' }
          ]}
        />
        <SidebarItem title="API" route="/api" />
        <SidebarItem title="Packages" route="/guides" />
        <SidebarItem
          title="Examples"
          route="/examples"
          subItems={[
            { title: 'Query', route: '/examples/query' },
            { title: 'List', route: '/examples/list' },
            { title: 'Query List', route: '/examples/query-list' }
          ]}
        />
      </nav>
    </div>
  )
}

export default memo(Sidebar)

interface SidebarItemProps {
  title: string
  route: string
  subItems?: { title: string; route: string }[]
}

function SidebarItem({ title, route, subItems }: SidebarItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    if (subItems) {
      setIsExpanded((prev) => !prev)
    }
  }

  return (
    <div>
      <div
        onClick={toggleExpand}
        className="flex items-center justify-between border-b border-gray-700 px-4 py-4 hover:bg-gray-800 transition-all duration-200 cursor-pointer"
      >
        <span className="text-sm font-medium">{title}</span>
        {subItems && <span>{isExpanded ? '▼' : '›'}</span>} {/* Chevron */}
      </div>

      {/* Render Sub-Items */}
      {isExpanded && subItems && (
        <div className="bg-gray-900">
          {subItems.map((subItem) => (
            <Link
              key={subItem.route}
              to={subItem.route}
              className="block px-8 py-2 text-sm text-gray-300 hover:bg-gray-700"
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
