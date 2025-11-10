import { User } from './models/user.model.js';
import { sequelize } from './database/database.js';

async function list() {
  try {
    await sequelize.authenticate();
    const users = await User.findAll({ attributes: ['id','username'] });
    console.log('Users:', users.map(u => u.toJSON()));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

list();
