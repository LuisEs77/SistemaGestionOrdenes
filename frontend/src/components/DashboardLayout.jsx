import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { motion } from 'framer-motion';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      
      <main className="ml-64 p-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-7xl mx-auto"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Fondo con efecto de gradiente */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 opacity-50" />
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-white/[0.02]" />
      </div>
    </div>
  );
}