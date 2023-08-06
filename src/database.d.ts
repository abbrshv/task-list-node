interface DTask {
  name: string;
  category: 'task' | 'random thought' | 'idea';
  content: string;
  dates?: string | null;
  isArchived?: boolean;
  createdDate: Date;
  id: string;
}
