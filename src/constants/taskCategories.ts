export const TASK_CATEGORIES = ['task', 'random thought', 'idea'] as const;
export type Category = (typeof TASK_CATEGORIES)[number];
