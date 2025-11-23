// Task model tests
import { describe, it, expect } from 'vitest';
import { Task, isValidTaskDescription, createTask } from './Task';

describe('Task Model', () => {
  it('should have correct interface structure', () => {
    const task: Task = {
      id: '1',
      description: 'Test task',
      completed: false,
      createdAt: Date.now(),
    };
    
    expect(task).toBeDefined();
    expect(task.id).toBe('1');
    expect(task.description).toBe('Test task');
    expect(task.completed).toBe(false);
    expect(typeof task.createdAt).toBe('number');
  });

  describe('isValidTaskDescription', () => {
    it('should reject empty string', () => {
      expect(isValidTaskDescription('')).toBe(false);
    });

    it('should reject whitespace-only strings', () => {
      expect(isValidTaskDescription('   ')).toBe(false);
      expect(isValidTaskDescription('\t')).toBe(false);
      expect(isValidTaskDescription('\n')).toBe(false);
    });

    it('should accept valid descriptions', () => {
      expect(isValidTaskDescription('Buy groceries')).toBe(true);
      expect(isValidTaskDescription('  Valid task  ')).toBe(true);
    });
  });

  describe('createTask', () => {
    it('should create task with valid description', () => {
      const task = createTask('Buy groceries');
      
      expect(task).not.toBeNull();
      expect(task?.description).toBe('Buy groceries');
      expect(task?.completed).toBe(false);
      expect(task?.id).toBeDefined();
      expect(typeof task?.createdAt).toBe('number');
    });

    it('should return null for whitespace-only description', () => {
      expect(createTask('   ')).toBeNull();
      expect(createTask('\t\n')).toBeNull();
    });

    it('should trim whitespace from description', () => {
      const task = createTask('  Task with spaces  ');
      expect(task?.description).toBe('Task with spaces');
    });

    it('should set completed to false by default', () => {
      const task = createTask('New task');
      expect(task?.completed).toBe(false);
    });
  });
});
