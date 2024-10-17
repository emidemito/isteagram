const imgPreview = document.getElementById('img-preview');
const titleInput = document.getElementById('title-input');
const publishButton = document.getElementById('publish-button');
const cancelButton = document.getElementById('cancel-button');

// Capturar la imagen desde la cámara del dispositivo
const captureImage = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.play();

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        videoElement.addEventListener('loadeddata', () => {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            // Tomar la imagen cuando el botón de captura se presiona
            publishButton.addEventListener('click', () => {
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                const base64Image = canvas.toDataURL('image/webp');

                // Mostrar la imagen en el preview
                imgPreview.src = base64Image;

                // Publicar la imagen
                const title = titleInput.value;
                fetch('https://6710556da85f4164ef2da5af.mockapi.io/photos', { // Cambia la URL según tu endpoint de MockAPI
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, image: base64Image }),
                })
                .then(response => response.json())
                .then(() => {
                    alert('Foto publicada con éxito!');
                    window.location.href = 'index.html'; // Redirigir a la página principal
                });

                // Detener el video stream
                stream.getTracks().forEach(track => track.stop());
            });
        });
    } catch (error) {
        console.error('Error accediendo a la cámara: ', error);
    }
};

// Cancelar la operación
cancelButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Volver a la página principal
});

// Iniciar la captura de imagen al cargar la página
captureImage();
