import { renderComments, commentsList, commentOne } from "./renderComments.js";
import { updateTasks } from "./comments.js";
import { getUserFromLocalStorage } from "./auth.js";
import { saveUserToLocalStorage, loginUser, registerUser } from "./auth.js";
import { exetButton } from "./exetButton.js";
import { registrButton } from "./registrButton.js";
import { loadComments } from "./loadComments.js";
import { showErrorMessage } from "../index.js";

// Инициализация приложения
export function initApp() {
  // Создаем элементы для авторизации
  const loginForm = createLoginForm();
  const registerForm = createRegisterForm();

  const container = document.querySelector(".container");
  container.prepend(loginForm, registerForm);

  // Инициализация кнопки регистрации
  const registrBtn = registrButton();

  // Проверка авторизации при загрузке
  const user = getUserFromLocalStorage();
  if (user) {
    handleSuccessfulAuth();
  } else {
    showLoadingMessage();
  }

  // Обработчики событий
  registrBtn.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    registrBtn.parentElement.style.display = "none";
    commentsList.style.display = "none";
  });

  document
    .querySelector(".register-toggle-button")
    .addEventListener("click", () => {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      commentsList.style.display = "none";
    });

  document
    .querySelector(".back-to-login-button")
    .addEventListener("click", () => {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      //commentsList.style.display = "none";
    });

  document
    .querySelector(".login-button")
    .addEventListener("click", handleLogin);
  document
    .querySelector(".submit-register-button")
    .addEventListener("click", handleRegister);

  // Загрузка комментариев
  loadComments();
}

// Вспомогательные функции для создания форм
function createLoginForm() {
  const form = document.createElement("div");
  form.className = "login-form";
  form.style.display = "none";
  form.innerHTML = `
    <h2>Форма входа</h2>
    <input type="text" class="login-input" placeholder="Логин" value="admin">
    <input type="password" class="password-input" placeholder="Пароль" value="admin">
    <button class="login-button">Войти</button>
    <button class="register-toggle-button">Регистрация</button>
    <div class="auth-error"></div>
  `;
  return form;
}

function createRegisterForm() {
  const form = document.createElement("div");
  form.className = "register-form";
  form.style.display = "none";
  form.innerHTML = `
    <h2>Форма регистрации</h2>
    <input type="text" class="register-login-input" placeholder="Логин">
    <input type="text" class="register-name-input" placeholder="Имя">
    <input type="password" class="register-password-input" placeholder="Пароль">
    <button class="submit-register-button">Зарегистрироваться</button>
    <button class="back-to-login-button">Назад</button>
    <div class="register-error"></div>
  `;
  return form;
}

// Функции для работы с UI
function showLoadingMessage() {
  updateTasks([
    {
      author: { name: "" },
      text: "Пожалуйста подождите, идет загрузка...",
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      isPlainText: true,
    },
  ]);
  renderComments();
}

function handleSuccessfulAuth() {
  document.querySelector(".login-form").style.display = "none";
  document.querySelector(".register-form").style.display = "none";
  document.querySelector(".registr-container").style.display = "none";
  //--------------------------------
  commentsList.style.display = "block";
  commentsList.style.display = "flex"; // или "grid"
  commentsList.style.flexDirection = "column"; // если нужна вертикальная компоновка
  commentsList.style.gap = "24px"; // отступ между элементами
  exetButton();
  loadComments();
}

async function handleLogin() {
  const login = document.querySelector(".login-input").value;
  const password = document.querySelector(".password-input").value;
  const errorElement = document.querySelector(".auth-error");

  if (!login.trim() || !password.trim()) {
    alert("Логин или пароль не могут быть пустыми!");
    return;
  }

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

  if (!login.trim() || !password.trim()) {
    alert("Логин или пароль не могут быть пустыми!");
    return;
  }

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
