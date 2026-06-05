/* 
   Client Cascade Earlybird Landing Page Script
   Handles interaction, validations, mockups, and entry animations.
   Linear High-Converting Layout
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SMOOTH SCROLL ROUTING & FLOATING CTA ---
    const floatingCta = document.getElementById('floating-cta');
    const waitlistSection = document.getElementById('waitlist-form-section');
    const ctaScrollBtns = document.querySelectorAll('.scroll-to-waitlist');

    // Smooth scroll to waitlist section
    function scrollToWaitlist(e) {
        if (e) e.preventDefault();
        if (waitlistSection) {
            waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    ctaScrollBtns.forEach(btn => {
        btn.addEventListener('click', scrollToWaitlist);
    });

    // Toggle Floating CTA visibility based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    });


    // --- 2. FORM VALIDATION & SIGNUP INTERACTIONS ---
    const heroForm = document.getElementById('hero-earlybird-form');
    const mainForm = document.getElementById('waitlist-main-form');
    const mainEmailInput = document.getElementById('main-email');
    const mainNameInput = document.getElementById('main-name');
    
    // Modal Elements
    const modalOverlay = document.getElementById('success-modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Hero Form (Email-only) - Routes to detailed form
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('hero-email');
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                // Autofill email in bottom form
                if (mainEmailInput) {
                    mainEmailInput.value = email;
                }
                
                // Clear error, scroll to waitlist, and focus Name
                emailInput.classList.remove('error');
                scrollToWaitlist();
                
                // Focus Name with a slight delay to let scroll happen
                setTimeout(() => {
                    if (mainNameInput) mainNameInput.focus();
                }, 800);
            } else {
                // Shake & error highlight
                emailInput.classList.add('error');
                shakeElement(emailInput);
            }
        });
    }

    // Main Waitlist Form Submission
    if (mainForm) {
        mainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect fields to validate
            const name = document.getElementById('main-name');
            const email = document.getElementById('main-email');
            const phone = document.getElementById('main-phone');
            const company = document.getElementById('main-company');
            const trade = document.getElementById('main-trade');
            const submitBtn = mainForm.querySelector('button[type="submit"]');

            let isValid = true;

            // Reset error highlights
            [name, email, phone, company, trade].forEach(input => {
                if (input) input.classList.remove('error');
            });

            // Validations
            if (!name.value.trim()) {
                name.classList.add('error');
                shakeElement(name);
                isValid = false;
            }
            if (!validateEmail(email.value.trim())) {
                email.classList.add('error');
                shakeElement(email);
                isValid = false;
            }
            if (!validatePhone(phone.value.trim())) {
                phone.classList.add('error');
                shakeElement(phone);
                isValid = false;
            }
            if (!company.value.trim()) {
                company.classList.add('error');
                shakeElement(company);
                isValid = false;
            }
            if (trade && !trade.value) {
                trade.classList.add('error');
                shakeElement(trade);
                isValid = false;
            }

            if (isValid) {
                // Simulate loading state
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '⚡ Securing Your Spot...';

                setTimeout(() => {
                    // Show success modal
                    if (modalOverlay) {
                        modalOverlay.classList.add('active');
                    }
                    
                    // Reset form and button
                    mainForm.reset();
                    if (heroForm) heroForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 1500);
            }
        });
    }

    // Close success modal
    if (closeModalBtn && modalOverlay) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
        
        // Close on clicking overlay background
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // Email validation regex helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Phone validation regex helper (supporting typical formats)
    function validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(phone);
    }

    // Shake error animation helper
    function shakeElement(element) {
        element.style.transform = 'translateX(0px)';
        const start = Date.now();
        const duration = 300;
        const amplitude = 6;
        const frequency = 40; // ms per shake cycle
        
        const timer = setInterval(() => {
            const timePassed = Date.now() - start;
            if (timePassed >= duration) {
                clearInterval(timer);
                element.style.transform = '';
                return;
            }
            
            const offset = Math.sin(timePassed / frequency * Math.PI) * amplitude * (1 - timePassed / duration);
            element.style.transform = `translateX(${offset}px)`;
        }, 15);
    }


    // --- 3. ANIMATION SCRIPTS (GSAP / CSS OBSERVATION) ---
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger if available
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Hero Content Animation
        gsap.from('.hero-content > *', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // Hero Visual Animation
        gsap.from('.hero-visual', {
            opacity: 0,
            scale: 0.95,
            x: 40,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
        });

        // Why Cascade section elements
        gsap.from('.why-container > *', {
            scrollTrigger: {
                trigger: '.why-section',
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });

        // Alternating Linear Feature rows
        document.querySelectorAll('.feature-row').forEach(row => {
            gsap.from(row.querySelectorAll('.feature-content > *, .feature-visual'), {
                scrollTrigger: {
                    trigger: row,
                    start: 'top 75%'
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });
        });

        // Bonus cards reveal
        gsap.from('.bonus-card', {
            scrollTrigger: {
                trigger: '.bonuses-section',
                start: 'top 75%'
            },
            opacity: 0,
            scale: 0.95,
            y: 40,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.2)'
        });

        // Bottom Form Box reveal
        gsap.from('.waitlist-form-container', {
            scrollTrigger: {
                trigger: '.waitlist-section',
                start: 'top 80%'
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out'
        });

    } else {
        // Fallback standard IntersectionObserver (similar to main site)
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Apply transition styling dynamically for fallback
        const animatedClasses = ['.feature-row', '.bonus-card', '.waitlist-form-container'];
        animatedClasses.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(25px)';
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(el);
            });
        });
    }
});
