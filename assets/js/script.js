document.addEventListener("DOMContentLoaded", function() {
    var listContainer = document.querySelector(".list-container");
    var numberOfSections = 4; // Número de tramos
    var currentSection = 0; // Inicialmente en el primer tramo

    // Evento de desplazamiento
    listContainer.addEventListener("scroll", function() {
        // Obtiene la posición de desplazamiento vertical actual
        var scrollTop = listContainer.scrollTop;
        // Muestra la posición de desplazamiento por consola
        console.log("Posición de desplazamiento:", scrollTop);
        // Calcula el tamaño de cada tramo
        var sectionSize = listContainer.scrollHeight / numberOfSections;
        // Determina la sección actual en base a la posición de desplazamiento
        var newSection = Math.floor(scrollTop / sectionSize);
        // Si la sección actual es diferente de la sección anterior, cambia la imagen
        if (newSection !== currentSection) {
            // Muestra la imagen correspondiente a la nueva sección
            showImage(newSection);
            // Actualiza la sección actual
            currentSection = newSection;
        }
    });

    // Función para mostrar la imagen correspondiente a la sección actual
    function showImage(section) {
        // Oculta todas las imágenes
        var images = document.querySelectorAll(".background-section img");
        images.forEach(function(image) {
            image.style.opacity = 0;
        });
        // Muestra la imagen correspondiente a la sección actual
        images[section].style.opacity = 1;
    }
});

document.getElementById('nextImage').addEventListener('click', function() {
    changeImage(1); // Avanza a la siguiente imagen
});

document.getElementById('prevImage').addEventListener('click', function() {
    changeImage(-1); // Regresa a la imagen anterior
});

function changeImage(direction) {
    const images = document.querySelectorAll('.background-section img');
    let visibleIndex = 0; // Encuentra la imagen visible
    images.forEach((img, index) => {
        if (img.style.opacity === '1') {
            visibleIndex = index;
            img.style.opacity = 0; // Oculta la imagen actual
        }
    });

    // Calcula el índice de la siguiente imagen basándose en la dirección
    const nextIndex = (visibleIndex + direction + images.length) % images.length;
    images[nextIndex].style.opacity = 1; // Muestra la siguiente imagen
}


window.addEventListener('wheel', function(event) {
    event.preventDefault(); // Evita el desplazamiento predeterminado

    const delta = Math.sign(event.deltaY); // Obtiene la dirección del desplazamiento
    // Ajusta la velocidad del desplazamiento
    const scrollSpeed = 1000; // Cuanto mayor sea el valor, más lento será el desplazamiento
    const scrollAmount = delta * scrollSpeed;
    console.log("valor del desplazamiento:" , scrollAmount)

    window.scrollBy(0, scrollAmount); // Realiza el desplazamiento
});

let startY; // Variable para almacenar la posición inicial del toque

window.addEventListener('touchstart', function(event) {
    startY = event.touches[0].clientY; // Guarda la posición inicial del toque
});

window.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Evita el desplazamiento predeterminado

    const deltaY = event.touches[0].clientY - startY; // Calcula la distancia del desplazamiento

    // Ajusta la velocidad del desplazamiento
    const scrollSpeed = 1; // Cuanto mayor sea el valor, más lento será el desplazamiento
    const scrollAmount = deltaY * scrollSpeed;

    window.scrollBy(0, scrollAmount); // Realiza el desplazamiento
});

