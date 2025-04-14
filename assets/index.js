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
fileUploadInput.addEventListener('change', async (event) => {
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

// Generowanie przykładowych danych
document.querySelector('.generate-btn').addEventListener('click', () => {
    const inputs = {
        name: 'Jan',
        surname: 'Kowalski',
        pesel: '92030512345',
        birthPlace: 'Warszawa',
        nationality: 'Polska',
        address: 'ul. Przykładowa 1',
        city: 'Warszawa',
        postalCode: '00-001',
    };

    document.querySelectorAll('.input_holder .input').forEach((input) => {
        if (input.id in inputs) {
            input.value = inputs[input.id];
        }
    });
});

// Czyszczenie danych
document.querySelector('.clear-btn').addEventListener('click', () => {
    document.querySelectorAll('.input_holder .input').forEach((input) => {
        input.value = '';
    });
});