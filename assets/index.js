async function uploadToImgur(imageFile) {
    const clientId = '0663b3818915f9e'; // Twój Client ID
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                Authorization: `Client-ID ${clientId}`,
            },
            body: formData,
        });

        const result = await response.json();
        if (result.success) {
            console.log('Image uploaded:', result.data.link);
            return result.data.link; // Zwraca link do przesłanego obrazu
        } else {
            console.error('Upload failed:', result);
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}

const imageUploadInput = document.querySelector('#imageUpload');
const previewModal = document.querySelector('.image-preview-modal');
const previewImage = document.querySelector('.preview-image');
const inputImageLink = document.querySelector('#image');
const fileUploadInput = document.querySelector('#fileUpload');

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

// Obsługa przesyłania zdjęć z plików
fileUploadInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Wyświetl podgląd obrazu
            previewImage.src = e.target.result;
            previewModal.style.display = 'flex';
        };

        reader.onerror = function () {
            alert('Nie udało się wczytać pliku. Spróbuj ponownie.');
        };

        reader.readAsDataURL(file); // Konwertuj plik na Data URL
    }
});

document.querySelector('.close-preview').addEventListener('click', () => {
    previewModal.style.display = 'none';
});

previewModal.addEventListener('click', (e) => {
    if (e.target === previewModal) {
        previewModal.style.display = 'none';
    }
});

// Funkcja generowania danych
document.querySelector('.generate-btn').addEventListener('click', () => {
    document.querySelectorAll('.input_holder').forEach((element) => {
        const input = element.querySelector('.input');
        if (input) {
            input.value = 'Przykładowe dane'; // Możesz zmienić na losowe dane
        }
    });
});