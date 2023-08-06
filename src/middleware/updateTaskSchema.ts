import { boolean, date, object, ObjectSchema, string } from 'yup';
import { TASK_CATEGORIES, Category } from '../constants/taskCategories.js';

const updateTaskSchema: ObjectSchema<Partial<DTask>> = object({
  name: string().min(3),
  category: string<Category>().oneOf(TASK_CATEGORIES),
  content: string().min(3),
  dates: string().nullable(),
  isArchived: boolean(),
  createdDate: date(),
  id: string(),
}).noUnknown(true);

export default updateTaskSchema;
