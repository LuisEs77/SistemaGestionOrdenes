import { Router } from 'express';
import { Reservacion } from '../models/Reservacion.js';

const router = Router();

// Ruta de prueba simple
router.get('/prueba', (req, res) => {
  res.json({ mensaje: 'La ruta funciona correctamente' });
});

// Crear reservación (versión simplificada)
router.post('/crear', async (req, res) => {
  try {
    const nuevaReservacion = await Reservacion.create({
      fecha: req.body.fecha,
      hora: req.body.hora,
      tipo: req.body.tipo || 'basica',
      comentarios: req.body.comentarios || '',
      usuarioId: 1,  // ID fijo para pruebas
      estado: 'pendiente'
    });

    res.status(201).json({
      mensaje: 'Reservación creada con éxito',
      reservacion: nuevaReservacion
    });
  } catch (error) {
    console.error('Error al crear reservación:', error);
    res.status(500).json({
      mensaje: 'Error al crear la reservación',
      error: error.message
    });
  }
});

// Obtener todas las reservaciones
router.get('/todas', async (req, res) => {
  try {
    const reservaciones = await Reservacion.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(reservaciones);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las reservaciones',
      error: error.message
    });
  }
});

export default router;