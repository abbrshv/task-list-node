import { Request, Response, Router } from 'express';
import taskService from '../services/taskService.js';
import newTaskSchema from '../middleware/newTaskSchema.js';
import validate from '../middleware/validaton.middleware.js';
import updateTaskSchema from '../middleware/updateTaskSchema.js';

const router = Router();

router.post('/', validate(newTaskSchema), async (req: Request, res: Response) => {
  try {
    const newTask: ETask = { ...req.body };
    const result = await taskService.create(newTask);

    res.status(201).json(result);
  } catch (error: any) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ type: error.name, message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await taskService.delete(id);

    res.status(200).json({ deleted: result });
  } catch (error: any) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ type: error.name, message: error.message });
  }
});

router.patch('/:id', validate(updateTaskSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await taskService.update(id, { ...req.body });

    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ type: error.name, message: error.message });
  }
});

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const result = await taskService.getStats();
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ type: error.name, message: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await taskService.getAll();
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ type: error.name, message: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await taskService.get(id);

    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ type: error.name, message: error.message });
  }
});

export default router;
