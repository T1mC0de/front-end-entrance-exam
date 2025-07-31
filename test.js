import { html2pdf } from "html2pdf.js";

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
    const clearStorageParam = urlParams.get('clear_storage');

    if (clearStorageParam === 'true') {
        localStorage.clear();
        console.log('localStorage cleared via URL parameter.');
    }

    editableElementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            const savedText = localStorage.getItem(id);
            if (savedText) {
                element.textContent = savedText;
            }
        }
    });

    editableElementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('blur', () => {
                localStorage.setItem(id, element.textContent);
                element.classList.add('saved-highlight');
                setTimeout(() => {
                    element.classList.remove('saved-highlight');
                }, 800);
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
        
        element.addEventListener('blur', () => {
            localStorage.setItem(storageKey, element.textContent);
            element.classList.add('saved-highlight');
            setTimeout(() => {
                element.classList.remove('saved-highlight');
            }, 800);
            console.log(`Saved "${element.textContent}" for key: ${storageKey}`);
        });

        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                element.blur();
            }
        });
    });

    const downloadPdfButton = document.getElementById('download-button');
    const resumeContentElement = document.getElementById("resume-main-content");

    if (downloadPdfButton && resumeContentElement) {
        downloadPdfButton.addEventListener('click', () => {
            const originalMargin = window.getComputedStyle(resumeContentElement).margin;
            const originalPadding = window.getComputedStyle(resumeContentElement).padding;
            const originalWidth = window.getComputedStyle(resumeContentElement).width;
            const originalMaxWidth = window.getComputedStyle(resumeContentElement).maxWidth;

            resumeContentElement.style.margin = '0';
            resumeContentElement.style.padding = '2%';
            resumeContentElement.style.width = '100%';
            resumeContentElement.style.maxWidth = '100%';

            const options = {
                filename: 'Мое_Резюме.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                // Добавьте поля здесь. Например, 10мм со всех сторон.
                // Это даст больше пространства для вашего контента внутри печатной области.
                // [верх, право, низ, лево]
                // Или просто одно значение: margin: 10,
                margins: {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                }
            };

            html2pdf().set(options).from(resumeContentElement).save().then(() => {
                resumeContentElement.style.margin = originalMargin;
                resumeContentElement.style.padding = originalPadding;
                resumeContentElement.style.width = originalWidth;
                resumeContentElement.style.maxWidth = originalMaxWidth;
            });
        });
    } else {
        console.error("Элемент с ID 'download-button' или 'resume-main-content' не найден. Убедитесь, что они есть в HTML и JavaScript.");
    }
});