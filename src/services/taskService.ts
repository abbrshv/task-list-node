import taskRepository from '../repositories/taskRepository.js';
import { TASK_CATEGORIES } from '../constants/taskCategories.js';
import CustomError from '../helpers/CustomError.js';

class TaskService {
  isDTask(obj: any): obj is DTask {
    return (
      'name' in obj && 'category' in obj && 'content' in obj && 'createdDate' in obj && 'id' in obj
    );
  }

  captureDates(task: ETask | DTask) {
    const dateRegex = /(0?[1-9]|[12][0-9]|3[01])(\/|-)(0?[1-9]|1[1,2])(\/|-)(19|20)\d{2}/g;
    const datesArray = task.content.match(dateRegex);

    return datesArray ? datesArray.join(', ') : null;
  }

  getAll() {
    return taskRepository.getAll();
  }

  get(id: string) {
    const result = taskRepository.getOne(id);
    if (result && Object.keys(result).length === 0 && result.constructor === Object) {
      throw new CustomError(`Task with id: ${id} not found`, 404);
    }
    return result;
  }

  create(task: ETask) {
    const newTask = { ...task, isArchived: false, dates: this.captureDates(task) };
    const result = taskRepository.create(newTask);
    if (!result) throw new Error('Could not create task');

    return result;
  }

  update(id: string, updatedData: Partial<DTask>) {
    const task = this.get(id);
    if (!this.isDTask(task)) return null;

    const { createdDate } = task;
    const updatedTask: DTask = { ...task, ...updatedData, id: id, createdDate: createdDate };
    updatedTask.dates = this.captureDates(updatedTask);

    return taskRepository.update(updatedTask);
  }

  delete(id: string) {
    return this.get(id) && taskRepository.delete(id);
  }

  getStats() {
    const tasks = this.getAll();

    const stats: TaskStatObject[] = TASK_CATEGORIES.map((category) => ({
      categoryName: category,
      active: tasks.filter((task) => task.category === category && !task.isArchived).length,
      archived: tasks.filter((task) => task.category === category && task.isArchived).length,
    }));

    return stats;
  }
}

const taskService = new TaskService();

export default taskService;
