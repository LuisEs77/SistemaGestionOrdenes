import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config.js';
import { useNavigate } from 'react-router-dom';

export function NuevaReservacion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    tipo: 'basica',
    comentarios: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Debes iniciar sesión para crear una reservación');
        navigate('/login');
        return;
      }

      await axios.post(`${API_URL}/api/reservaciones`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Reservación creada con éxito');
      navigate('/mis-reservaciones');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear la reservación');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Nueva Reservación</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Hora</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Tipo de Reservación</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="basica">Básica</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Comentarios (opcional)</label>
          <textarea
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Agrega cualquier comentario o requerimiento especial"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Crear Reservación
        </button>
      </form>
    </div>
  );
}