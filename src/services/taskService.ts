import taskRepository from '../repositories/taskRepository.js';

class TaskService {
  isTask(obj: any): obj is ETask {
    return 'name' in obj && 'category' in obj && 'content' in obj;
  }

  captureDates(task: ETask) {
    const dateRegex = /(0?[1-9]|[12][0-9]|3[01])(\/|-)(0?[1-9]|1[1,2])(\/|-)(19|20)\d{2}/g;
    const datesArray = task.content.match(dateRegex);

    return datesArray ? datesArray.join(', ') : null;
  }

  getAll() {
    const result = taskRepository.getAll();
    return result || null;
  }

  getAllActive() {
    const tasks = this.getAll();
    return tasks ? tasks.filter((task) => !task.isArchived) : [];
  }

  getAllArchived() {
    const tasks = this.getAll();
    return tasks ? tasks.filter((task) => task.isArchived) : [];
  }

  get(id: string) {
    const result = taskRepository.getOne(id);
    if (!result) {
      throw new Error(`Task with id ${id} doesn't exist`);
    }
    return result;
  }

  create(task: ETask) {
    const newTask = { ...task, isArchived: false, dates: this.captureDates(task) };

    const result = taskRepository.create(newTask);
    if (!result) {
      throw new Error('Could not create task');
    }

    return result;
  }

  update(id: string, updatedData: object) {
    const task = this.get(id);

    if (!this.isTask(task)) return null;

    const updatedTask: ETask = { ...task, ...updatedData };
    updatedTask.dates = this.captureDates(updatedTask);

    return taskRepository.update(id, updatedTask);
  }

  delete(id: string) {
    const result = taskRepository.delete(id);
    if (!result) {
      throw new Error(`Task with id ${id} doesn't exist`);
    }
    return result;
  }

  changeArchiveStatus(id: string) {
    const task = this.get(id);

    const updatedTask = { ...task, isArchived: !task.isArchived };

    this.update(id, updatedTask);
  }

  getStats() {
    const activeTasks = this.getAllActive();
    const archivedTasks = this.getAllArchived();

    const stats: TaskStatObject[] = categories.map((category) => ({
      categoryName: category[0].toUpperCase() + category.slice(1),
      archived: archivedTasks.filter((task) => task.category === category).length,
      active: activeTasks.filter((task) => task.category === category).length,
    }));

    return stats;
  }
}

const taskService = new TaskService();

export default taskService;
