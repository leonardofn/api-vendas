import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm';

dataSource
  .initialize()
  .then(() => {
    console.log('Database initializated! 🗃️');
    app.listen(3333, () => {
      console.log('Server started in port 3333! 🏆');
    });
  })
  .catch(e => console.log('Error => ', e));
