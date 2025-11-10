import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export function MisReservaciones() {
  const [reservaciones, setReservaciones] = useState([]);

  useEffect(() => {
    const fetchReservaciones = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/reservaciones/mis-reservaciones', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReservaciones(response.data);
      } catch (error) {
        toast.error('Error al cargar las reservaciones');
      }
    };

    fetchReservaciones();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mis Reservaciones</h2>
      <div className="grid gap-4">
        {reservaciones.map((reservacion) => (
          <div key={reservacion.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Fecha: {new Date(reservacion.fecha).toLocaleDateString()}
                </p>
                <p>Hora: {reservacion.hora}</p>
                <p className="capitalize">Estado: {reservacion.estado}</p>
              </div>
              <div className={`
                px-3 py-1 rounded-full
                ${reservacion.estado === 'confirmada' ? 'bg-green-100 text-green-800' : ''}
                ${reservacion.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${reservacion.estado === 'cancelada' ? 'bg-red-100 text-red-800' : ''}
              `}>
                {reservacion.estado}
              </div>
            </div>
          </div>
        ))}
        {reservaciones.length === 0 && (
          <p className="text-gray-500 text-center">No tienes reservaciones aún</p>
        )}
      </div>
    </div>
  );
}