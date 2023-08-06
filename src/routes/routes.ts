import { Application } from 'express';
import taskRoutes from './taskRoutes.js';

const initRoutes = (app: Application) => {
  app.use('/notes', taskRoutes);
};

export default initRoutes;
