const videoElement = document.getElementById('video');
const canvasElement = document.createElement('canvas');
const imgPreview = document.getElementById('img-preview');
const captureButton = document.getElementById('capture-button');
const cancelButton = document.getElementById('cancel-button');
const publishButton = document.getElementById('publish-button');
const titleInput = document.getElementById('image-title');
let stream;


const startCamera = async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        videoElement.play();
    } catch (error) {
        console.error("Error accediendo a la cámara:", error);
    }
};


captureButton.addEventListener('click', () => {
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    const ctx = canvasElement.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    const base64Image = canvasElement.toDataURL('image/webp');
    imgPreview.src = base64Image; 
    imgPreview.style.display = 'block'; 
    titleInput.style.display = 'block'; 
    publishButton.style.display = 'block';
    stopCamera(); 
});


cancelButton.addEventListener('click', () => {
    stopCamera();
    window.location.href = 'index.html';
});


publishButton.addEventListener('click', async () => {

    const imageData = {
        id: Date.now().toString(), 
        imagen: imgPreview.src, 
        fecha: new Date().toISOString(), 
        titulo: titleInput.value || "Imagen capturada" 
    };

    try {
        const response = await fetch('https://6710556da85f4164ef2da5af.mockapi.io/photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(imageData), 
        });

        if (response.ok) {
            alert('Imagen publicada exitosamente.');
            window.location.href = 'index.html'; 
        } else {
            alert('Error al publicar la imagen: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error al conectar con MockAPI:', error);
        alert('Hubo un problema al intentar publicar la imagen.');
    }
});


const stopCamera = () => {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
};


startCamera();
