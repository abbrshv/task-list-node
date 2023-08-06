import { Request, Response, Router } from 'express';
import taskService from '../services/taskService.js';
import newTaskSchema from '../middleware/newTaskSchema.js';
import validate from '../middleware/validaton.middleware.js';
import updateTaskSchema from '../middleware/updateTaskSchema.js';

const router = Router();

router.post('/', validate(newTaskSchema), (req: Request, res: Response) => {
  const newTask: ETask = { ...req.body };
  const result = taskService.create(newTask);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ message: 'Cannot create task' });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const result = taskService.delete(id);

  if (result) {
    res.status(200).json({ message: result });
  } else {
    res.status(400).json({ message: 'Cannot delete task' });
  }
});

router.patch('/:id', validate(updateTaskSchema), (req: Request, res: Response) => {
  try {
    const updatedData = { ...req.body };
    const { id } = req.params;
    const result = taskService.update(id, updatedData);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: 'Cannot update task' });
    }
  } catch (error: any) {
    res.status(404).json({ type: error.name, message: error.message });
  }
});

router.get('/stats', (req: Request, res: Response) => {
  const result = taskService.getStats();
  res.status(200).json(result);
});

router.get('/', (req: Request, res: Response) => {
  const result = taskService.getAll();
  res.status(200).json(result);
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = taskService.get(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ type: error.name, message: error.message });
  }
});

export default router;
