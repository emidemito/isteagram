const imgPreview = document.getElementById('img-preview');
const titleInput = document.getElementById('title-input');
const publishButton = document.getElementById('publish-button');
const cancelButton = document.getElementById('cancel-button');

// Capturar la imagen desde la cámara o galería
const captureImage = async () => {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.capture = 'camera'; // Esto permite abrir la cámara en dispositivos móviles

    inputFile.onchange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const blob = new Blob([file], { type: file.type });

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const base64Image = canvas.toDataURL('image/webp'); // Convertir a base64 en formato webp

                // Mostrar la imagen en el preview
                imgPreview.src = base64Image;
            };

            img.src = URL.createObjectURL(blob);
        }
    };

    inputFile.click();
};

// Publicar la imagen en MockAPI
publishButton.addEventListener('click', () => {
    const title = titleInput.value;
    const image = imgPreview.src;

    if (!title || !image || image === 'icons/No Image.png') {
        alert('Por favor, añade un título y captura una imagen antes de publicar.');
        return;
    }

    fetch('https://6710556da85f4164ef2da5af.mockapi.io/photos', { // Cambia esta URL con tu endpoint de MockAPI
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, image }),
    })
    .then(response => response.json())
    .then(() => {
        alert('Foto publicada con éxito!');
        window.location.href = 'index.html'; // Redirigir a la página principal
    })
    .catch((error) => {
        console.error('Error al publicar la foto:', error);
        alert('Hubo un error al publicar la foto.');
    });
});

// Cancelar la operación
cancelButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Volver a la página principal
});

// Iniciar la captura de imagen al cargar la página
captureImage();
