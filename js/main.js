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
        loadLogos();
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

    // Animated Testimonials Logic
    const testimonialContainer = document.querySelector('.animated-testimonial-container');
    if (testimonialContainer) {
        const images = document.querySelectorAll('.testimonial-img');
        const quotes = document.querySelectorAll('.testimonial-quote');
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        let currentIndex = 0;
        let interval;

        function showTestimonial(index) {
            quotes.forEach((quote, i) => {
                if (i === index) {
                    gsap.to(quote, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
                    quote.classList.add('active');
                } else {
                    gsap.to(quote, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.in' });
                    quote.classList.remove('active');
                }
            });

            images.forEach((img, i) => {
                const zIndex = images.length - Math.abs(index - i);
                gsap.to(img, {
                    y: (i - index) * 20,
                    scale: i === index ? 1 : 0.9,
                    opacity: i === index ? 1 : 0.7,
                    rotation: i === index ? 0 : (Math.random() * 10 - 5),
                    zIndex: zIndex,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            });
        }

        function next() {
            currentIndex = (currentIndex + 1) % quotes.length;
            showTestimonial(currentIndex);
        }

        function prev() {
            currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
            showTestimonial(currentIndex);
        }

        function startAutoplay() {
            interval = setInterval(next, 5000);
        }

        function stopAutoplay() {
            clearInterval(interval);
        }

        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            next();
            startAutoplay();
        });
        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            prev();
            startAutoplay();
        });

        // Initial setup
        showTestimonial(0);
        startAutoplay();
    }
});
