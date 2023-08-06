interface ETask {
  name: string;
  category: 'task' | 'random thought' | 'idea';
  content: string;
  dates?: string | null;
  isArchived?: boolean;
}

interface TaskStatObject {
  categoryName: string;
  archived: number;
  active: number;
}
