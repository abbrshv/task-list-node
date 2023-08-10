import { boolean, date, object, ObjectSchema, string } from 'yup';
import { Category, TASK_CATEGORIES } from '../constants/taskCategories.js';

const updateTaskSchema: ObjectSchema<Partial<DTask>> = object({
  name: string().min(3),
  category: string<Category>().oneOf(TASK_CATEGORIES),
  content: string().min(3),
  dates: string().nullable(),
  isArchived: boolean(),
  id: string(),
  createdAt: date(),
  updatedAt: date(),
  deletedAt: date(),
}).noUnknown(true);

export default updateTaskSchema;
