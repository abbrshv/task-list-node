import { Application } from 'express';
import taskRoutes from './taskRoutes.js';

const initRoutes = (app: Application) => {
  app.use('/api/users', taskRoutes);
};

export default initRoutes;
