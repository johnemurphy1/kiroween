import { Task } from '../models/Task';

export interface TaskStorage {
  loadTasks(): Task[];
  saveTasks(tasks: Task[]): void;
}

const STORAGE_KEY = 'todo-list-tasks';

export class LocalStorageTaskStorage implements TaskStorage {
  loadTasks(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return [];
      }
      
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) {
        console.warn('Invalid data format in storage, returning empty array');
        return [];
      }
      
      return parsed;
    } catch (error) {
      console.error('Error loading tasks from storage:', error);
      return [];
    }
  }

  saveTasks(tasks: Task[]): void {
    try {
      const data = JSON.stringify(tasks);
      localStorage.setItem(STORAGE_KEY, data);
    } catch (error) {
      console.error('Error saving tasks to storage:', error);
    }
  }
}
