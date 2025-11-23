import { Task } from '../models/Task';
import { TaskManager } from '../managers/TaskManager';

export class UIController {
  private taskManager: TaskManager;
  private taskInput: HTMLInputElement;
  private taskList: HTMLUListElement;
  private emptyState: HTMLElement;
  private addTaskForm: HTMLFormElement;

  constructor(taskManager: TaskManager) {
    this.taskManager = taskManager;
    
    this.taskInput = document.getElementById('task-input') as HTMLInputElement;
    this.taskList = document.getElementById('task-list') as HTMLUListElement;
    this.emptyState = document.getElementById('empty-state') as HTMLElement;
    this.addTaskForm = document.getElementById('add-task-form') as HTMLFormElement;

    this.setupEventListeners();
    this.render();
  }

  private setupEventListeners(): void {
    this.addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddTask();
    });
  }

  private handleAddTask(): void {
    const description = this.taskInput.value;
    const task = this.taskManager.addTask(description);
    
    if (task) {
      this.taskInput.value = '';
      this.taskInput.focus();
      this.render();
    }
  }

  private handleToggleTask(id: string): void {
    this.taskManager.toggleTask(id);
    this.render();
  }

  private handleDeleteTask(id: string): void {
    this.taskManager.deleteTask(id);
    this.render();
  }

  private renderTask(task: Task): HTMLLIElement {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;
    li.dataset.taskId = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => this.handleToggleTask(task.id));

    const description = document.createElement('span');
    description.className = 'task-description';
    description.textContent = task.description;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => this.handleDeleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(description);
    li.appendChild(deleteButton);

    return li;
  }

  private render(): void {
    const tasks = this.taskManager.getAllTasks();
    
    // Clear existing tasks
    this.taskList.innerHTML = '';

    // Show/hide empty state
    if (tasks.length === 0) {
      this.emptyState.style.display = 'block';
      this.taskList.style.display = 'none';
    } else {
      this.emptyState.style.display = 'none';
      this.taskList.style.display = 'block';
      
      // Render all tasks
      tasks.forEach(task => {
        const taskElement = this.renderTask(task);
        this.taskList.appendChild(taskElement);
      });
    }
  }
}
