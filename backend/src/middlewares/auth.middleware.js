import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario.js';

export const verificarToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'] || req.headers['authorization'];

        if (!token) {
            return res.status(403).json({ message: 'No se proporcionó token de acceso' });
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        const usuario = await Usuario.findByPk(decoded.id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};