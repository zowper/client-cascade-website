/* 
   Client Cascade Earlybird Landing Page Script
   Handles interaction, validations, mockups, and entry animations.
   Linear High-Converting Layout
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SMOOTH SCROLL ROUTING & FLOATING CTA ---
    const floatingCta = document.getElementById('floating-cta');
    const heroSection = document.querySelector('.hero-section');
    const ctaScrollBtns = document.querySelectorAll('.scroll-to-waitlist');
    const heroStep1 = document.getElementById('hero-step-1');

    // Smooth scroll to hero section and focus appropriate input
    function scrollToHero(e) {
        if (e) e.preventDefault();
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Focus the appropriate input after scroll finishes
        setTimeout(() => {
            if (heroStep1 && heroStep1.style.display !== 'none') {
                const emailInput = document.getElementById('hero-email');
                if (emailInput) emailInput.focus();
            } else {
                const nameInput = document.getElementById('hero-name');
                if (nameInput) nameInput.focus();
            }
        }, 800);
    }

    ctaScrollBtns.forEach(btn => {
        btn.addEventListener('click', scrollToHero);
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
    const heroVipForm = document.getElementById('hero-vip-form');
    const mainForm = document.getElementById('waitlist-main-form');
    const bottomSection = document.getElementById('waitlist-form-section');
    const heroStep2 = document.getElementById('hero-step-2');
    
    // Modal Elements
    const modalOverlay = document.getElementById('success-modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Step 1: Hero Form (Email-only) Submission
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('hero-email');
            const email = emailInput.value.trim();
            const submitBtn = heroForm.querySelector('button[type="submit"]');

            if (validateEmail(email)) {
                emailInput.classList.remove('error');
                
                // Show loading state
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '⚡ Securing Spot...';

                // Simulate saving email address immediately to database
                setTimeout(() => {
                    console.log('Spot secured immediately for:', email);
                    localStorage.setItem('earlybird_email', email);
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    // Smooth transition to Step 2 (VIP Upsell)
                    if (heroStep1 && heroStep2) {
                        heroStep1.style.opacity = '0';
                        setTimeout(() => {
                            heroStep1.style.display = 'none';
                            heroStep2.style.display = 'block';
                            // Trigger layout paint reflow
                            heroStep2.offsetHeight;
                            heroStep2.style.opacity = '1';
                            
                            // Focus Name field
                            const heroName = document.getElementById('hero-name');
                            if (heroName) heroName.focus();
                        }, 400);
                    }
                    
                    // Render/show bottom form section (Step 2 VIP Upsell)
                    if (bottomSection) {
                        bottomSection.style.display = 'block';
                        bottomSection.offsetHeight; // Reflow
                        bottomSection.style.opacity = '1';
                        
                        // Refresh GSAP ScrollTrigger trigger points if GSAP is loaded
                        if (typeof ScrollTrigger !== 'undefined') {
                            ScrollTrigger.refresh();
                        }
                    }
                }, 1000);
            } else {
                // Shake & error highlight
                emailInput.classList.add('error');
                shakeElement(emailInput);
            }
        });
    }

    // Step 2: Handles VIP Form Submissions (for both Hero and Bottom VIP forms)
    function handleVipFormSubmission(formElement, nameField, phoneField, companyField, tradeField) {
        if (!formElement) return;
        
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = formElement.querySelector('button[type="submit"]');
            let isValid = true;

            // Reset error highlights
            [nameField, phoneField, companyField, tradeField].forEach(input => {
                if (input) input.classList.remove('error');
            });

            // Validations
            if (!nameField || !nameField.value.trim()) {
                if (nameField) nameField.classList.add('error');
                shakeElement(nameField);
                isValid = false;
            }
            if (!phoneField || !validatePhone(phoneField.value.trim())) {
                if (phoneField) phoneField.classList.add('error');
                shakeElement(phoneField);
                isValid = false;
            }
            if (!companyField || !companyField.value.trim()) {
                if (companyField) companyField.classList.add('error');
                shakeElement(companyField);
                isValid = false;
            }
            if (tradeField && !tradeField.value) {
                tradeField.classList.add('error');
                shakeElement(tradeField);
                isValid = false;
            }

            if (isValid) {
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '⚡ Claiming VIP Setup...';

                setTimeout(() => {
                    // Save VIP onboarding details
                    const email = localStorage.getItem('earlybird_email') || '';
                    const vipData = {
                        email: email,
                        name: nameField.value.trim(),
                        phone: phoneField.value.trim(),
                        company: companyField.value.trim(),
                        trade: tradeField.value
                    };
                    console.log('VIP onboarding details submitted:', vipData);
                    localStorage.setItem('earlybird_vip_details', JSON.stringify(vipData));

                    // Show success modal
                    if (modalOverlay) {
                        modalOverlay.classList.add('active');
                    }
                    
                    // Reset all forms
                    if (heroVipForm) heroVipForm.reset();
                    if (mainForm) mainForm.reset();
                    
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 1200);
            }
        });
    }

    // Bind VIP Form Submissions
    if (heroVipForm) {
        handleVipFormSubmission(
            heroVipForm,
            document.getElementById('hero-name'),
            document.getElementById('hero-phone'),
            document.getElementById('hero-company'),
            document.getElementById('hero-trade')
        );
    }

    if (mainForm) {
        handleVipFormSubmission(
            mainForm,
            document.getElementById('main-name'),
            document.getElementById('main-phone'),
            document.getElementById('main-company'),
            document.getElementById('main-trade')
        );
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
        gsap.from('.hero-header > *, .hero-content > *', {
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

        // ROI Calculator Animation
        gsap.from('.roi-calc-container > *', {
            scrollTrigger: {
                trigger: '.roi-calculator-section',
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
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
        const animatedClasses = ['.feature-row', '.bonus-card', '.waitlist-form-container', '.roi-calc-container'];
        animatedClasses.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(25px)';
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(el);
            });
        });
    }

    // --- 4. ROI CALCULATOR LOGIC ---
    const sliderJobPrice = document.getElementById('roi-job-price');
    const sliderBids = document.getElementById('roi-bids');
    const sliderCloseRate = document.getElementById('roi-close-rate');

    const labelJobPrice = document.getElementById('roi-job-price-val');
    const labelBids = document.getElementById('roi-bids-val');
    const labelCloseRate = document.getElementById('roi-close-rate-val');

    const outputCurrRev = document.getElementById('roi-curr-rev');
    const outputLostBids = document.getElementById('roi-lost-bids');
    const outputLeakedRev = document.getElementById('roi-leaked-rev');
    const outputMonthlyRecovered = document.getElementById('roi-monthly-recovered');
    const outputAnnualRecovered = document.getElementById('roi-annual-recovered');

    function formatCurrency(val) {
        return '$' + Math.round(val).toLocaleString();
    }

    function calculateROI() {
        if (!sliderJobPrice || !sliderBids || !sliderCloseRate) return;

        const jobPrice = parseFloat(sliderJobPrice.value);
        const bids = parseFloat(sliderBids.value);
        const closeRate = parseFloat(sliderCloseRate.value) / 100;

        // Update labels
        if (labelJobPrice) labelJobPrice.textContent = formatCurrency(jobPrice);
        if (labelBids) labelBids.textContent = bids;
        if (labelCloseRate) labelCloseRate.textContent = Math.round(closeRate * 100) + '%';

        // 1. Current Monthly Revenue
        const currentRevenue = jobPrice * bids * closeRate;
        if (outputCurrRev) outputCurrRev.textContent = formatCurrency(currentRevenue) + ' / mo';

        // 2. Estimated Bids Lost to poor follow-up (assuming 33% of lost bids are follow-up issues)
        const lostBidsCount = bids * (1 - closeRate);
        const followUpLostBids = lostBidsCount * 0.33;
        if (outputLostBids) outputLostBids.textContent = followUpLostBids.toFixed(1) + ' / mo';

        // 3. Leaked Monthly Revenue
        const leakedRevenue = followUpLostBids * jobPrice;
        if (outputLeakedRev) outputLeakedRev.textContent = formatCurrency(leakedRevenue) + ' / mo';

        // 4. Monthly and Annual Recovery (assuming Cascade helps recover at least 15% relative bump in close rate)
        const closeRateBump = 0.15;
        const monthlyRecovered = jobPrice * bids * (closeRate * closeRateBump);
        const annualRecovered = monthlyRecovered * 12;

        if (outputMonthlyRecovered) outputMonthlyRecovered.textContent = '+' + formatCurrency(monthlyRecovered);
        if (outputAnnualRecovered) outputAnnualRecovered.textContent = '+' + formatCurrency(annualRecovered) + ' / year';
    }

    if (sliderJobPrice && sliderBids && sliderCloseRate) {
        [sliderJobPrice, sliderBids, sliderCloseRate].forEach(slider => {
            slider.addEventListener('input', calculateROI);
        });
        calculateROI(); // Initial run
    }


});
