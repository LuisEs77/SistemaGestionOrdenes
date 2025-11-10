import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export function ClientesFrecuentes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientesFrecuentes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/reservaciones/clientes-frecuentes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientes(response.data);
      } catch (error) {
        toast.error('Error al cargar los clientes frecuentes');
      }
    };

    fetchClientesFrecuentes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Clientes Frecuentes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-right">Total Reservaciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-b">
                <td className="py-3 px-4">{cliente.nombre}</td>
                <td className="py-3 px-4">{cliente.email}</td>
                <td className="py-3 px-4 text-right">{cliente.totalReservaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {clientes.length === 0 && (
          <p className="text-gray-500 text-center py-4">No hay datos de clientes frecuentes</p>
        )}
      </div>
    </div>
  );
}