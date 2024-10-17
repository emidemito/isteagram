const videoElement = document.createElement('video'); // Creamos el elemento de video
const canvasElement = document.createElement('canvas'); // Creamos el elemento canvas
const imgPreview = document.getElementById('img-preview'); // Imagen previa
const titleInput = document.getElementById('title-input'); // Título de la imagen
const publishButton = document.getElementById('publish-button'); // Botón de publicar
const cancelButton = document.getElementById('cancel-button'); // Botón de cancelar
let stream;

// Función para iniciar la cámara y mostrar la vista previa en video
const startCamera = async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Acceder a la cámara
        videoElement.srcObject = stream; // Asignar el stream de video al elemento de video
        videoElement.play(); // Reproducir el video
        document.body.appendChild(videoElement); // Agregar el video al cuerpo del documento (puedes estilizarlo con CSS)
    } catch (error) {
        console.error("Error accediendo a la cámara:", error);
    }
};

// Capturar la imagen cuando el usuario quiera tomar la foto
const captureImage = () => {
    canvasElement.width = videoElement.videoWidth; // Establecer el ancho del canvas al del video
    canvasElement.height = videoElement.videoHeight; // Establecer el alto del canvas al del video
    const ctx = canvasElement.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height); // Dibujar la imagen del video en el canvas

    const base64Image = canvasElement.toDataURL('image/webp'); // Convertir a base64 en formato webp
    imgPreview.src = base64Image; // Mostrar la imagen capturada en el preview
    stopCamera(); // Detener la cámara una vez capturada la foto
};

// Publicar la imagen
publishButton.addEventListener('click', () => {
    const title = titleInput.value;
    const image = imgPreview.src;

    fetch('https://your-api-url.mockapi.io/photos', { // Cambia la URL según tu endpoint de MockAPI
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
    stopCamera(); // Detener la cámara al cancelar
    window.location.href = 'index.html'; // Volver a la página principal
});

// Detener la cámara
const stopCamera = () => {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop()); // Detener todos los tracks de video
    }
};

// Iniciar la cámara al cargar la página
startCamera();
