interface DTask {
  name: string;
  category: Category;
  content: string;
  dates?: string | null;
  isArchived?: boolean;
  createdDate: Date;
  id: string;
}
