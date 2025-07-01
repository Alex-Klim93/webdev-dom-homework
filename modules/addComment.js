import { renderComments } from "./renderComments.js";
import { sanitizeInput } from "./sanitizeInput.js";
import { fetchComments } from "./fetchComments.js";
import { comments, updateTasks } from "./comments.js";

const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const addForm = document.querySelector(".add-form"); // Получаем форму

export function addComment() {
  const addButton = document.querySelector(".add-form-button");

  addButton.addEventListener("click", () => {
    let name = sanitizeInput(nameInput.value.trim());
    let comment = sanitizeInput(commentInput.value.trim());

    // Проверка на пустые поля
    if (!name || !comment) {
      alert("Пожалуйста, заполните все поля.");
      nameInput.value = "";
      commentInput.value = "";
      return;
    }

    const newComment = {
      name: name,
      text: comment,
    };

    // Сохраняем текущие комментарии
    const originalComments = [...comments];

    // Скрываем форму и показываем сообщение о загрузке
    addForm.style.display = "none";
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading-message";
    loadingDiv.textContent = "Пожалуйста подождите, идет загрузка...";
    addForm.parentNode.insertBefore(loadingDiv, addForm.nextSibling);

    // Очистка полей ввода
    nameInput.value = "";
    commentInput.value = "";

    addButton.textContent = "Загрузка...";
    addButton.disabled = true;

    fetch("https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments", {
      method: "POST",
      body: JSON.stringify(newComment),
    })
      .then(() => {
        return fetch("https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments");
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки комментариев");
        }
        return response.json();
      })
      .then((data) => {
        updateTasks(data.comments);
        renderComments();
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        updateTasks(originalComments);
        renderComments();
      })
      .finally(() => {
        // Восстанавливаем форму и убираем сообщение о загрузке
        addForm.style.display = "block";
        const loadingMessage = document.querySelector(".loading-message");
        if (loadingMessage) {
          loadingMessage.remove();
        }
        addButton.disabled = false;
        addButton.textContent = "Написать";
      });
  });
}