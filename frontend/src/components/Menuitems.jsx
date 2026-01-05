import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

function Menuitems({ setSidebarOpen }) {
  return (
    <div className="px-4 space-y-1 text-gray-700 font-medium">
      {menuItemsData.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `
            flex items-center gap-3 px-4 py-2.5 rounded-xl transition
            ${isActive
              ? 'bg-indigo-50 text-indigo-700'
              : 'hover:bg-gray-100 text-gray-600'}
            `
          }
        >
          <Icon className="w-5 h-5" />
          {label}
        </NavLink>
      ))}
    </div>
  )
}

export default Menuitems
