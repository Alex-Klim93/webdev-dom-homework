import { renderComments } from "./renderComments.js";
import { comments } from "./comments.js";
import { sanitizeInput } from "./sanitizeInput.js";

const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
export function addComment() {
  let name = sanitizeInput(nameInput.value.trim());
  let comment = sanitizeInput(commentInput.value.trim());
  const date = new Date().toLocaleString();

  // Проверка на пустые поля
  if (!name || !comment) {
    alert("Пожалуйста, заполните все поля.");
    nameInput.value = "";
    commentInput.value = "";
    return;
  }
  const newComment = {
    author: name,
    date: date,
    text: comment,
    likes: 0,
    liked: false,
  };

  comments.push(newComment);
  renderComments();

  // Очистка полей ввода
  nameInput.value = "";
  commentInput.value = "";
  console.log("Имя:", name);
  console.log("Комментарий:", comment);
}

const addButton = document.querySelector(".add-form-button");

addButton.addEventListener("click", addComment);
