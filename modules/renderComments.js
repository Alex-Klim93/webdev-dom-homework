import { comments } from "./comments.js";
import { toggleLike } from "./toggleLike.js";
//import { exetButton } from "./exetButton.js";
//import { formatDistanceToNow } from "https://unpkg.com/date-fns/formatDistanceToNow.mjs";
import { format } from " https://cdn.jsdelivr.net/npm/date-fns@3/+esm ";
import { ru } from " https://cdn.jsdelivr.net/npm/date-fns@3/locale/ru/+esm ";

export const commentsList = document.querySelector(".comments");
export const commentOne = document.querySelector(".comment");
//const nameInput = document.querySelector('.add-form-name')
const commentInput = document.querySelector(".add-form-text");

export function renderComments() {
  commentsList.innerHTML = ""; // Очищаем список перед отрисовкой

  comments.forEach((comment, index) => {
    const timeDay = comment.date
      ? format(new Date(comment.date), "dd.MM.yyyy HH:mm", {
          locale: ru,
        })
      : "Дата не указана";
    const commentBlock = comment.isPlainText
      ? `<li class="comment" style="color: white; background: none; border: none; padding: 0; list-style: none; margin: 0;">
                  <div class="comment-text" style="color: white; padding: 10px;">
                      ${comment.text}
                  </div>
              </li>`
      : `<li class="comment" data-indexLi="${index}">
                  <div class="comment-header" data-indexLi="${index}">
                      <div>${comment.author.name}</div>
                      <div>${timeDay}</div>
                  </div>
                  <div class="comment-body" data-indexLi="${index}">
                      <div class="comment-text" data-indexLi="${index}">
                          ${comment.text}
                      </div>
                  </div>
                  <div class="comment-footer" data-indexLi="${index}">
                      <div class="likes" data-indexLi="${index}">
                          <span class="likes-counter">${comment.likes}</span>
                          <button class="like-button 
                                ${comment.isLiked ? "-active-like" : ""} 
                                ${comment.isLikeLoading ? "-loading-like" : ""}" 
                                data-index="${index}">
                            </button>
                      </div>
                  </div>
              </li>`;

    commentsList.innerHTML += commentBlock;
  });

  const commentsElements = commentsList.querySelectorAll(".comment");
  commentsElements.forEach((commentElement) => {
    commentElement.addEventListener("click", (event) => {
      const indexLi = commentElement.getAttribute("data-indexLi");
      const comment = comments[indexLi];
      //nameInput.value = comment.author.name;  // Заполняем поле имени автора
      commentInput.value = ">>> " + comment.author.name + "\n" + comment.text; // Заполняем поле текста комментария
    });
  });

  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      //event.stopPropagation() // Останавливаем всплытие события
      const indexLi = event.target.dataset.index; // Получаем индекс комментария
      toggleLike(event);
    });
  });
}
renderComments();
