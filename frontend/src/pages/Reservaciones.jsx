import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { motion } from 'framer-motion';

export function ReservacionesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Reservaciones
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestión de reservaciones
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Próximas reservaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Próximas Reservaciones
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      Reservación #{i + 1}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cliente: John Doe
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fecha: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600">
                      Editar
                    </button>
                    <button className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600">
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calendario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Calendario
            </h2>
            {/* Aquí irá el componente de calendario */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-7 gap-1">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    {day}
                  </div>
                ))}
                {Array(31)
                  .fill(null)
                  .map((_, i) => (
                    <button
                      key={i}
                      className="aspect-square rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-sm"
                    >
                      {i + 1}
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}