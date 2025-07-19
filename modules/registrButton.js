import { getUserFromLocalStorage } from "./auth.js";

export function registrButton() {
  const registrContainer = document.createElement("div");
  registrContainer.className = "registr-container";

  const registrBtn = document.createElement("button");
  registrBtn.className = "registr-button";
  registrBtn.textContent = "Авторизоваться";

  // Стилизация
  registrContainer.style.position = "fixed";
  registrContainer.style.top = "20px";
  registrContainer.style.right = "20px";
  registrContainer.style.zIndex = "1000";

  registrContainer.appendChild(registrBtn);
  document.body.appendChild(registrContainer);

  // Показываем/скрываем в зависимости от авторизации
  const user = getUserFromLocalStorage();
  registrContainer.style.display = user ? "none" : "block";

  return registrBtn;
}
