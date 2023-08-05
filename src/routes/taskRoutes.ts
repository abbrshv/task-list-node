import { Request, Response, Router } from 'express';
import taskService from '../services/taskService.js';
import newTaskSchema from '../middleware/newTaskSchema.js';
import validate from '../middleware/validaton.middleware.js';

const router = Router();

router.post('/notes', validate(newTaskSchema), (req: Request, res: Response) => {
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

router.patch('/notes/:id', validate(newTaskSchema), (req: Request, res: Response) => {
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

router.get('/notes', (req: Request, res: Response) => {
  const result = taskService.getAll();

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: 'No tasks found' });
  }
});

router.get('/notes/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = taskService.get(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ type: error.name, message: error.message });
  }
});

router.get('/notes/stats', (req: Request, res: Response) => {
  const result = taskService.getStats();
  res.status(200).json(result);
});

export default router;
