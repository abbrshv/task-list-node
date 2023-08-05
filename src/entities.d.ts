const categories = ['task', 'random thought', 'idea'] as const;
type Category = (typeof categories)[number];

interface ETask {
  name: string;
  category: Category;
  content: string;
  dates?: string | null;
  isArchived?: boolean;
}

interface TaskStatObject {
  categoryName: string;
  archived: number;
  active: number;
}
