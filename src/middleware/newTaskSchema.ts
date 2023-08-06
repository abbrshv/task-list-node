import { boolean, object, ObjectSchema, string } from 'yup';
import { TASK_CATEGORIES, Category } from '../constants/taskCategories.js';

const newTaskSchema: ObjectSchema<ETask> = object({
  name: string().min(3).required(),
  category: string<Category>().oneOf(TASK_CATEGORIES).required(),
  content: string().min(3).required(),
  dates: string().nullable(),
  isArchived: boolean(),
}).noUnknown(true);

export default newTaskSchema;
