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
        // Use a Set to ensure the list of logos is unique.
        const logoFilenames = [...new Set([
            'AquaDuct.png', 'ClearViewCleaners.png', 'DrivewayDoctors.png', 'DurableRoofing.png',
            'ElevationBuilders.png', 'EverflowGutters.png', 'FlowRightGutters.png', 'GreenScape.png',
            'GreenScapes.png', 'GutterGuys.png', 'HorizonContracting.png', 'KeystoneContracting.png',
            'Lumina.png', 'NaturesEdge.png', 'OneWayExteriors.png', 'PaveSafe.png',
            'PinnacleExteriors.png', 'PipeDreamsPlumbing.png', 'PrecisionGutters.png', 'Prism.png',
            'ProFlow.png', 'RainFlowSystems.png', 'ReliableRoofing.png', 'SummitRoofers.png',
            'TerraformLandscaping.png', 'TheGutterButler.png', 'TheGutterPros.png', 'VertexHomes.png'
        ])];

        shuffleArray(logoFilenames);

        // Duplicate logos for seamless scrolling
        const allLogos = [...logoFilenames, ...logoFilenames];

        const slide = document.createElement('div');
        slide.classList.add('logos-slide');

        // Create a document fragment to append images in the correct order, avoiding race conditions.
        const fragment = document.createDocumentFragment();
        allLogos.forEach(filename => {
            const img = document.createElement('img');
            img.src = `images/client-logos/${filename}`;
            img.alt = filename.split('.')[0];
            fragment.appendChild(img);
        });

        slide.appendChild(fragment);
        logosContainer.appendChild(slide);

        // Set a single, consistent animation speed.
        slide.style.setProperty('--scroll-duration', '180s');
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Testimonial slider logic
    const slider = document.querySelector('.testimonial-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        if (slider && cards.length > 0) {
            const cardWidth = cards[0].offsetWidth;
            const newTransform = -index * cardWidth;
            slider.style.transform = `translateX(${newTransform}px)`;
        }
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showTestimonial(currentIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (nextBtn && prevBtn && slider) {
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide on manual navigation
        });

        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide on manual navigation
        });

        // Pause auto-slide on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);

        // Initialize
        showTestimonial(currentIndex);
        startAutoSlide();
    }
});
