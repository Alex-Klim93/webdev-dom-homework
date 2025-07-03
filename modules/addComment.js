import { renderComments } from "./renderComments.js";
import { sanitizeInput } from "./sanitizeInput.js";
import { comments, updateTasks } from "./comments.js";

const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const addForm = document.querySelector(".add-form");
const addButton = document.querySelector(".add-form-button");

// Сохраняем исходные стили формы
const originalFormStyles = {
  display: addForm.style.display,
  opacity: addForm.style.opacity,
  pointerEvents: addForm.style.pointerEvents,
};

export function addComment() {
  addButton.addEventListener("click", () => {
    let name = sanitizeInput(nameInput.value.trim());
    let comment = sanitizeInput(commentInput.value.trim());

    // Валидация длины
    if (name.length < 3 || comment.length < 3) {
      alert("Имя и комментарий должны содержать минимум 3 символа");
      return;
    }

    const newComment = {
      name: name,
      text: comment,
      forceError: true,
    };

    const originalComments = [...comments];

    // Применяем стили для состояния загрузки
    addForm.style.opacity = "0.5";
    addForm.style.pointerEvents = "none";
    addButton.disabled = true;
    addButton.textContent = "Загрузка...";

    fetch("https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments", {
      method: "POST",
      body: JSON.stringify(newComment),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 500) throw new Error("Ошибка сервера");
          if (response.status === 400) throw new Error("Некорректный запрос");
          throw new Error("Ошибка сети");
        }
        return fetch("https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments");
      })
      .then((response) => response.json())
      .then((data) => {
        updateTasks(data.comments);
        renderComments();
        nameInput.value = "";
        commentInput.value = "";
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert(
          error.message.includes("сервера")
            ? "Ошибка сервера, попробуйте позже"
            : "Проверьте введенные данные"
        );
        updateTasks(originalComments);
        renderComments();
      })
      .finally(() => {
        // Восстанавливаем исходные стили формы
        addForm.style.opacity = originalFormStyles.opacity;
        addForm.style.pointerEvents = originalFormStyles.pointerEvents;
        addButton.disabled = false;
        addButton.textContent = "Написать";

        // Автоматический повтор при 500 ошибке
        if (error && error.message === "Ошибка сервера") {
          setTimeout(() => addButton.click(), 2000);
        }
      });
  });
}
