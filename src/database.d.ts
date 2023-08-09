interface DTask {
  name: string;
  category: 'task' | 'random thought' | 'idea';
  content: string;
  dates?: string | null;
  isArchived?: boolean;
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
