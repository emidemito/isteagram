const imgPreview = document.getElementById('img-preview');
const titleInput = document.getElementById('title-input');
const publishButton = document.getElementById('publish-button');
const cancelButton = document.getElementById('cancel-button');

// Capturar la imagen
const captureImage = async () => {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.capture = true; // Esto permite abrir la cámara en dispositivos móviles

    inputFile.onchange = async (event) => {
        const file = event.target.files[0];
        const blob = new Blob([file]);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const base64Image = canvas.toDataURL('image/webp');

            // Mostrar la imagen en el preview
            imgPreview.src = base64Image;
        };

        img.src = URL.createObjectURL(blob);
    };

    inputFile.click();
};

// Publicar la imagen
publishButton.addEventListener('click', () => {
    const title = titleInput.value;
    const image = imgPreview.src;

    fetch('https://6710556da85f4164ef2da5af.mockapi.io/:endpoint', { 
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
    });
});

// Cancelar la operación
cancelButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Volver a la página principal
});

// Iniciar la captura de imagen
captureImage();
