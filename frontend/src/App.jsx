import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './components/Dashboard';
import { ClientesPage } from './pages/Clientes';
import { ReservacionesPage } from './pages/Reservaciones';
import { NuevaReservacionPage } from './pages/NuevaReservacion';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservaciones" element={<ReservacionesPage />} />
            <Route path="/nueva-reservacion" element={<NuevaReservacionPage />} />
            <Route path="/clientes" element={<ClientesPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;