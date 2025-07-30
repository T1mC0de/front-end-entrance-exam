// script.js

// Массив ID всех элементов, которые мы хотим сделать редактируемыми и сохраняемыми
const editableElementIds = [
    'greeting', 'name', 'greeting-position'
];

document.addEventListener('DOMContentLoaded', () => {
  // === Загрузка сохраненных данных при загрузке страницы ===
  editableElementIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      const savedText = localStorage.getItem(id); // Используем ID элемента как ключ в localStorage
      if (savedText) {
        element.textContent = savedText;
      }
    }
  });

  // === Добавление обработчиков событий для сохранения изменений ===
  editableElementIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      // Сохраняем изменения, когда элемент теряет фокус (пользователь кликнул в другое место)
      element.addEventListener('blur', () => {
        localStorage.setItem(id, element.textContent); // Сохраняем по ID
        console.log(`Saved "${element.textContent}" for ID: ${id}`); // Для отладки
      });

      // Опционально: Сохраняем по нажатию Enter и предотвращаем перенос строки
      element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Предотвращаем создание новой строки
          element.blur();         // Вызываем потерю фокуса, чтобы сохранить изменения
        }
      });
    }
  });
});