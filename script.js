// Theme handling
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(getSystemTheme());
    }
}

// Initialize theme immediately to prevent flash
initTheme();

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Language handling
// Note: translations object should be defined in each HTML page
let currentLang = localStorage.getItem('lang') ||
    (navigator.language.startsWith('de') ? 'de' : 'en');

// Meta tag translations for SEO
const metaTranslations = {
    en: {
        index: {
            title: "Nintex K2 & Power Platform Consulting | Langwieser IT-Services",
            description: "Langwieser IT-Services - IT consulting for Nintex K2, Power Platform, and digitalization. Workflow automation for enterprises and small businesses across Austria and Europe.",
            ogTitle: "Nintex K2 & Power Platform Consulting | Langwieser IT-Services",
            ogDescription: "IT consulting for Nintex K2, Power Platform, and digitalization. Workflow automation for enterprises and small businesses across Austria and Europe."
        },
        about: {
            title: "Matthias Langwieser - IT Consultant | Langwieser IT-Services",
            description: "Meet Matthias Langwieser, IT consultant specializing in Nintex K2, Power Platform, and digitalization solutions for businesses of all sizes.",
            ogTitle: "Matthias Langwieser - IT Consultant",
            ogDescription: "IT consultant specializing in Nintex K2, Power Platform, and digitalization solutions for businesses of all sizes."
        },
        impressum: {
            title: "Legal Notice | Langwieser IT-Services e.U.",
            description: "Legal notice for Langwieser IT-Services e.U., an Austrian IT consulting business based in Sankt Ulrich bei Steyr.",
            ogTitle: "Legal Notice | Langwieser IT-Services",
            ogDescription: "Legal notice for Langwieser IT-Services e.U., an Austrian IT consulting business."
        },
        datenschutz: {
            title: "Privacy Policy | Langwieser IT-Services e.U.",
            description: "Privacy policy of Langwieser IT-Services e.U. - Information on data processing and your rights under GDPR.",
            ogTitle: "Privacy Policy | Langwieser IT-Services",
            ogDescription: "Information on data processing and your rights under GDPR."
        }
    },
    de: {
        index: {
            title: "Nintex K2 & Power Platform Beratung | Langwieser IT-Services",
            description: "Langwieser IT-Services - IT-Beratung für Nintex K2, Power Platform und Digitalisierung. Workflow-Automatisierung für Unternehmen in Österreich und Europa.",
            ogTitle: "Nintex K2 & Power Platform Beratung | Langwieser IT-Services",
            ogDescription: "IT-Beratung für Nintex K2, Power Platform und Digitalisierung. Workflow-Automatisierung für Unternehmen in Österreich und Europa."
        },
        about: {
            title: "Matthias Langwieser - IT-Consultant | Langwieser IT-Services",
            description: "Matthias Langwieser - IT-Consultant spezialisiert auf Nintex K2, Power Platform und Digitalisierungslösungen für Unternehmen jeder Größe.",
            ogTitle: "Matthias Langwieser - IT-Consultant",
            ogDescription: "IT-Consultant spezialisiert auf Nintex K2, Power Platform und Digitalisierungslösungen für Unternehmen jeder Größe."
        },
        impressum: {
            title: "Impressum | Langwieser IT-Services e.U.",
            description: "Impressum der Langwieser IT-Services e.U., einem österreichischen IT-Beratungsunternehmen mit Sitz in Sankt Ulrich bei Steyr.",
            ogTitle: "Impressum | Langwieser IT-Services",
            ogDescription: "Impressum der Langwieser IT-Services e.U., einem österreichischen IT-Beratungsunternehmen."
        },
        datenschutz: {
            title: "Datenschutzerklärung | Langwieser IT-Services e.U.",
            description: "Datenschutzerklärung der Langwieser IT-Services e.U. - Informationen zur Datenverarbeitung und Ihren Rechten gemäß DSGVO.",
            ogTitle: "Datenschutzerklärung | Langwieser IT-Services",
            ogDescription: "Informationen zur Datenverarbeitung und Ihren Rechten gemäß DSGVO."
        }
    }
};

// Function to detect current page
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('about.html')) return 'about';
    if (path.includes('impressum.html')) return 'impressum';
    if (path.includes('datenschutz.html')) return 'datenschutz';
    return 'index';
}

// Function to update meta tags based on language
function updateMetaTags(lang) {
    const page = getCurrentPage();
    const meta = metaTranslations[lang]?.[page];

    if (!meta) return;

    // Update title
    document.title = meta.title;

    // Update meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', meta.description);

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.ogTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.ogDescription);

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', meta.ogTitle);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', meta.ogDescription);

    // Update og:locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', lang === 'de' ? 'de_AT' : 'en_US');
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    // Update meta tags for SEO
    updateMetaTags(lang);

    // Check if translations are defined
    if (typeof translations === 'undefined') {
        console.warn('Translations object not defined');
        return;
    }

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update toggle buttons with aria-pressed for accessibility
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive.toString());
    });
}

// Wait for DOM to be ready before initializing
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    setLanguage(currentLang);

    // Language toggle event listeners
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // Theme toggle event listener
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // Navigation scroll effect
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Mobile menu toggle with aria-expanded for accessibility
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen.toString());
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Form submission with Formspree
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        const btnSpinner = submitBtn.querySelector('.btn-spinner');
        const formStatus = contactForm.querySelector('.form-status');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            btnIcon.style.display = 'none';
            btnSpinner.style.display = 'inline';
            submitBtn.disabled = true;
            formStatus.style.display = 'none';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Success
                    formStatus.style.display = 'block';
                    formStatus.style.background = 'rgba(52, 168, 83, 0.15)';
                    formStatus.style.color = '#34a853';
                    formStatus.textContent = currentLang === 'de'
                        ? 'Danke für Ihre Nachricht! Ich melde mich bald bei Ihnen.'
                        : 'Thank you for your message! I\'ll get back to you soon.';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error
                formStatus.style.display = 'block';
                formStatus.style.background = 'rgba(234, 67, 53, 0.15)';
                formStatus.style.color = '#ea4335';
                formStatus.textContent = currentLang === 'de'
                    ? 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie mir direkt eine E-Mail.'
                    : 'Something went wrong. Please try again or email me directly.';
            } finally {
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                btnIcon.style.display = 'inline';
                btnSpinner.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }
});
