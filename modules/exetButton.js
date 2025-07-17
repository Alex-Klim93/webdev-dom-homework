import { logoutUser, getUserFromLocalStorage } from "./auth.js";

export function exetButton() {
  const exetForm = document.createElement("div");
  exetForm.className = "exet-form";
  exetForm.style.display = "none";
  exetForm.innerHTML = `
  <button class="exet-button add-form-button">Выйти</button>
`;

  // Добавляем стили для позиционирования
  exetForm.style.position = "fixed";
  exetForm.style.top = "20px"; // Отступ сверху
  exetForm.style.right = "20px"; // Отступ справа
  exetForm.style.zIndex = "1000"; // Чтобы кнопка была поверх других элементов

  document.body.appendChild(exetForm);
  exetForm.style.display = "none";

  const logoutButton = document.querySelector(".exet-button");
  logoutButton.addEventListener("click", () => {
    // 1. Удаляем токен из localStorage
    logoutUser();
    exetForm.style.display = "none";
  });

  const user = getUserFromLocalStorage();
  if (user) {
    document.body.appendChild(exetForm);
    exetForm.style.display = "block";
  }
}
