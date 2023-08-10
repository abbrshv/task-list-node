import BaseRepository from './BaseRepository.js';
import Task from '../database/models/Task.js';

class TaskRepository extends BaseRepository<Task> {
  constructor() {
    super(Task);
  }
}

const taskRepository = new TaskRepository();

export default taskRepository;
