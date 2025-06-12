export function sanitizeInput(input) {
  // Укажите нежелательные символы в регулярном выражении
  const unwantedCharacters = /[!@#$%^&*(),.?":{}|<]/g;

  // Заменяем нежелательные символы на пустую строку
  const sanitizedText = input.replace(unwantedCharacters, "");

  return sanitizedText;
}
