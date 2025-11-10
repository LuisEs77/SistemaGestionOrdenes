import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReservationModal from '../components/ReservationModal';

export default function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/reservations', {
        headers: { 'x-access-token': token }
      });
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      if (error.response?.status === 403) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchReservations();
  }, [navigate]);

  const handleCreateReservation = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/api/reservations', data, {
        headers: { 'x-access-token': token }
      });
      setIsModalOpen(false);
      fetchReservations();
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  const handleUpdateReservation = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/api/reservations/${selectedReservation.id}`, data, {
        headers: { 'x-access-token': token }
      });
      setIsModalOpen(false);
      setSelectedReservation(null);
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const handleDeleteReservation = async (id) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta reserva?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/reservations/${id}`, {
        headers: { 'x-access-token': token }
      });
      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">Sistema de Reservas</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  setModalMode('create');
                  setSelectedReservation(null);
                  setIsModalOpen(true);
                }}
                className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Nueva Reserva
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <li key={reservation.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {reservation.clientName}
                        </p>
                        <p className="mt-1 flex items-center text-sm text-gray-500">
                          Fecha: {new Date(reservation.date).toLocaleDateString()} - Hora: {reservation.time}
                        </p>
                        <p className="mt-1 flex items-center text-sm text-gray-500">
                          Mesa: {reservation.tableNumber} - Personas: {reservation.numberOfPeople}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReservation(reservation);
                            setModalMode('edit');
                            setIsModalOpen(true);
                          }}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteReservation(reservation.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              {reservations.length === 0 && (
                <li>
                  <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                    No hay reservas disponibles
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <ReservationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        reservation={selectedReservation}
        onSubmit={modalMode === 'create' ? handleCreateReservation : handleUpdateReservation}
        mode={modalMode}
      />
    </div>
  );
}