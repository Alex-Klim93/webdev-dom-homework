// Базовый URL API для работы с пользователями
const USER_API_URL = "https://wedev-api.sky.pro/api/user";

// Ваш существующий массив (пример)
export let Users = [];

// Функция для получения списка пользователей
export async function getUsersList() {
  try {
    const response = await fetch(USER_API_URL, {
      method: "GET",
      // Авторизация не требуется согласно документации
    });

    if (!response.ok) {
      throw new Error(
        `Ошибка при получении списка пользователей: ${response.status}`,
      );
    }

    const data = await response.json();
    Users = data.users; // Заполняем ваш массив Users данными из API
    return Users;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
}

// Пример использования:
// getUsersList().then(users => console.log(Users)); // Теперь Users содержит данные из API

// // Функция для авторизации пользователя
// export async function loginUser({ login, password }) {
//   try {
//     // 1. Авторизуем пользователя через API
//     const loginResponse = await fetch(`${USER_API_URL}/login`, {
//       method: "POST",
//       body: JSON.stringify({
//         login,
//         password,
//       }),
//     });

//     if (!loginResponse.ok) {
//       throw new Error("Неверный логин или пароль");
//     }

//     const loginData = await loginResponse.json();

//     // 2. Получаем список пользователей для проверки
//     const users = await getUsersList();
//     const userExists = users.some((user) => user.login === login);

//     if (!userExists) {
//       throw new Error("Пользователь не найден в системе");
//     }

//     return loginData.user;
//   } catch (error) {
//     console.error("Ошибка авторизации:", error);
//     throw error;
//   }
// }
