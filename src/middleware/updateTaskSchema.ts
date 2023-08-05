import { boolean, date, object, ObjectSchema, string } from 'yup';

const updateTaskSchema: ObjectSchema<Partial<DTask>> = object({
  name: string().min(3),
  category: string<'task' | 'random thought' | 'idea'>(),
  content: string().min(3),
  dates: string().nullable(),
  isArchived: boolean(),
  createdDate: date(),
  id: string(),
});

export default updateTaskSchema;
