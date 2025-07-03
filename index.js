import { renderComments } from "./modules/renderComments.js";
import { addComment } from "./modules/addComment.js";
import { updateTasks } from "./modules/comments.js";

const loadingMessage = {
  author: { name: "" },
  text: "Пожалуйста подождите, идет загрузка...",
  date: "",
  likes: 0,
  isLiked: false,
  isPlainText: true,
};

updateTasks([loadingMessage]);
renderComments();

// Добавлена обработка ошибок сети и сервера
fetch("https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments")
  .then((response) => {
    if (!response.ok) {
      // Обрабатываем разные типы ошибок
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      } else {
        throw new Error("Ошибка сети");
      }
    }
    return response.json();
  })
  .then((data) => {
    updateTasks(data.comments);
    renderComments();
    addComment();
  })
  .catch((error) => {
    console.error("Ошибка:", error);
    // Показываем разные сообщения в зависимости от типа ошибки
    updateTasks([
      {
        author: { name: "" },
        text:
          error.message === "Ошибка сети"
            ? "Не удалось загрузить комментарии. Проверьте интернет и попробуйте позже."
            : "Ошибка сервера. Попробуйте позже.",
        isPlainText: true,
      },
    ]);
    renderComments();
  });
