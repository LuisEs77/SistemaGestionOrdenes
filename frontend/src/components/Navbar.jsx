import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiDashboardLine, RiUserLine, RiCalendarLine, RiAddCircleLine } from 'react-icons/ri';

const menuItems = [
  {
    path: '/dashboard',
    icon: RiDashboardLine,
    title: 'Dashboard',
    color: 'text-blue-400 group-hover:text-blue-300'
  },
  {
    path: '/clientes',
    icon: RiUserLine,
    title: 'Clientes',
    color: 'text-purple-400 group-hover:text-purple-300'
  },
  {
    path: '/reservaciones',
    icon: RiCalendarLine,
    title: 'Reservaciones',
    color: 'text-green-400 group-hover:text-green-300'
  },
  {
    path: '/nueva-reservacion',
    icon: RiAddCircleLine,
    title: 'Nueva Reservación',
    color: 'text-pink-400 group-hover:text-pink-300'
  }
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 w-64 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 shadow-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Sistema Reservas
        </h1>
      </div>
      
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 py-3 px-4 rounded-lg transition-all group ${
              location.pathname === item.path
                ? 'bg-gray-700/50'
                : 'hover:bg-gray-700/30'
            }`}
          >
            <item.icon className={`text-xl ${item.color}`} />
            <span className={item.color}>{item.title}</span>
          </Link>
        ))}
      </div>

      {/* Versión y perfil */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-medium">A</span>
            </div>
            <div>
              <h3 className="text-sm font-medium">Admin</h3>
              <p className="text-xs text-gray-400">admin@sistema.com</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}