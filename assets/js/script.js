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
        afternoon.src = '/assets/images/desktop_landscape_morning.png';
        evening.src = '/assets/images/desktop_landscape_evening.png';
        night.src = '/assets/images/desktop_landscape_night.png';
        console.log("Desktop")
    } else if (width >= 621 && width <= 999 && height > width) {
        // Tablet Portrait
        morning.src = '/assets/images/tablet_landscape_morning.png';
        afternoon.src = '/assets/images/tablet_landscape_morning.png';
        evening.src = '/assets/images/tablet_landscape_evening.png';
        night.src = '/assets/images/tablet_landscape_night.png';
        console.log("Tablet Portrait")
    } else if (width >= 621 && width <= 999) {
        // Tablet Landscape
        morning.src = '/assets/images/desktop_landscape_morning.png';
        afternoon.src = '/assets/images/desktop_landscape_morning.png';
        evening.src = '/assets/images/desktop_landscape_evening.png';
        night.src = '/assets/images/desktop_landscape_night.png';
        console.log("Tablet Landscape")
    } else if (width < 620) {
        // Mobile
        morning.src = '/assets/images/mobile_landscape_morning.png';
        afternoon.src = '/assets/images/mobile_landscape_morning.png';
        evening.src = '/assets/images/mobile_landscape_evening.png';
        night.src = '/assets/images/mobile_landscape_night.png';
        console.log("Mobile")
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const landscape_images = [
        "/assets/images/mobile_landscape_morning.png",
        "/assets/images/mobile_landscape_morning.png",
        "/assets/images/mobile_landscape_evening.png",
        "/assets/images/mobile_landscape_night.png"
    ];
    const sky_images = [
        "/assets/images/mobile_sky_morning.png",
        "/assets/images/mobile_sky_morning.png",
        "/assets/images/mobile_sky_evening.png",
        "/assets/images/mobile_sky_night.png"
    ];

    const floatButton = document.getElementById('float-button');
    const uls = document.querySelectorAll('#scrollContainer ul');
    let currentIndex = 0;

    floatButton.addEventListener('click', function () {
        uls[currentIndex].style.opacity = 0;
        currentIndex = (currentIndex + 1) % uls.length;
        uls[currentIndex].style.opacity = 1;
        changeBackgroundGradient(currentIndex);
        changeBackgroundImage(currentIndex);
        changeContent(currentIndex);
    });

    // Función para cambiar el fondo gradiente y la imagen correspondiente a la sección
    function changeBackgroundGradient(section) {
        var backgroundContainer = document.querySelector(".background-section");
        backgroundContainer.classList.remove("active");

        setTimeout(() => {
            backgroundContainer.classList.remove("morning", "evening", "night", "text-night");
            switch (section) {
                case 0:
                    backgroundContainer.classList.add("morning");
                    break;
                case 1:
                    backgroundContainer.classList.add("morning");
                    break;
                case 2:
                    backgroundContainer.classList.add("evening");
                    break;
                case 3:
                    backgroundContainer.classList.add("night");
                    backgroundContainer.classList.add("text-night");
                    break;
                default:
                    backgroundContainer.classList.add("morning");
                    break;
            }
            backgroundContainer.classList.add("active");
        }, 200);
    }

    // Función para mostrar la imagen correspondiente a la sección actual
    function changeBackgroundImage(section) {
        const landscapeImage = document.getElementById("landscape_image");
        const skyImage = document.getElementById("sky_image");
        // Oculta la imagen actual
        landscapeImage.style.opacity = 0;
        skyImage.style.opacity = 0;
        // Cambia la imagen al siguiente en el array
        landscapeImage.src = landscape_images[section];
        skyImage.src = sky_images[section];
        // Muestra la nueva imagen con una transición
        landscapeImage.style.opacity = 1;
        skyImage.style.opacity = 1;
    }

    // Función para mostrar la imagen correspondiente a la sección actual
    function changeContent(section) {
        const listContainer = document.getElementById("list-container");
        // Calcular la altura de cada sección dividiendo la altura del contenedor entre 4
        const sectionHeight = listContainer.scrollHeight / 4;
        // Función para desplazar el scroll a una posición específica de acuerdo a la sección
        function scrollToSection(sectionIndex) {
            // Calcular la posición de desplazamiento multiplicando la altura de la sección por el índice
            const scrollTo = sectionHeight * sectionIndex;
            
            // Desplazar el scroll hasta la posición calculada
            listContainer.scrollTop = scrollTo;
        }
        // Ejemplo de cómo usar la función para desplazar al usuario a la segunda sección
        
        $("#scrollContainer").animate({
            scrollTop: sectionHeight * section
        }, 'slow');
    }
});