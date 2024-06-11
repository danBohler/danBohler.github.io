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
    let currentLandscapeImage = null;
    let currentSkyImage = null;

    // Preload the initial images
    const preloadImage = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
        });
    };

    let preloadedLandscapeImages = [];
    let preloadedSkyImages = [];

    Promise.all(landscape_images.map(src => preloadImage(src)))
        .then(images => {
            preloadedLandscapeImages = images;
            return Promise.all(sky_images.map(src => preloadImage(src)));
        })
        .then(images => {
            preloadedSkyImages = images;
            // After all images are preloaded, set the initial images
            setInitialImages();
        });

    const setInitialImages = () => {
        const landscapeImage = document.getElementById("landscape_image");
        const skyImage = document.getElementById("sky_image");
        landscapeImage.src = preloadedLandscapeImages[0].src;
        skyImage.src = preloadedSkyImages[0].src;
        currentLandscapeImage = landscapeImage;
        currentSkyImage = skyImage;
    };

    floatButton.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % uls.length;
        changeBackgroundGradient(currentIndex);
        changeBackgroundImage(currentIndex);
        changeContent(currentIndex);

        // Add clicked class to float button
        floatButton.classList.add('clicked');
        setTimeout(() => {
            floatButton.classList.remove('clicked');
        }, 1000); // Duration of the animation
    });

    const changeBackgroundGradient = (section) => {
        const backgroundContainer = document.querySelector(".background-section");
        backgroundContainer.classList.remove("active");

        setTimeout(() => {
            backgroundContainer.classList.remove("morning", "evening", "night", "text-night");
            switch (section) {
                case 0:
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

    const changeBackgroundImage = (section) => {
        const landscapeImage = document.getElementById("landscape_image");
        const skyImage = document.getElementById("sky_image");

        // Clone the preloaded images and set necessary attributes
        const nextLandscapeImage = preloadedLandscapeImages[section].cloneNode();
        nextLandscapeImage.id = 'landscape_image';
        nextLandscapeImage.style.position = 'absolute';
        nextLandscapeImage.style.bottom = '0';
        nextLandscapeImage.style.left = '0';
        nextLandscapeImage.style.width = '100%';
        nextLandscapeImage.style.opacity = '0';
        nextLandscapeImage.style.transition = 'opacity 1s ease-in-out';
        nextLandscapeImage.style.zIndex = '2';

        // Check window height and set height to auto if less than 600px
        if (window.innerHeight < 600) {
            nextLandscapeImage.style.bottom = 'auto';
        }

        const nextSkyImage = preloadedSkyImages[section].cloneNode();
        nextSkyImage.id = 'sky_image';
        nextSkyImage.style.position = 'absolute';
        nextSkyImage.style.top = '0';
        nextSkyImage.style.left = '0';
        nextSkyImage.style.width = '100%';
        nextSkyImage.style.opacity = '0';
        nextSkyImage.style.transition = 'opacity 1s ease-in-out';
        nextSkyImage.style.zIndex = '1';

        landscapeImage.parentElement.appendChild(nextLandscapeImage);
        skyImage.parentElement.appendChild(nextSkyImage);

        // Transition to the new images
        setTimeout(() => {
            nextLandscapeImage.style.opacity = '1';
            landscapeImage.style.opacity = '0';

            nextSkyImage.style.opacity = '1';
            skyImage.style.opacity = '0';

            setTimeout(() => {
                currentLandscapeImage.remove();
                currentSkyImage.remove();

                currentLandscapeImage = nextLandscapeImage; // Track the current image
                currentSkyImage = nextSkyImage; // Track the current image
            }, 1000); // Delay the removal until after the transition
        }, 100);
    };

    const changeContent = (section) => {
        $(".ul_container").css("justify-content", "space-evenly");
        img.src = '/assets/buttons/down-scroll-button-rest.svg';
        removeNightStyles();
        switch (section) {
            case 0:
                $("#scrollContainer").animate({
                    scrollTop: $("#first_ul").offset().top
                }, 'slow');
                img.src = '/assets/buttons/down-scroll-button-rest.svg';
                img.classList.remove('rotate');
                img.classList.add('rotate-back');
                break;
            case 1:
                $("#scrollContainer").animate({
                    scrollTop: $("#second_ul").offset().top - $("#fixed").offset().top
                }, 'slow');
                img.src = '/assets/buttons/down-scroll-button-rest.svg';
                img.classList.remove('rotate');
                img.classList.remove('rotate-back');
                break;
            case 2:
                $("#scrollContainer").animate({
                    scrollTop: $("#scrollContainer").scrollTop() - $("#fixed").offset().top + $("#third_ul").offset().top
                }, 'slow');
                img.src = '/assets/buttons/down-scroll-button-rest.svg';
                img.classList.remove('rotate');
                img.classList.remove('rotate-back');
                break;
            case 3:
                addNightStyles();
                $(".ul_container").css("justify-content", "space-between");
                img.src = '/assets/buttons/down-scroll-button-rest.svg';
                img.classList.add('rotate');
                img.classList.remove('rotate-back');
                $("#scrollContainer").animate({
                    scrollTop: $("#scrollContainer").scrollTop() - $("#fixed").offset().top + $("#fourth_ul").offset().top
                }, 'slow');
                break;
        }
    }

    const addNightStyles = () => {
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

    const startPress = () => {
        img.src = '/assets/buttons/down-scroll-button-press.svg';
    }

    const endPress = () => {
        img.src = '/assets/buttons/down-scroll-button-rest.svg';
    }

    floatButton.addEventListener('mousedown', startPress);
    floatButton.addEventListener('mouseup', endPress);

    floatButton.addEventListener('touchstart', startPress);
    floatButton.addEventListener('touchend', endPress);
});