import { boolean, object, ObjectSchema, string } from 'yup';

const newTaskSchema: ObjectSchema<ETask> = object({
  name: string().min(3).required(),
  category: string<'task' | 'random thought' | 'idea'>().required(),
  content: string().min(3).required(),
  dates: string().nullable(),
  isArchived: boolean(),
});

export default newTaskSchema;
