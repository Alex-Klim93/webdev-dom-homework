import { renderComments } from "./renderComments.js";
import { sanitizeInput } from "./sanitizeInput.js";
import { comments, updateTasks } from "./comments.js";
import { getUserFromLocalStorage } from "./auth.js";

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
  const user = getUserFromLocalStorage();

  // Если пользователь не авторизован, скрываем форму добавления комментария
  if (!user) {
    addForm.style.display = "none";
    return;
  }

  // Показываем форму, если пользователь авторизован
  addForm.style.display = "flex";

  // Заполняем имя пользователя из данных авторизации
  nameInput.value = user.name;
  nameInput.disabled = true;

  addButton.addEventListener("click", () => {
    const comment = sanitizeInput(commentInput.value.trim());

    // Валидация длины
    if (comment.length < 3) {
      alert("Комментарий должен содержать минимум 3 символа");
      return;
    }

    // Применяем стили для состояния загрузки
    addForm.style.opacity = "0.5";
    addForm.style.pointerEvents = "none";
    addButton.disabled = true;
    addButton.textContent = "Загрузка...";

    fetch("https://wedev-api.sky.pro/api/v2/Alex-Klim93/comments", {
      method: "POST",
      body: JSON.stringify({
        text: comment,
      }),
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) throw new Error("Ошибка авторизации");
          if (response.status === 500) throw new Error("Ошибка сервера");
          if (response.status === 400) throw new Error("Некорректный запрос");
          throw new Error("Ошибка сети");
        }
        return fetch("https://wedev-api.sky.pro/api/v2/Alex-Klim93/comments");
      })
      .then((response) => response.json())
      .then((data) => {
        updateTasks(data.comments);
        renderComments();
        commentInput.value = "";
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert(
          error.message.includes("сервера")
            ? "Ошибка сервера, попробуйте позже"
            : error.message.includes("авторизации")
              ? "Ошибка авторизации. Пожалуйста, войдите снова"
              : "Проверьте введенные данные"
        );
      })
      .finally(() => {
        // Восстанавливаем исходные стили формы
        addForm.style.opacity = originalFormStyles.opacity;
        addForm.style.pointerEvents = originalFormStyles.pointerEvents;
        addButton.disabled = false;
        addButton.textContent = "Написать";
      });
  });
}
