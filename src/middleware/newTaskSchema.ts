import { boolean, object, ObjectSchema, string } from 'yup';

const newTaskSchema: ObjectSchema<ETask> = object({
  name: string().required(),
  category: string<'task' | 'random thought' | 'idea'>().required(),
  content: string().required(),
  dates: string().nullable(),
  isArchived: boolean(),
});

export default newTaskSchema;
