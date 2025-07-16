import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { getUserFromLocalStorage } from "./auth.js";

export function toggleLike(event) {
  event.stopPropagation();

  const user = getUserFromLocalStorage();
  if (!user) {
    alert("Для оценки комментариев необходимо авторизоваться");
    return;
  }

  const index = event.target.dataset.index;
  const comment = comments[index];

  // Если уже идет загрузка, ничего не делаем
  if (comment.isLikeLoading) return;

  // Устанавливаем состояние загрузки
  comment.isLikeLoading = true;
  renderComments();

  fetch(
    `https://wedev-api.sky.pro/api/v2/Alex-Klim93/comments/${comment.id}/toggle-like`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при оценке комментария");
      }
      return response.json();
    })
    .then((data) => {
      // Обновляем данные комментария из ответа сервера
      comment.likes = data.result.likes;
      comment.isLiked = data.result.isLiked;
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      alert(error.message);
    })
    .finally(() => {
      comment.isLikeLoading = false;
      renderComments();
    });
}
