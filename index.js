import { renderComments } from "./modules/renderComments.js";
import { addComment } from "./modules/addComment.js";
import { updateTasks } from "./modules/comments.js";
import { getUserFromLocalStorage } from "./modules/auth.js";
import { fetchComments } from "./modules/fetchComments.js";
import {
  saveUserToLocalStorage,
  loginUser,
  registerUser,
  removeUserFromLocalStorage,
} from "./modules/auth.js";
import { exetButton } from "./modules/exetButton.js";
import { getUsersList } from "./modules/listUser.js";

// Инициализация приложения
function initApp() {
  // Создаем элементы для авторизации
  const loginForm = document.createElement("div");
  loginForm.className = "login-form";
  loginForm.innerHTML = `
    <h2>Форма входа</h2>
    <input type="text" class="login-input" placeholder="Логин" value="admin">
    <input type="password" class="password-input" placeholder="Пароль" value="admin">
    <button class="login-button">Войти</button>
    <button class="register-toggle-button">Регистрация</button>
    <div class="auth-error"></div>
  `;

  const registerForm = document.createElement("div");
  registerForm.className = "register-form";
  registerForm.style.display = "none";
  registerForm.innerHTML = `
    <h2>Форма регистрации</h2>
    <input type="text" class="register-login-input" placeholder="Логин">
    <input type="text" class="register-name-input" placeholder="Имя">
    <input type="password" class="register-password-input" placeholder="Пароль">
    <button class="submit-register-button">Зарегистрироваться</button>
    <button class="back-to-login-button">Назад</button>
    <div class="register-error"></div>
  `;

  const container = document.querySelector(".container");
  container.prepend(loginForm);
  container.prepend(registerForm);

  // Проверка авторизации при загрузке
  const user = getUserFromLocalStorage();
  if (user) {
    handleSuccessfulAuth();
  } else {
    showLoadingMessage();
  }

  // Обработчики событий
  document
    .querySelector(".login-button")
    .addEventListener("click", handleLogin);
  document
    .querySelector(".register-toggle-button")
    .addEventListener("click", () => {
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

  // Загрузка комментариев
  loadComments();
}

// Функции для работы с UI
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

function handleSuccessfulAuth() {
  document.querySelector(".login-form").style.display = "none";
  document.querySelector(".register-form").style.display = "none";
  exetButton();
  loadComments();
}

// Основные функции
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

    // Если ошибка 401 (не авторизован), разлогиниваем пользователя
    if (error.message.includes("401")) {
      removeUserFromLocalStorage();
      document.querySelector(".login-form").style.display = "block";
    }
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
    handleSuccessfulAuth();
  } catch (error) {
    errorElement.textContent = error.message;
    showErrorMessage("Ошибка авторизации. Проверьте логин и пароль.");
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
    handleSuccessfulAuth();
  } catch (error) {
    errorElement.textContent = error.message;
    showErrorMessage("Ошибка регистрации: " + error.message);
  }
}

// Инициализация приложения
initApp();
