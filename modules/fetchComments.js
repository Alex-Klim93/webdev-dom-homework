import { updateTasks } from "./comments.js";
import { getUserFromLocalStorage } from "./auth.js";

export function fetchComments() {
  const user = getUserFromLocalStorage();
  const personalKey = "Alex-Klim93";

  const headers = user ? { Authorization: `Bearer ${user.token}` } : {};

  return fetch(`https://wedev-api.sky.pro/api/v2/${personalKey}/comments`, {
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data) {
        throw new Error("Сервер вернул пустой ответ");
      }
      if (!Array.isArray(data.comments)) {
        throw new Error("Некорректный формат данных комментариев");
      }
      updateTasks(data.comments);
      return data.comments;
    })
    .catch((error) => {
      console.error("Ошибка при загрузке комментариев:", error);
      throw error; // Пробрасываем ошибку дальше для обработки в index.js
    });
}