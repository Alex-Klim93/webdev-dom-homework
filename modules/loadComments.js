import { renderComments } from "./renderComments.js";
import { removeUserFromLocalStorage } from "./auth.js";
import { fetchComments } from "./fetchComments.js";
import { addComment } from "./addComment.js";
import { showErrorMessage } from "../index.js";

// Основные функции
export async function loadComments() {
  try {
    const comments = await fetchComments();
    if (comments.length === 0) {
      showErrorMessage("Пока нет комментариев. Будьте первым!");
    } else {
      renderComments();
    }
    addComment();
  } catch (error) {
    console.error("Ошибка загрузки комментариев:", error);
    showErrorMessage(
      error.message.includes("сети")
        ? "Не удалось загрузить комментарии. Проверьте интернет и попробуйте позже."
        : "Ошибка сервера. Попробуйте позже.",
      console.error("Date formatting error:", error)
    );

    // Если ошибка 401 (не авторизован), разлогиниваем пользователя
    if (error.message.includes("401")) {
      removeUserFromLocalStorage();
      document.querySelector(".login-form").style.display = "block";
    }
  }
}
