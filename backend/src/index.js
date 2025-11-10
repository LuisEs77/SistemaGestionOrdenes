import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './database/database.js';
import authRoutes from './routes/auth.routes.js';
import reservacionesRoutes from './routes/reservaciones.new.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware para logging mejorado
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/reservaciones', reservacionesRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 4000;

async function main() {
  try {
    // No forzar la recreación de las tablas para conservar usuarios creados.
    // En desarrollo puedes usar { alter: true } para sincronizar cambios de esquema sin perder datos.
    await sequelize.sync();
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();