const photoReel = document.getElementById('photo-reel');
const captureButton = document.getElementById('capture-button');

function createModelCard() {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>No hay fotos publicadas aún.</h3>
        <img src="icons/No Image.png" alt="Imagen modelo">
        <p>Agrega tu primera fotografía!</p>
    `;
    return card;
}

// Aquí puedes cargar las fotos desde MockAPI.io al iniciar
function loadPhotos() {
    fetch('https://6710556da85f4164ef2da5af.mockapi.io/:endpoint') 
        .then(response => response.json())
        .then(photos => {
            if (photos.length === 0) {
                photoReel.appendChild(createModelCard());
            } else {
                photos.forEach(photo => {
                    const card = createPhotoCard(photo);
                    photoReel.appendChild(card);
                });
            }
        });
}

function createPhotoCard(photo) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${photo.title}</h3>
        <img src="${photo.image}" alt="${photo.title}">
        <p>${new Date(photo.createdAt).toLocaleString()}</p>
    `;
    return card;
}

captureButton.addEventListener('click', () => {
    window.location.href = 'camara.html';
});

// Cargar las fotos al inicio
loadPhotos();
