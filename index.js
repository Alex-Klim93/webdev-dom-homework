import { renderComments } from "./modules/renderComments.js";
import { updateTasks } from "./modules/comments.js";
import { initApp } from "./modules/initApp.js";

export function showErrorMessage(message) {
  updateTasks([
    {
      author: { name: "" },
      text: message,
      isPlainText: true,
    },
  ]);
  renderComments();
}

// Инициализация приложения
initApp();
