//import { exetButton } from "./exetButton.js";
// Функции для работы с авторизацией и localStorage
// Базовый URL API для работы с пользователями
const USER_API_URL = "https://wedev-api.sky.pro/api/user";
import { getUsersList } from "./listUser.js";
// Сохраняем данные пользователя в localStorage
export function saveUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

// Получаем данные пользователя из localStorage
export function getUserFromLocalStorage() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Удаляем данные пользователя из localStorage (для выхода)
export function removeUserFromLocalStorage() {
  localStorage.removeItem("user");
}

// Основная функция авторизации
export async function loginUser({ login, password }) {
  try {
    // 1. Получаем список пользователей
    const users = await getUsersList();

    // 2. Проверяем, есть ли пользователь с таким логином
    const userExists = users.some((user) => user.login === login);
    if (!userExists) {
      throw new Error("Пользователь не найден");
    }

    // 3. Отправляем запрос на авторизацию для получения токена
    const loginResponse = await fetch(`${USER_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });

    // 4. Обрабатываем ответ
    if (!loginResponse.ok) {
      throw new Error("Неверный пароль");
    }

    const { user } = await loginResponse.json();
    return user; // Возвращаем данные пользователя + токен
  } catch (error) {
    console.error("Ошибка авторизации:", error.message);
    throw error;
  }
}

// Функция для регистрации нового пользователя
export async function registerUser({ login, name, password }) {
  try {
    // 1. Отправляем запрос на регистрацию
    const response = await fetch(USER_API_URL, {
      method: "POST",
      body: JSON.stringify({
        login,
        name,
        password,
      }),
    });

    // 2. Обрабатываем ответ
    if (response.status === 400) {
      throw new Error("Пользователь с таким логином уже существует");
    }

    if (!response.ok) {
      throw new Error(`Ошибка регистрации: ${response.status}`);
    }

    // 3. Получаем данные пользователя с токеном
    const data = await response.json();

    // 4. Возвращаем данные пользователя (включая токен)
    return data.user;
  } catch (error) {
    console.error("Ошибка регистрации:", error.message);
    throw error;
  }
}

// Функция для выхода из системы (отправка пустых данных)
export async function logoutUser() {
  try {
    // Отправляем пустые логин и пароль
    const response = await fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login: "",
        password: "",
      }),
    });

    // Даже если запрос не успешен (ожидаемо), очищаем данные
    removeUserFromLocalStorage();
    // Перезагружаем страницу
    window.location.reload();
  } catch (error) {
    // В случае ошибки все равно очищаем данные и перезагружаем
    removeUserFromLocalStorage();
    window.location.reload();
  }
}
