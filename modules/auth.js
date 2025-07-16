// Функции для работы с авторизацией и localStorage

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

// Функция для авторизации пользователя
export async function loginUser({ login, password }) {
  const response = await fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Неверный логин или пароль");
  }

  const data = await response.json();
  return data.user;
}

// Функция для регистрации нового пользователя
export async function registerUser({ login, name, password }) {
  const response = await fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
      login: login,
      name: name,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Ошибка регистрации");
  }

  const data = await response.json();
  return data.user;
}
