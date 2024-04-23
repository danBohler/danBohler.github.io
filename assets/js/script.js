document.addEventListener("DOMContentLoaded", function () {
    var listContainer = document.querySelector(".list-container");
    var numberOfSections = 3; // Número de tramos
    var currentSection = 0; // Inicialmente en el primer tramo

    // Evento de desplazamiento
    listContainer.addEventListener("scroll", function () {
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
            // Cambia el fondo gradiente en función de la sección
            changeBackgroundGradient(newSection);
            // Actualiza la sección actual
            currentSection = newSection;
        }
    });

    // Función para mostrar la imagen correspondiente a la sección actual
    function showImage(section) {
        // Oculta todas las imágenes
        var images = document.querySelectorAll(".background-section img");
        images.forEach(function (image) {
            image.style.opacity = 0;
        });
        // Muestra la imagen correspondiente a la sección actual
        images[section].style.opacity = 1;
    }

    // Función para cambiar el fondo gradiente en función de la sección
    function changeBackgroundGradient(section) {
        var backgroundContainer = document.querySelector(".image-container");
        backgroundContainer.classList.remove("morning", "afternoon", "night");
        switch (section) {
            case 0:
                backgroundContainer.classList.add("morning");
                break;
            case 1:
                backgroundContainer.classList.add("afternoon");
                break;
            case 2:
                backgroundContainer.classList.add("night");
                break;
            default:
                backgroundContainer.classList.add("morning");
                break;
        }
    }
});

document.getElementById('nextImage').addEventListener('click', function () {
    changeImage(1); // Avanza a la siguiente imagen
});

document.getElementById('prevImage').addEventListener('click', function () {
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


