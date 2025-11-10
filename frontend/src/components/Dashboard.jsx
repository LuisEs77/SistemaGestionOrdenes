import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiCalendarLine, RiTimeLine, RiAddLine } from "react-icons/ri";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config.js';
import 'react-toastify/dist/ReactToastify.css';

export function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    {
      title: 'Reservaciones Pendientes',
      value: '0',
      icon: RiCalendarLine,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Reservaciones Confirmadas',
      value: '0',
      icon: RiCalendarLine,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Próximas Reservaciones',
      value: '0',
      icon: RiTimeLine,
      color: 'from-blue-500 to-blue-600'
    }
  ]);

  const [reservaciones, setReservaciones] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Configurar axios para usar el token en todas las peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const cargarDatos = async () => {
    try {
      const reservacionesRes = await axios.get(`${API_URL}/api/reservaciones/mis-reservaciones`);
      const reservaciones = reservacionesRes.data;

      const reservacionesPendientes = reservaciones.filter(r => r.estado === 'pendiente').length;
      const reservacionesConfirmadas = reservaciones.filter(r => r.estado === 'confirmada').length;
      const proximasReservaciones = reservaciones.filter(r => new Date(r.fecha) > new Date()).length;

      setStats([
        {
          title: 'Reservaciones Pendientes',
          value: reservacionesPendientes.toString(),
          icon: RiCalendarLine,
          color: 'from-yellow-500 to-yellow-600'
        },
        {
          title: 'Reservaciones Confirmadas',
          value: reservacionesConfirmadas.toString(),
          icon: RiCalendarLine,
          color: 'from-green-500 to-green-600'
        },
        {
          title: 'Próximas Reservaciones',
          value: proximasReservaciones.toString(),
          icon: RiTimeLine,
          color: 'from-blue-500 to-blue-600'
        }
      ]);

      setReservaciones(reservacionesRes.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error('Error al cargar los datos');
      }
    }
  };

  // Función para recargar los datos
  const recargarDatos = () => {
    cargarDatos();
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
    >
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenido al panel de control
          </p>
        </div>
        <button
          onClick={() => navigate('/nueva-reservacion')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <RiAddLine />
          Nueva Reservación
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">{stat.title}</p>
                <h3 className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${stat.color}`}>
                  {stat.value}
                </h3>
              </div>
              <div className={`p-4 rounded-full bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Mis Reservaciones
          </h2>
          <div className="space-y-4">
            {reservaciones.map((reservacion, i) => (
              <motion.div 
                key={reservacion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <RiCalendarLine className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {new Date(reservacion.fecha).toLocaleDateString()}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hora: {reservacion.hora}
                  </p>
                  {reservacion.tipo && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Tipo: {reservacion.tipo}
                    </p>
                  )}
                </div>
                <span className={`
                  px-3 py-1 rounded-full text-sm
                  ${reservacion.estado === 'confirmada' ? 'bg-green-100 text-green-800' : ''}
                  ${reservacion.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${reservacion.estado === 'cancelada' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  {reservacion.estado}
                </span>
              </motion.div>
            ))}
            {reservaciones.length === 0 && (
              <p className="text-gray-500 text-center py-4">No tienes reservaciones aún</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
    <ToastContainer />
    </>
  );
}