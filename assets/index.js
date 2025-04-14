const inputImageLink = document.querySelector('#image');
const fileUploadInput = document.querySelector('#fileUpload');
const previewModal = document.querySelector('.image-preview-modal');
const previewImage = document.querySelector('.preview-image');

// Obsługa linków z Imgur
inputImageLink.addEventListener('input', (event) => {
    const imgurUrl = event.target.value;
    const imgurRegex = /^https?:\/\/(i\.)?imgur\.com\/[a-zA-Z0-9]+(\.jpg|\.png|\.gif)?$/;

    if (imgurRegex.test(imgurUrl)) {
        previewImage.src = imgurUrl;
        previewModal.style.display = 'flex';
    } else {
        console.error('Niepoprawny URL z Imgur');
    }
});

// Obsługa przesyłania zdjęcia z plików
fileUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewModal.style.display = 'flex';
        };

        reader.onerror = function () {
            alert('Nie udało się wczytać pliku.');
        };

        reader.readAsDataURL(file);
    }
});

// Zamknięcie modalu podglądu
document.querySelector('.close-preview').addEventListener('click', () => {
    previewModal.style.display = 'none';
});

// Czyszczenie danych
document.querySelector('.clear-btn').addEventListener('click', () => {
    document.querySelectorAll('.input_holder .input').forEach((input) => {
        input.value = '';
    });
});