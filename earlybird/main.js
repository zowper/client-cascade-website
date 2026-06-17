/* 
   Client Cascade Earlybird Landing Page Script
   Handles interaction, validations, mockups, and entry animations.
   Linear High-Converting Layout
*/

// --- CONFIGURATION ---
// Set your Google Apps Script URL or Webhook endpoint here to enable real-time lead capture
const LEAD_CAPTURE_ENDPOINT = 'https://services.leadconnectorhq.com/hooks/HlaondNJjL3ylk6sc6pM/webhook-trigger/b1fef980-c2e1-49c4-af12-96f93f067e43';

document.addEventListener('DOMContentLoaded', () => {
    
    // Support URL parameter ?reset=true or ?clear=true for easy testing / resetting state
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('reset') || urlParams.has('clear')) {
        localStorage.removeItem('earlybird_email');
        localStorage.removeItem('earlybird_vip_details');
        localStorage.removeItem('cc_earlybird_progress');
        localStorage.removeItem('cc_earlybird_session_id');
        window.location.href = window.location.pathname;
        return;
    }
    
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
    const heroStep2 = document.getElementById('hero-step-2');
    
    // Modal Elements
    const modalOverlay = document.getElementById('success-modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // --- LEAD CAPTURE SESSION & STATE ---
    function getOrCreateSessionId() {
        let sessionId = localStorage.getItem('cc_earlybird_session_id');
        if (!sessionId) {
            sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
            localStorage.setItem('cc_earlybird_session_id', sessionId);
        }
        return sessionId;
    }
    const sessionId = getOrCreateSessionId();

    function getSavedProgress() {
        try {
            return JSON.parse(localStorage.getItem('cc_earlybird_progress')) || {};
        } catch (e) {
            return {};
        }
    }

    function saveProgress(key, value) {
        const progress = getSavedProgress();
        progress[key] = value;
        localStorage.setItem('cc_earlybird_progress', JSON.stringify(progress));
    }

    // Selected matched input fields for syncing
    const fields = {
        email: [document.getElementById('hero-email'), document.getElementById('bottom-email')],
        name: [document.getElementById('hero-name'), document.getElementById('main-name')],
        phone: [document.getElementById('hero-phone'), document.getElementById('main-phone')],
        company: [document.getElementById('hero-company'), document.getElementById('main-company')],
        trade: [document.getElementById('hero-trade'), document.getElementById('main-trade')]
    };

    // Restore saved progress on load
    const savedProgress = getSavedProgress();
    Object.keys(fields).forEach(key => {
        if (savedProgress[key]) {
            fields[key].forEach(input => {
                if (input) input.value = savedProgress[key];
            });
        }
    });

    // Auto-transition steps based on previous submission state
    const heroStep3 = document.getElementById('hero-step-3');
    const bottomStep1 = document.getElementById('bottom-step-1');
    const bottomStep2 = document.getElementById('bottom-step-2');
    const bottomStep3 = document.getElementById('bottom-step-3');

    if (localStorage.getItem('earlybird_vip_details')) {
        // Show Step 3 (Success) directly
        if (heroStep1 && heroStep2 && heroStep3) {
            heroStep1.style.display = 'none';
            heroStep1.style.opacity = '0';
            heroStep2.style.display = 'none';
            heroStep2.style.opacity = '0';
            heroStep3.style.display = 'block';
            heroStep3.style.opacity = '1';
        }
        if (bottomStep1 && bottomStep2 && bottomStep3) {
            bottomStep1.style.display = 'none';
            bottomStep1.style.opacity = '0';
            bottomStep2.style.display = 'none';
            bottomStep2.style.opacity = '0';
            bottomStep3.style.display = 'block';
            bottomStep3.style.opacity = '1';
        }
    } else if (localStorage.getItem('earlybird_email') || savedProgress.email) {
        // Show Step 2 directly
        if (heroStep1 && heroStep2) {
            heroStep1.style.display = 'none';
            heroStep1.style.opacity = '0';
            heroStep2.style.display = 'block';
            heroStep2.style.opacity = '1';
        }
        if (bottomStep1 && bottomStep2) {
            bottomStep1.style.display = 'none';
            bottomStep1.style.opacity = '0';
            bottomStep2.style.display = 'block';
            bottomStep2.style.opacity = '1';
        }
    }

    // Send data to endpoint
    function sendLeadData(isSubmitted) {
        if (!LEAD_CAPTURE_ENDPOINT) return; // Silent if not configured

        const currentProgress = getSavedProgress();
        
        // GoHighLevel requires a valid email. Do not sync incomplete/invalid emails.
        if (!currentProgress.email || !validateEmail(currentProgress.email.trim())) {
            console.log('Lead capture sync skipped: Email is missing or invalid.');
            return;
        }
        
        // Deduce status based on what has been filled and submitted
        let status = 'partial';
        if (localStorage.getItem('earlybird_vip_details') || (isSubmitted && (currentProgress.name || currentProgress.phone))) {
            status = 'submitted';
        } else if (localStorage.getItem('earlybird_email') || isSubmitted) {
            status = 'step1_submitted';
        }

        const payload = {
            sessionId: sessionId,
            email: currentProgress.email || '',
            name: currentProgress.name || '',
            phone: currentProgress.phone || '',
            company: currentProgress.company || '',
            trade: currentProgress.trade || '',
            status: status,
            lastUpdated: new Date().toISOString(),
            referrer: document.referrer || '',
            userAgent: navigator.userAgent || ''
        };

        fetch(LEAD_CAPTURE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(() => {
            console.log('Lead capture sync request sent.');
        })
        .catch(err => {
            console.error('Lead capture sync error:', err);
        });
    }

    // Debounce lead capture
    let syncTimeout = null;
    function triggerRemoteSync() {
        if (syncTimeout) clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
            sendLeadData(false);
        }, 1500);
    }

    // Synchronize inputs & trigger autosave/remote sync
    Object.keys(fields).forEach(key => {
        fields[key].forEach(input => {
            if (!input) return;
            const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
            input.addEventListener(eventType, (e) => {
                const val = e.target.value;
                // Update matched inputs
                fields[key].forEach(otherInput => {
                    if (otherInput && otherInput !== input) {
                        otherInput.value = val;
                    }
                });
                // Save progress locally
                saveProgress(key, val);
                // Trigger debounced remote sync
                triggerRemoteSync();
            });
        });
    });

    // Transitions both CTAs to Step 2
    function transitionBothToStep2(email) {
        localStorage.setItem('earlybird_email', email);
        saveProgress('email', email);
        console.log('Spot secured immediately for:', email);

        // Immediately sync to remote endpoint
        sendLeadData(true);

        // Pre-fill email inputs (just in case they need it)
        const heroEmailInput = document.getElementById('hero-email');
        const bottomEmailInput = document.getElementById('bottom-email');
        if (heroEmailInput) heroEmailInput.value = email;
        if (bottomEmailInput) bottomEmailInput.value = email;

        // Transition Hero Step 1 to Step 2
        if (heroStep1 && heroStep2) {
            heroStep1.style.opacity = '0';
            setTimeout(() => {
                heroStep1.style.display = 'none';
                heroStep2.style.display = 'block';
                heroStep2.offsetHeight; // Reflow
                heroStep2.style.opacity = '1';
                
                // Focus Name field in Hero form if that's the one they were interacting with
                if (document.activeElement === heroEmailInput) {
                    const heroName = document.getElementById('hero-name');
                    if (heroName) heroName.focus();
                }
            }, 400);
        }

        // Transition Bottom Step 1 to Step 2
        const bottomStep1 = document.getElementById('bottom-step-1');
        const bottomStep2 = document.getElementById('bottom-step-2');
        if (bottomStep1 && bottomStep2) {
            bottomStep1.style.opacity = '0';
            setTimeout(() => {
                bottomStep1.style.display = 'none';
                bottomStep2.style.display = 'block';
                bottomStep2.offsetHeight; // Reflow
                bottomStep2.style.opacity = '1';
                
                // Focus Name field in Bottom form if that's the one they were interacting with
                if (document.activeElement === bottomEmailInput) {
                    const mainName = document.getElementById('main-name');
                    if (mainName) mainName.focus();
                }
            }, 400);
        }

        // Refresh GSAP ScrollTrigger trigger points
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

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

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    // Transition both forms to Step 2
                    transitionBothToStep2(email);
                }, 1000);
            } else {
                // Shake & error highlight
                emailInput.classList.add('error');
                shakeElement(emailInput);
            }
        });
    }

    // Step 1: Bottom Form (Email-only) Submission
    const bottomForm = document.getElementById('bottom-earlybird-form');
    if (bottomForm) {
        bottomForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('bottom-email');
            const email = emailInput.value.trim();
            const submitBtn = bottomForm.querySelector('button[type="submit"]');

            if (validateEmail(email)) {
                emailInput.classList.remove('error');
                
                // Show loading state
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '⚡ Securing Spot...';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    // Transition both forms to Step 2
                    transitionBothToStep2(email);
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

                    // Save to progress state as well
                    saveProgress('email', email);
                    saveProgress('name', vipData.name);
                    saveProgress('phone', vipData.phone);
                    saveProgress('company', vipData.company);
                    saveProgress('trade', vipData.trade);

                    // Send final submission immediately
                    sendLeadData(true);

                    // Show success modal
                    if (modalOverlay) {
                        modalOverlay.classList.add('active');
                    }
                    
                    // Transition Hero Step 2 to Step 3 Success
                    if (heroStep2) {
                        heroStep2.style.opacity = '0';
                        setTimeout(() => {
                            heroStep2.style.display = 'none';
                            const heroStep3 = document.getElementById('hero-step-3');
                            if (heroStep3) {
                                heroStep3.style.display = 'block';
                                heroStep3.offsetHeight; // Reflow
                                heroStep3.style.opacity = '1';
                            }
                        }, 400);
                    }

                    // Transition Bottom Step 2 to Step 3 Success
                    const bottomStep2 = document.getElementById('bottom-step-2');
                    const bottomStep3 = document.getElementById('bottom-step-3');
                    if (bottomStep2 && bottomStep3) {
                        bottomStep2.style.opacity = '0';
                        setTimeout(() => {
                            bottomStep2.style.display = 'none';
                            bottomStep3.style.display = 'block';
                            bottomStep3.offsetHeight; // Reflow
                            bottomStep3.style.opacity = '1';
                        }, 400);
                    }

                    // Reset all forms
                    if (heroVipForm) heroVipForm.reset();
                    if (mainForm) mainForm.reset();

                    // Also clear local progress so a new session can start fresh if needed
                    localStorage.removeItem('cc_earlybird_progress');
                    
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
        if (!element) return;
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
            y: 20,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            clearProps: 'all'
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
        const bidsPerDay = parseFloat(sliderBids.value);
        const bidsPerMonth = bidsPerDay * 30;
        const closeRate = parseFloat(sliderCloseRate.value) / 100;

        // Update labels
        if (labelJobPrice) labelJobPrice.textContent = formatCurrency(jobPrice);
        if (labelBids) labelBids.textContent = bidsPerDay;
        if (labelCloseRate) labelCloseRate.textContent = Math.round(closeRate * 100) + '%';

        // 1. Current Monthly Revenue
        const currentRevenue = jobPrice * bidsPerMonth * closeRate;
        if (outputCurrRev) outputCurrRev.textContent = formatCurrency(currentRevenue) + ' / mo';

        // 2. Estimated Bids Lost to poor follow-up (assuming 33% of lost bids are follow-up issues)
        const lostBidsCount = bidsPerMonth * (1 - closeRate);
        const followUpLostBids = lostBidsCount * 0.33;
        if (outputLostBids) outputLostBids.textContent = followUpLostBids.toFixed(1) + ' / mo';

        // 3. Leaked Monthly Revenue
        const leakedRevenue = followUpLostBids * jobPrice;
        if (outputLeakedRev) outputLeakedRev.textContent = formatCurrency(leakedRevenue) + ' / mo';

        // 4. Monthly and Annual Recovery (assuming Cascade helps recover at least 15% relative bump in close rate)
        const closeRateBump = 0.15;
        const monthlyRecovered = jobPrice * bidsPerMonth * (closeRate * closeRateBump);
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
