import BaseRepository from './BaseRepository.js';

class TaskRepository extends BaseRepository {
  constructor() {
    super('tasks');
  }
}

const taskRepository = new TaskRepository();

export default taskRepository;
