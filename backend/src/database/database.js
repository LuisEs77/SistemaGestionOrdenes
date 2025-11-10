import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('reservas_db', 'admin', 'admin123', {
  host: 'localhost',
  dialect: 'postgres'
});