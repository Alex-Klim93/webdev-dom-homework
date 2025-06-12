import { comments } from "./comments.js";
import { toggleLike } from "./toggleLike.js";

const commentsList = document.querySelector(".comments");
const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");

export function renderComments() {
  commentsList.innerHTML = ""; // Очищаем список перед отрисовкой
  comments.forEach((comment, index) => {
    const commentBlock = `<li class="comment" data-indexLi="${index}">
                <div class="comment-header" data-indexLi="${index}">
                    <div>${comment.author}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body" data-indexLi="${index}">
                    <div class="comment-text" data-indexLi="${index}">
                        ${comment.text}
                    </div>
                </div>
                <div class="comment-footer" data-indexLi="${index}">
                    <div class="likes" data-indexLi="${index}">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="like-button ${
                          comment.liked ? "-active-like" : ""
                        }" data-index="${index}"></button>
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
      //nameInput.value = comment.author;  // Заполняем поле имени автора
      commentInput.value = ">>> " + comment.author + "\n" + comment.text; // Заполняем поле текста комментария
    });
  });

  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation(); // Останавливаем всплытие события
      const index = event.target.dataset.index; // Получаем индекс комментария
      toggleLike(event);
    });
  });
}

renderComments();
