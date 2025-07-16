import { renderComments } from "./modules/renderComments.js";
import { addComment } from "./modules/addComment.js";
import { updateTasks } from "./modules/comments.js";
import { getUserFromLocalStorage } from "./modules/auth.js";
import { fetchComments } from "./modules/fetchComments.js";
import {
  saveUserToLocalStorage,
  loginUser,
  registerUser,
} from "./modules/auth.js";

// Создаем элементы для авторизации
const loginForm = document.createElement("div");
loginForm.className = "login-form";
loginForm.innerHTML = `
  <h2>Вход</h2>
  <input type="text" class="login-input" placeholder="Логин">
  <input type="password" class="password-input" placeholder="Пароль">
  <button class="login-button">Войти</button>
  <button class="register-button">Зарегистрироваться</button>
  <div class="auth-error"></div>
`;

const registerForm = document.createElement("div");
registerForm.className = "register-form";
registerForm.style.display = "none";
registerForm.innerHTML = `
  <h2>Регистрация</h2>
  <input type="text" class="register-login-input" placeholder="Логин">
  <input type="text" class="register-name-input" placeholder="Имя">
  <input type="password" class="register-password-input" placeholder="Пароль">
  <button class="submit-register-button">Зарегистрироваться</button>
  <button class="back-to-login-button">Назад к входу</button>
  <div class="register-error"></div>
`;

const container = document.querySelector(".container");
container.prepend(loginForm);
container.prepend(registerForm);

// Функция для отображения сообщения о загрузке
function showLoadingMessage() {
  updateTasks([
    {
      author: { name: "" },
      text: "Пожалуйста подождите, идет загрузка...",
      date: "",
      likes: 0,
      isLiked: false,
      isPlainText: true,
    },
  ]);
  renderComments();
}

// Функция для отображения сообщения об ошибке
function showErrorMessage(message) {
  updateTasks([
    {
      author: { name: "" },
      text: message,
      isPlainText: true,
    },
  ]);
  renderComments();
}

// Проверяем, авторизован ли пользователь
const user = getUserFromLocalStorage();
if (user) {
  loginForm.style.display = "none";
  registerForm.style.display = "none";
}

// Показываем сообщение о загрузке
showLoadingMessage();

// Добавляем обработчики для форм авторизации и регистрации
document.querySelector(".login-button").addEventListener("click", handleLogin);
document.querySelector(".register-button").addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});
document
  .querySelector(".back-to-login-button")
  .addEventListener("click", () => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });
document
  .querySelector(".submit-register-button")
  .addEventListener("click", handleRegister);

// Загружаем комментарии
loadComments();

async function loadComments() {
  try {
    const comments = await fetchComments();
    if (comments.length === 0) {
      showErrorMessage("Пока нет комментариев. Будьте первым!");
    } else {
      renderComments();
    }
    addComment();
  } catch (error) {
    console.error("Ошибка загрузки комментариев:", error);
    showErrorMessage(
      error.message.includes("сети")
        ? "Не удалось загрузить комментарии. Проверьте интернет и попробуйте позже."
        : "Ошибка сервера. Попробуйте позже."
    );
  }
}

async function handleLogin() {
  const login = document.querySelector(".login-input").value;
  const password = document.querySelector(".password-input").value;
  const errorElement = document.querySelector(".auth-error");

  errorElement.textContent = "";
  showLoadingMessage();

  try {
    const user = await loginUser({ login, password });
    saveUserToLocalStorage(user);
    loginForm.style.display = "none";
    await loadComments();
    addComment();
  } catch (error) {
    errorElement.textContent = error.message;
    showErrorMessage("Ошибка авторизации. Попробуйте снова.");
  }
}

async function handleRegister() {
  const login = document.querySelector(".register-login-input").value;
  const name = document.querySelector(".register-name-input").value;
  const password = document.querySelector(".register-password-input").value;
  const errorElement = document.querySelector(".register-error");

  errorElement.textContent = "";
  showLoadingMessage();

  try {
    const user = await registerUser({ login, name, password });
    saveUserToLocalStorage(user);
    registerForm.style.display = "none";
    await loadComments();
    addComment();
  } catch (error) {
    errorElement.textContent = error.message;
    showErrorMessage("Ошибка регистрации. Попробуйте снова.");
  }
}
