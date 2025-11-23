import { LocalStorageTaskStorage } from './storage/TaskStorage';
import { TaskManagerImpl } from './managers/TaskManager';
import { UIController } from './ui/UIController';

// Initialize application
function initApp() {
  const storage = new LocalStorageTaskStorage();
  const taskManager = new TaskManagerImpl(storage);
  new UIController(taskManager);
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
