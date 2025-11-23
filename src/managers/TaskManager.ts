import { Task } from '../models/Task';
import { createTask } from '../models/Task';
import { TaskStorage } from '../storage/TaskStorage';

export interface TaskManager {
  addTask(description: string): Task | null;
  toggleTask(id: string): boolean;
  deleteTask(id: string): boolean;
  getAllTasks(): Task[];
}

export class TaskManagerImpl implements TaskManager {
  private tasks: Task[] = [];
  private storage: TaskStorage;

  constructor(storage: TaskStorage) {
    this.storage = storage;
    this.tasks = this.storage.loadTasks();
  }

  addTask(description: string): Task | null {
    const task = createTask(description);
    if (!task) {
      return null;
    }

    this.tasks.push(task);
    this.storage.saveTasks(this.tasks);
    return task;
  }

  toggleTask(id: string): boolean {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      return false;
    }

    task.completed = !task.completed;
    this.storage.saveTasks(this.tasks);
    return true;
  }

  deleteTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    
    if (this.tasks.length === initialLength) {
      return false;
    }

    this.storage.saveTasks(this.tasks);
    return true;
  }

  getAllTasks(): Task[] {
    return [...this.tasks];
  }
}
