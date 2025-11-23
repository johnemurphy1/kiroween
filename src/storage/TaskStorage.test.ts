import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageTaskStorage } from './TaskStorage';
import { Task } from '../models/Task';

describe('LocalStorageTaskStorage', () => {
  let storage: LocalStorageTaskStorage;

  beforeEach(() => {
    localStorage.clear();
    storage = new LocalStorageTaskStorage();
  });

  it('should return empty array when storage is empty', () => {
    const tasks = storage.loadTasks();
    expect(tasks).toEqual([]);
  });

  it('should save and load tasks', () => {
    const tasks: Task[] = [
      {
        id: '1',
        description: 'Test task',
        completed: false,
        createdAt: Date.now(),
      },
    ];

    storage.saveTasks(tasks);
    const loaded = storage.loadTasks();

    expect(loaded).toEqual(tasks);
  });

  it('should handle malformed data gracefully', () => {
    localStorage.setItem('todo-list-tasks', 'invalid json');
    const tasks = storage.loadTasks();
    expect(tasks).toEqual([]);
  });

  it('should handle non-array data gracefully', () => {
    localStorage.setItem('todo-list-tasks', '{"not": "an array"}');
    const tasks = storage.loadTasks();
    expect(tasks).toEqual([]);
  });
});
