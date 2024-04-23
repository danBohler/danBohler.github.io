function updateImageSources() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var morning = document.getElementById('landscape_morning');
    var afternoon = document.getElementById('landscape_afternoon');
    var evening = document.getElementById('landscape_evening');
    var night = document.getElementById('landscape_night');

    if (width >= 1000) {
        // Desktop
        morning.src = '/assets/images/desktop_landscape_morning.png';
        afternoon.src = '/assets/images/desktop_landscape_afternoon.png';
        evening.src = '/assets/images/desktop_landscape_evening.png';
        night.src = '/assets/images/desktop_landscape_night.png';
        console.log("Desktop")
    } else if (width >= 621 && width <= 999 && height > width) {
        // Tablet Portrait
        morning.src = '/assets/images/tablet_landscape_morning.png';
        afternoon.src = '/assets/images/tablet_landscape_afternoon.png';
        evening.src = '/assets/images/tablet_landscape_evening.png';
        night.src = '/assets/images/tablet_landscape_night.png';
        console.log("Tablet Portrait")
    } else if (width >= 621 && width <= 999) {
        // Tablet Landscape
        morning.src = '/assets/images/desktop_landscape_morning.png';
        afternoon.src = '/assets/images/desktop_landscape_afternoon.png';
        evening.src = '/assets/images/desktop_landscape_evening.png';
        night.src = '/assets/images/desktop_landscape_night.png';
        console.log("Tablet Landscape")
    } else if (width < 620) {
        // Mobile
        morning.src = '/assets/images/mobile_landscape_morning.png';
        afternoon.src = '/assets/images/mobile_landscape_afternoon.png';
        evening.src = '/assets/images/mobile_landscape_evening.png';
        night.src = '/assets/images/mobile_landscape_night.png';
        console.log("Mobile")
    }
}


document.addEventListener("DOMContentLoaded", function () {
    var listContainer = document.querySelector(".list-container");
    var numberOfSections = 4; // Número de tramos
    var currentSection = 0; // Inicialmente en el primer tramo

    // Evento de desplazamiento
    listContainer.addEventListener("scroll", function () {
        // Obtiene la posición de desplazamiento vertical actual
        var scrollTop = listContainer.scrollTop;
        // Muestra la posición de desplazamiento por consola
        // console.log("Posición de desplazamiento:", scrollTop);
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
                backgroundContainer.classList.add("evening");
                break;
            case 3:
                backgroundContainer.classList.add("night");
                break;
            default:
                backgroundContainer.classList.add("morning");
                break;
        }
    }
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
