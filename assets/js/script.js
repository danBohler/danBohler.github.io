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
        currentIndex = (currentIndex + 1) % uls.length;
        changeBackgroundGradient(currentIndex);
        changeBackgroundImage(currentIndex);
        changeContent(currentIndex);
    });

    // Función para cambiar el fondo gradiente y la imagen correspondiente a la sección
    const changeBackgroundGradient = (section) => {
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
    const changeBackgroundImage = (section) => {
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
    const changeContent = (section) => {
        $(".ul_container").css("justify-content" , "space-evenly");
        img.src = '/assets/buttons/down-scroll-button-rest.svg';
        removeNightStyles();
        switch (section) {
            case 0:
                $("#scrollContainer").animate({
                    scrollTop: $("#first_ul").offset().top
                }, 'slow');
                break;
            case 1:
                $("#scrollContainer").animate({
                    scrollTop: $("#second_ul").offset().top
                }, 'slow');
                break;
            case 2:
                $("#scrollContainer").animate({
                    scrollTop: $("#scrollContainer").scrollTop() + $("#third_ul").offset().top
                }, 'slow');
                break;
            case 3:
                addNightStyles();
                $(".ul_container").css("justify-content" , "space-between");
                img.src = '/assets/buttons/up-scroll-button-rest.svg';
                $("#scrollContainer").animate({
                    scrollTop: $("#scrollContainer").scrollTop() + $("#fourth_ul").offset().top
                }, 'slow');
                break;
        }
    }

    const addNightStyles = () => {
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

    const removeNightStyles = () => {
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
    const startPress = () => {
        if (currentIndex !== 3) {
            img.src = '/assets/buttons/down-scroll-button-press.svg';
        } else {
            img.src = '/assets/buttons/up-scroll-button-press.svg';
        }
    }

    // Función para restaurar la imagen cuando se levanta el botón
    const endPress = () => {
        img.src = '/assets/buttons/down-scroll-button-rest.svg';
    }

    // Agregar event listeners para eventos de ratón
    floatButton.addEventListener('mousedown', startPress);
    floatButton.addEventListener('mouseup', endPress);

    // Agregar event listeners para eventos de tacto
    floatButton.addEventListener('touchstart', startPress);
    floatButton.addEventListener('touchend', endPress);
});