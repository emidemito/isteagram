const imagesContainer = document.getElementById('images-container');


const loadImages = async () => {
    try {
        const response = await fetch('https://6710556da85f4164ef2da5af.mockapi.io/photos'); 
        const images = await response.json();

        if (images.length > 0) {
            imagesContainer.innerHTML = ''; 
            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.imagen; 
                imgElement.alt = `Imagen ${image.id}`; 
                imagesContainer.appendChild(imgElement);
            });
        } else {
            imagesContainer.innerHTML = '<p>No hay imágenes publicadas. !Subí una foto!</p>';
        }
    } catch (error) {
        console.error('Error al cargar las imágenes:', error);
    }
};


document.addEventListener('DOMContentLoaded', loadImages);
