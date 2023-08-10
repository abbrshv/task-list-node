import taskRepository from '../repositories/taskRepository.js';
import { TASK_CATEGORIES } from '../constants/taskCategories.js';
import Task from '../database/models/Task.js';

class TaskService {
  captureDates(task: ETask | DTask | Partial<DTask> | Partial<ETask>) {
    const dateRegex = /(0?[1-9]|[12][0-9]|3[01])(\/|-)(0?[1-9]|1[1,2])(\/|-)(19|20)\d{2}/g;
    if (!task.content) return null;
    const datesArray = task.content.match(dateRegex);

    return datesArray ? datesArray.join(', ') : null;
  }

  getAll() {
    return taskRepository.getAll();
  }

  get(id: string) {
    return taskRepository.getOne(id);
  }

  create(task: ETask) {
    const newTask = { ...task, isArchived: false, dates: this.captureDates(task) };
    return taskRepository.create(newTask as Task);
  }

  update(id: string, updatedData: Partial<DTask>) {
    const updatedDataWithDates = { ...updatedData, dates: this.captureDates(updatedData) };
    return taskRepository.update(id, updatedDataWithDates);
  }

  delete(id: string) {
    return taskRepository.delete(id);
  }

  async getStats() {
    const tasks = await this.getAll();
    const tasksUnwrapped = tasks.map((task) => task.get({ plain: true }));

    const stats: TaskStatObject[] = TASK_CATEGORIES.map((category) => ({
      categoryName: category,
      active: tasksUnwrapped.filter((task) => task.category === category && !task.isArchived)
        .length,
      archived: tasksUnwrapped.filter((task) => task.category === category && task.isArchived)
        .length,
    }));

    return stats;
  }
}

const taskService = new TaskService();

export default taskService;
