import { User } from './models/user.model.js';
import { sequelize } from './database/database.js';

async function createAdminUser() {
  try {
    // Ensure tables exist but do not force-drop existing data
    await sequelize.sync();

    // Create admin only if it doesn't exist
    const [user, created] = await User.findOrCreate({
      where: { username: 'admin' },
      defaults: { password: 'admin123' }
    });

    if (created) {
      console.log('Usuario admin creado exitosamente');
    } else {
      console.log('Usuario admin ya existe');
    }

    console.log('Usuario admin creado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error creando usuario admin:', error);
    process.exit(1);
  }
}

createAdminUser();