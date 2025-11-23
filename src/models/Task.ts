export interface Task {
  id: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

export function isValidTaskDescription(description: string): boolean {
  return description.trim().length > 0;
}

export function createTask(description: string): Task | null {
  if (!isValidTaskDescription(description)) {
    return null;
  }
  
  return {
    id: crypto.randomUUID(),
    description: description.trim(),
    completed: false,
    createdAt: Date.now(),
  };
}
