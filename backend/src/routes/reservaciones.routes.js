import { Router } from 'express';
import { Reservacion } from '../models/Reservacion.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta de prueba
router.get('/test', (req, res) => {
  res.json({ message: 'Ruta de reservaciones funcionando' });
});

// Crear reservación - ruta sin verificación de token temporalmente
router.post('/', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    
    // Crear la reservación con los datos recibidos
    const reservacion = await Reservacion.create({
      ...req.body,
      usuarioId: 1, // Temporalmente asignamos al usuario 1
      estado: 'pendiente'
    });

    console.log('Reservación creada:', reservacion);
    res.status(201).json(reservacion);
  } catch (error) {
    console.error('Error al crear reservación:', error);
    res.status(500).json({ 
      message: 'Error al crear la reservación',
      error: error.message 
    });
  }
});

// Obtener todas las reservaciones
router.get('/', async (req, res) => {
  try {
    const reservaciones = await Reservacion.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(reservaciones);
  } catch (error) {
    console.error('Error al obtener reservaciones:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
