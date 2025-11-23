import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { LocalStorageTaskStorage } from './TaskStorage';
import { Task } from '../models/Task';

describe('TaskStorage - Property Tests', () => {
  let storage: LocalStorageTaskStorage;

  beforeEach(() => {
    localStorage.clear();
    storage = new LocalStorageTaskStorage();
  });

  /**
   * Feature: todo-list-app, Property 4: Storage persistence round-trip
   * Validates: Requirements 1.4, 4.1
   */
  it('should preserve all task data through save and load cycle', () => {
    const taskArbitrary = fc.record({
      id: fc.uuid(),
      description: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
      completed: fc.boolean(),
      createdAt: fc.integer({ min: 0 }),
    });

    fc.assert(
      fc.property(
        fc.array(taskArbitrary),
        (tasks: Task[]) => {
          storage.saveTasks(tasks);
          const loaded = storage.loadTasks();
          expect(loaded).toEqual(tasks);
        }
      ),
      { numRuns: 100 }
    );
  });
});
