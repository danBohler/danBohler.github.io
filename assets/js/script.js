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
    var myScreenOrientation = window.screen.orientation;
    myScreenOrientation.lock("portrait");

    const floatButton = document.getElementById('float-button');
    const uls = document.querySelectorAll('#scrollContainer ul'); // Selecciona todos los ul dentro del contenedor
    let currentIndex = 0; // Empieza por mostrar el primer ul

    floatButton.addEventListener('click', function () {
        uls[currentIndex].style.opacity = 0; // Oculta el ul actual
        currentIndex = (currentIndex + 1) % uls.length; // Incrementa el índice o vuelve al inicio
        uls[currentIndex].style.opacity = 1; // Muestra el siguiente ul
        changeBackgroundGradient(currentIndex);
    });

    // Simular un clic en el botón floatButton
    function triggerButtonClick() {
        floatButton.click();
    }

    var listContainer = document.querySelector(".list-container");
    // Evento de desplazamiento
    listContainer.addEventListener("scroll", function () {
        // triggerButtonClick();
    });

    // Función para mostrar la imagen correspondiente a la sección actual
    function showImage(section) {
        // Oculta todas las imágenes
        var images = document.querySelectorAll(".background-section img.bgimage");
        images.forEach(function (image) {
            image.style.opacity = 0;
        });
        // Muestra la imagen correspondiente a la sección actual
        images[section].style.opacity = 1;
    }

    // Función para cambiar el fondo gradiente en función de la sección
    function changeBackgroundGradient(section) {
        var backgroundContainer = document.querySelector(".image-container");
        // Asegurarse de quitar la clase 'active' para resetear la opacidad antes de cambiar de sección
        backgroundContainer.classList.remove("active");
    
        // Retrasar la adición de la clase para la nueva sección para permitir que se "limpie" el estado anterior
        setTimeout(() => {
            backgroundContainer.classList.remove("morning", "afternoon", "evening", "night");
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
            // Ahora añadir la clase 'active' para comenzar la transición
            backgroundContainer.classList.add("active");
            showImage(section);
        }, 200);
    }
});