// script.js

// Массив ID всех элементов, которые мы хотим сделать редактируемыми и сохраняемыми
const editableElementIds = [
    'greeting', 'name', 'greeting-position',
    'languages-header', 'language-item1', 'language-item2', 'language-item3',
    'experience-header', 'most-recent-job-date-id', 'most-recent-job-tag-id',
    'most-recent-job-title', 'most-recent-job-extra',
    'most-recent-job-list-item1', 'most-recent-job-list-item2',
    'job-date1', 'job-title1', 'job-extra1',
    'job-list-item1', 'job-list-item2',
    'job-date2', 'job-title2', 'job-extra2',
    'job-list-item3', 'job-list-item4', 'job-list-item5', 'job-list-item6',
    'tools', 'design-icon', 'ai-icon', 'no-code-icon', 'education-header',
    'education-year1', 'education-year2', 'education-year3',
    'education-title1', 'education-title2', 'education-title3',
    'education-tags1', 'education-tags2', 'education-tags3',
    'education-place1', 'education-place2', 'education-place3',
    'interests-id', 'interest1', 'interest2', 'interest3',
    'interest4', 'interest5', 'interest6',
    'interest7', 'interest8', 'interest9', 'interest10',
    'contact-text-id', 'contact-email-id'
];

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clearStorageParam = urlParams.get('clear_storage'); // Ищем параметр ?clear_storage=true

    if (clearStorageParam === 'true') {
        localStorage.clear();
        console.log('localStorage cleared via URL parameter.');
        // Опционально: удалить параметр из URL, чтобы при следующем заходе не чистилось
        // window.history.replaceState({}, document.title, window.location.pathname);
    }
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

document.addEventListener('DOMContentLoaded', () => {
    // ... логика загрузки элементов ...

    // Добавляем обработчики для сохранения
    editableElementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('blur', () => {
                localStorage.setItem(id, element.textContent);

                // --- Добавляем анимацию после сохранения ---
                element.classList.add('saved-highlight');
                // Удаляем класс через некоторое время, чтобы анимация могла повториться
                setTimeout(() => {
                    element.classList.remove('saved-highlight');
                }, 800); // Должно соответствовать длительности анимации в CSS
                // --- Конец добавления анимации ---

                console.log(`Saved "${element.textContent}" for ID: ${id}`);
            });

            element.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    element.blur();
                }
            });
        }
    });

    const languageTextElements = document.querySelectorAll('.language-text');
    languageTextElements.forEach((element, index) => {
        const storageKey = `language-item-${index}`;
        // ... логика загрузки ...

        element.addEventListener('blur', () => {
            localStorage.setItem(storageKey, element.textContent);

            // --- Добавляем анимацию после сохранения ---
            element.classList.add('saved-highlight');
            setTimeout(() => {
                element.classList.remove('saved-highlight');
            }, 800);
            // --- Конец добавления анимации ---

            console.log(`Saved "${element.textContent}" for key: ${storageKey}`);
        });

        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                element.blur();
            }
        });
    });
});

// =========================================================
// НОВЫЙ КОД ДЛЯ КНОПКИ "СКАЧАТЬ PDF"
// =========================================================
const downloadPdfButton = document.getElementById('download-button');
// Изменяем эту строку:
const resumeContentElement = document.getElementById("resume-main-content"); // Используем непосредственно <body>
if (downloadPdfButton && resumeContentElement) {
        downloadPdfButton.addEventListener('click', () => {
            // 1. Сохраняем текущие стили margin у <main>
            // Важно: читаем свойство из style.css через getComputedStyle,
            // т.к. styles.margin может быть пустым, если margin задан в CSS-файле, а не инлайн.
            const originalMargin = window.getComputedStyle(resumeContentElement).margin;
            const originalPadding = window.getComputedStyle(resumeContentElement).padding;
            const originalWidth = window.getComputedStyle(resumeContentElement).width; // Сохраняем текущую ширину
            const originalMaxWidth = window.getComputedStyle(resumeContentElement).maxWidth; // Сохраняем текущий max-width

            // 2. Временно изменяем стили <main> для генерации PDF
            resumeContentElement.style.margin = '0';
            resumeContentElement.style.padding = '2%'; // Также обнуляем padding, если он создает отступы
            resumeContentElement.style.width = '100%'; // Растягиваем на 100% ширины
            resumeContentElement.style.maxWidth = '100%'; // Убираем ограничение max-width


            // Настройки для генерации PDF
            const options = {
                filename:     'Мое_Резюме.pdf', // Имя файла для скачивания
                image:        { type: 'jpeg', quality: 0.98 }, // Качество изображений
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' } // Настройки PDF-документа
                // Здесь вы можете добавить margin для самого PDF-документа,
                // например: margin: 10,
            };

            // Запускаем процесс генерации и сохранения PDF
            // Используем .then() для восстановления стилей после завершения генерации
            html2pdf().set(options).from(resumeContentElement).save().then(() => {
                // 3. Восстанавливаем оригинальные стили <main> после завершения генерации PDF
                resumeContentElement.style.margin = originalMargin;
                resumeContentElement.style.padding = originalPadding;
                resumeContentElement.style.width = originalWidth;
                resumeContentElement.style.maxWidth = originalMaxWidth;
            });
        });
    } else {
        console.error("Элемент с ID 'downloadPdfButton' или 'resume-main-content' не найден. Убедитесь, что они есть в HTML и JavaScript.");
    }