import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";

export function toggleLike(event) {
  const index = event.target.dataset.index; // Получаем индекс комментария
  const comment = comments[index];

  // Переключаем состояние лайка
  comment.isLiked = !comment.isLiked;

  // Изменяем количество лайков
  comment.likes += comment.isLiked ? 1 : -1;

  // Перерисовываем комментарии
  renderComments();
}
