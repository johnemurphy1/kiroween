// Property-based tests for Task model
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { createTask } from './Task';

describe('Task Model - Property Tests', () => {
  /**
   * Feature: todo-list-app, Property 2: Whitespace-only tasks are rejected
   * Validates: Requirements 1.2
   */
  it('should reject all whitespace-only strings', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[\s]+$/), // Generate strings with only whitespace characters
        (whitespaceString) => {
          const task = createTask(whitespaceString);
          expect(task).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: todo-list-app, Property 3: New tasks default to incomplete
   * Validates: Requirements 1.5
   */
  it('should set all new tasks to incomplete status', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter(s => s.trim().length > 0), // Valid task descriptions
        (description) => {
          const task = createTask(description);
          expect(task).not.toBeNull();
          expect(task?.completed).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});
