import { Router } from 'express';
import { Reservacion } from '../models/Reservacion.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { Usuario } from '../models/Usuario.js';

const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Ruta de reservaciones funcionando' });
});

router.post('/', verificarToken, async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    const { fecha, hora, tipo, comentarios } = req.body;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaReservacion = new Date(fecha);
    fechaReservacion.setHours(0, 0, 0, 0);

    if (fechaReservacion < hoy) {
      return res.status(400).json({ 
        message: 'La fecha de reservación no puede ser anterior a hoy' 
      });
    }

    if (!['basica', 'premium', 'vip'].includes(tipo)) {
      return res.status(400).json({ 
        message: 'Tipo de reservación inválido' 
      });
    }

    const reservacion = await Reservacion.create({
      fecha,
      hora,
      tipo,
      comentarios,
      usuarioId: req.usuario.id,
      estado: 'pendiente'
    });

    res.status(201).json({
      message: 'Reservación creada exitosamente',
      reservacion
    });
  } catch (error) {
    console.error('Error al crear reservación:', error);
    res.status(500).json({ 
      message: 'Error al procesar la reservación',
      error: error.message 
    });
  }
});

router.get('/mis-reservaciones', verificarToken, async (req, res) => {
  try {
    const reservaciones = await Reservacion.findAll({
      where: { usuarioId: req.usuario.id },
      order: [['fecha', 'DESC']]
    });
    res.json(reservaciones);
  } catch (error) {
    console.error('Error al obtener reservaciones:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;