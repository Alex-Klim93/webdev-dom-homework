import { renderComments } from "./modules/renderComments.js";
import { addComment } from "./modules/addComment.js";
import { updateTasks } from "./modules/comments.js";


const loadingMessage = {
  author: { name: "" },
  text: "Пожалуйста подождите, идет загрузка...",
  date: "",
  likes: 0,
  isLiked: false,
  isPlainText: true, // Флаг для стилизации (если нужно)
};


updateTasks([loadingMessage]);
renderComments();


fetch("https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Сервер не отвечает");
    }
    return response.json();
  })
  .then((data) => {
    updateTasks(data.comments); // Обновляем список
    renderComments(); // Перерисовываем
    addComment(); // Активируем кнопку отправки
  })
  .catch((error) => {
    console.error("Ошибка:", error);
    // Показываем сообщение об ошибке
    updateTasks([{
      author: { name: "" },
      text: "Не удалось загрузить комментарии. Попробуйте позже.",
      isPlainText: true,
    }]);
    renderComments();
  });