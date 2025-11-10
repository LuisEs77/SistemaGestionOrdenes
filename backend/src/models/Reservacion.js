import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Usuario } from './Usuario.js';

export const Reservacion = sequelize.define('Reservacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('basica', 'premium', 'vip'),
    allowNull: false,
    defaultValue: 'basica'
  },
  comentarios: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
    defaultValue: 'pendiente'
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  }
});

// Establecer relación con Usuario
Usuario.hasMany(Reservacion, {
  foreignKey: 'usuarioId',
  sourceKey: 'id'
});

Reservacion.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  targetKey: 'id'
});