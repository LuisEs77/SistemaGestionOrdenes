import { Reservation } from '../models/reservation.model.js';

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: {
        userId: req.userId
      },
      order: [['date', 'DESC']]
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      userId: req.userId
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findOne({
      where: { id, userId: req.userId }
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    await reservation.update(req.body);
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findOne({
      where: { id, userId: req.userId }
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    await reservation.destroy();
    res.json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};