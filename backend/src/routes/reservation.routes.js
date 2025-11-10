import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation
} from '../controllers/reservation.controller.js';

const router = Router();

router.use(verifyToken);

router.get('/', getReservations);
router.post('/', createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;