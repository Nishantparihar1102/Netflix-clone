document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Navbar Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Trending Section Scroll ---
    const movieRow = document.getElementById('movieRow');
    const scrollLeft = document.getElementById('scrollLeft');
    const scrollRight = document.getElementById('scrollRight');

    if (movieRow && scrollLeft && scrollRight) {
        scrollLeft.addEventListener('click', () => {
            movieRow.scrollBy({ left: -400, behavior: 'smooth' });
        });

        scrollRight.addEventListener('click', () => {
            movieRow.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }

    // --- Language Switching Logic ---
    const langDropdowns = document.querySelectorAll('.lang-dropdown');
    
    const translations = {
        en: {
            heroTitle: "Unlimited movies, TV shows and more",
            heroSub: "Watch anywhere. Cancel anytime.",
            heroPrompt: "Ready to watch? Enter your email to create or restart your membership.",
            getStarted: "Get Started",
            trending: "Trending Now",
            tvTitle: "Enjoy on your TV",
            tvSub: "Watch on smart TVs, PlayStation, Xbox, Apple TV, Blu-ray players and more.",
            downloadTitle: "Download your shows to watch offline",
            downloadSub: "Save your favourites easily and always have something to watch.",
            watchTitle: "Watch everywhere",
            watchSub: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
            kidsTitle: "Create profiles for kids",
            kidsSub: "Send children on adventures with their favourite characters in a space made just for them—free with your membership.",
            faqTitle: "Frequently Asked Questions",
            signIn: "Sign In"
        },
        hi: {
            heroTitle: "अनलिमिटेड फ़िल्में, टीवी शो और बहुत कुछ",
            heroSub: "कहीं भी देखें. कभी भी कैंसिल करें.",
            heroPrompt: "देखने के लिए तैयार हैं? अपनी मेंबरशिप बनाने या फिर से शुरू करने के लिए अपना ईमेल डालें.",
            getStarted: "शुरू करें",
            trending: "अभी ट्रेंडिंग",
            tvTitle: "अपने टीवी पर आनंद लें",
            tvSub: "स्मार्ट टीवी, PlayStation, Xbox, Apple TV, Blu-ray प्लेयर और बहुत कुछ पर देखें.",
            downloadTitle: "ऑफ़लाइन देखने के लिए अपने शो डाउनलोड करें",
            downloadSub: "अपने पसंदीदा शो आसानी से सेव करें और आपके पास हमेशा देखने के लिए कुछ न कुछ होगा.",
            watchTitle: "कहीं भी देखें",
            watchSub: "अपने फ़ोन, टैबलेट, लैपटॉप और टीवी पर अनलिमिटेड फ़िल्में और टीवी शो स्ट्रीम करें.",
            kidsTitle: "बच्चों के लिए प्रोफ़ाइल बनाएं",
            kidsSub: "बच्चों को उनके पसंदीदा किरदारों के साथ रोमांच पर भेजें—आपकी मेंबरशिप के साथ मुफ़्त.",
            faqTitle: "अक्सर पूछे जाने वाले सवाल",
            signIn: "साइन इन करें"
        }
    };

    function updateLanguage(lang) {
        // Sync all dropdowns
        langDropdowns.forEach(dropdown => {
            dropdown.value = lang;
        });

        const t = translations[lang];
        
        // Update Hero
        document.querySelector('.hero-content h1').textContent = t.heroTitle;
        document.querySelector('.hero-content h2').textContent = t.heroSub;
        document.querySelector('.hero-content p').textContent = t.heroPrompt;
        document.querySelectorAll('.btn-get-started').forEach(btn => {
            const svg = btn.querySelector('svg').outerHTML;
            btn.innerHTML = `${t.getStarted} ${svg}`;
        });

        // Trending Header
        document.querySelector('.trending-header h2').textContent = t.trending;

        // Feature Sections
        const features = document.querySelectorAll('.feature-text');
        // TV
        features[0].querySelector('h2').textContent = t.tvTitle;
        features[0].querySelector('p').textContent = t.tvSub;
        // Download
        features[1].querySelector('h2').textContent = t.downloadTitle;
        features[1].querySelector('p').textContent = t.downloadSub;
        // Watch
        features[2].querySelector('h2').textContent = t.watchTitle;
        features[2].querySelector('p').textContent = t.watchSub;
        // Kids
        features[3].querySelector('h2').textContent = t.kidsTitle;
        features[3].querySelector('p').textContent = t.kidsSub;

        // FAQ Header
        document.querySelector('.faq-section h2').textContent = t.faqTitle;
        document.querySelector('.faq-section p').textContent = t.heroPrompt;

        // Sign In Button
        document.querySelector('.btn-signin').textContent = t.signIn;
    }

    langDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', (e) => {
            updateLanguage(e.target.value);
        });
    });

    // --- FAQ Accordion Functionality ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Email Form Validation ---
    const emailForms = document.querySelectorAll('.email-form');
    
    emailForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const email = input.value.trim();
            
            if (validateEmail(email)) {
                alert('Thank you! Redirecting to sign up...');
                // In a real app, you'd redirect here
                // window.location.href = '/signup';
            } else {
                input.style.borderColor = '#e50914';
                alert('Please enter a valid email address.');
            }
        });
        
        // Reset border on input
        form.querySelector('input').addEventListener('input', function() {
            this.style.borderColor = 'rgba(255,255,255,0.5)';
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
