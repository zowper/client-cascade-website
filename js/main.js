// JavaScript for the Client Cascade website.

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu logic
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }

    // Fade-in elements logic
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    if (fadeInElements.length > 0) {
        const fadeInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        fadeInElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    }

    // Client logo slider logic
    const logosContainer = document.querySelector('.logos');
    if (logosContainer) {
        const logoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadLogos();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        logoObserver.observe(logosContainer);
    }

    function loadLogos() {
        const logoFilenames = [
            'AquaDuct.png', 'ClearViewCleaners.png', 'DrivewayDoctors.png', 'DurableRoofing.png',
            'ElevationBuilders.png', 'EverflowGutters.png', 'FlowRightGutters.png', 'GreenScape.png',
            'GreenScapes.png', 'GutterGuys.png', 'HorizonContracting.png', 'KeystoneContracting.png',
            'Lumina.png', 'NaturesEdge.png', 'OneWayExteriors.png', 'PaveSafe.png',
            'PinnacleExteriors.png', 'PipeDreamsPlumbing.png', 'PrecisionGutters.png', 'Prism.png',
            'ProFlow.png', 'RainFlowSystems.png', 'ReliableRoofing.png', 'SummitRoofers.png',
            'TerraformLandscaping.png', 'TheGutterButler.png', 'TheGutterPros.png', 'VertexHomes.png'
        ];

        shuffleArray(logoFilenames);

        // Duplicate logos for seamless scrolling
        const allLogos = [...logoFilenames, ...logoFilenames];

        const slide = document.createElement('div');
        slide.classList.add('logos-slide');
        logosContainer.appendChild(slide);

        allLogos.forEach(filename => {
            const img = new Image();
            img.src = `images/client-logos/${filename}`;
            img.alt = filename.split('.')[0];
            img.onload = () => {
                slide.appendChild(img);
            };
        });

        // Set initial fast animation speed
        slide.style.setProperty('--scroll-duration', '40s');

        // After a delay, transition to the slower speed
        setTimeout(() => {
            slide.style.setProperty('--scroll-duration', '180s');
        }, 4000); // 4 seconds
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
