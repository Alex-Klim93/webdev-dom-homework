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
    //id: {data:index},
    date: date,
    likes: 0,
    isLiked: false,
    text: String(comment),
    author: {name:String(name)},
  }

  renderComments();

  // Очистка полей ввода
  nameInput.value = "";
  commentInput.value = "";
  console.log("Имя:", name);
  console.log("Комментарий:", comment);
  console.log("Комментарий:", newComment);

  comments.push(newComment);
  fetch("https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments", {
    method: "POST",
    body: JSON.stringify(comments),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      updateTasks(data.String(comments));
      renderComments();
    });
}

const addButton = document.querySelector(".add-form-button");

addButton.addEventListener("click", addComment);
