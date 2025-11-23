import { describe, it, expect, beforeEach } from 'vitest';
import { TaskManagerImpl } from './TaskManager';
import { LocalStorageTaskStorage } from '../storage/TaskStorage';

describe('TaskManager', () => {
  let manager: TaskManagerImpl;
  let storage: LocalStorageTaskStorage;

  beforeEach(() => {
    localStorage.clear();
    storage = new LocalStorageTaskStorage();
    manager = new TaskManagerImpl(storage);
  });

  describe('addTask', () => {
    it('should add valid task and return it', () => {
      const task = manager.addTask('Buy groceries');
      
      expect(task).not.toBeNull();
      expect(task?.description).toBe('Buy groceries');
      expect(task?.completed).toBe(false);
      
      const allTasks = manager.getAllTasks();
      expect(allTasks).toHaveLength(1);
      expect(allTasks[0]).toEqual(task);
    });

    it('should reject whitespace-only task', () => {
      const task = manager.addTask('   ');
      
      expect(task).toBeNull();
      expect(manager.getAllTasks()).toHaveLength(0);
    });

    it('should persist task to storage', () => {
      manager.addTask('Test task');
      
      const newManager = new TaskManagerImpl(storage);
      expect(newManager.getAllTasks()).toHaveLength(1);
    });
  });

  describe('toggleTask', () => {
    it('should toggle task completion status', () => {
      const task = manager.addTask('Test task');
      expect(task?.completed).toBe(false);
      
      const result = manager.toggleTask(task!.id);
      expect(result).toBe(true);
      
      const tasks = manager.getAllTasks();
      expect(tasks[0].completed).toBe(true);
    });

    it('should return false for non-existent task', () => {
      const result = manager.toggleTask('non-existent-id');
      expect(result).toBe(false);
    });

    it('should persist toggle to storage', () => {
      const task = manager.addTask('Test task');
      manager.toggleTask(task!.id);
      
      const newManager = new TaskManagerImpl(storage);
      const tasks = newManager.getAllTasks();
      expect(tasks[0].completed).toBe(true);
    });
  });

  describe('deleteTask', () => {
    it('should delete task and return true', () => {
      const task = manager.addTask('Test task');
      
      const result = manager.deleteTask(task!.id);
      expect(result).toBe(true);
      expect(manager.getAllTasks()).toHaveLength(0);
    });

    it('should return false for non-existent task', () => {
      const result = manager.deleteTask('non-existent-id');
      expect(result).toBe(false);
    });

    it('should persist deletion to storage', () => {
      const task = manager.addTask('Test task');
      manager.deleteTask(task!.id);
      
      const newManager = new TaskManagerImpl(storage);
      expect(newManager.getAllTasks()).toHaveLength(0);
    });
  });

  describe('getAllTasks', () => {
    it('should return empty array initially', () => {
      expect(manager.getAllTasks()).toEqual([]);
    });

    it('should return all tasks', () => {
      manager.addTask('Task 1');
      manager.addTask('Task 2');
      
      const tasks = manager.getAllTasks();
      expect(tasks).toHaveLength(2);
    });

    it('should return a copy of tasks array', () => {
      manager.addTask('Task 1');
      const tasks1 = manager.getAllTasks();
      const tasks2 = manager.getAllTasks();
      
      expect(tasks1).not.toBe(tasks2);
      expect(tasks1).toEqual(tasks2);
    });
  });
});
