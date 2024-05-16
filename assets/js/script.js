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
    const img = document.getElementById('button-image');

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
        // Calcular el ancho y el alto en svh
        let screenHeight = Math.floor(window.innerHeight);
        let screenWidth = Math.floor(window.innerWidth);
        if (screenHeight > 1500) {
            screenHeight = screenHeight / 3
            screenWidth = screenWidth / 3
        }

        // Mostrar los resultados en la consola
        // $("#height").html("H:" + Math.floor(screenHeight));
        // $("#width").html("W:" + Math.floor(screenWidth));

        img.src = '/assets/buttons/down-scroll-button-rest.svg';
        removeNightStyles();
        const listContainer = document.getElementById("list-container");
        // Calcular la altura de cada sección dividiendo la altura del contenedor entre 4
        const sectionHeight = listContainer.scrollHeight / 4;
        // Ejemplo de cómo usar la función para desplazar al usuario a la segunda sección
        const scroll = sectionHeight * section;
        const space = screenHeight * 0.05;
        switch (section) {
            case 0:
                $("#scrollContainer").animate({
                    scrollTop: scroll
                }, 'slow');
                break;
            case 1:
                $("#scrollContainer").animate({
                    scrollTop: scroll - space
                }, 'slow');
                break;
            case 2:
                $("#scrollContainer").animate({
                    scrollTop: scroll - space
                }, 'slow');
                break;
            case 3:
                addNightStyles();
                img.src = '/assets/buttons/up-scroll-button-rest.svg';
                $("#scrollContainer").animate({
                    scrollTop: scroll - (space * 2.5)
                }, 'slow');
                break;
        }
    }

    function addNightStyles() {
        // Seleccionar los elementos
        const h3Elements = document.querySelectorAll('li h3');
        const h1Elements = document.querySelectorAll('li h1');
        const spanElements = document.querySelectorAll('li span');
        const iconElements = document.querySelectorAll('li div img');
        h1Elements.forEach(h1 => {
            h1.classList.add('text-night');
        })
        h3Elements.forEach(h3 => {
            h3.classList.add('text-night');
        });
        spanElements.forEach(span => {
            span.classList.add('line-night');
        });
        iconElements.forEach(icon => {
            icon.classList.add('icon-night');
        });
    }

    function removeNightStyles() {
        // Seleccionar los elementos li
        const h3Elements = document.querySelectorAll('li h3');
        const h1Elements = document.querySelectorAll('li h1');
        const spanElements = document.querySelectorAll('li span');
        const iconElements = document.querySelectorAll('li div img');
        h1Elements.forEach(h1 => {
            h1.classList.remove('text-night');
        })
        h3Elements.forEach(h3 => {
            h3.classList.remove('text-night');
        });
        spanElements.forEach(span => {
            span.classList.remove('line-night');
        });
        iconElements.forEach(icon => {
            icon.classList.remove('icon-night');
        });
    }

    // Función para cambiar la imagen cuando se inicia la pulsación
    function startPress() {
        if (currentIndex !== 3) {
            img.src = '/assets/buttons/down-scroll-button-press.svg';
        } else {
            img.src = '/assets/buttons/up-scroll-button-press.svg';
        }
    }

    // Función para restaurar la imagen cuando se levanta el botón
    function endPress() {
        img.src = '/assets/buttons/down-scroll-button-rest.svg';
    }

    // Agregar event listeners para eventos de ratón
    floatButton.addEventListener('mousedown', startPress);
    floatButton.addEventListener('mouseup', endPress);

    // Agregar event listeners para eventos de tacto
    floatButton.addEventListener('touchstart', startPress);
    floatButton.addEventListener('touchend', endPress);
});