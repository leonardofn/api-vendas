import { AppDataSource } from '@config/db.config';

AppDataSource.initialize()
  .then(() => console.log('Database initializated! 🗃️'))
  .catch(e => console.log('Error => ', e));
