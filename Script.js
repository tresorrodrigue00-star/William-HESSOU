// ========================================
// MENU BURGER - Gestion complète
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Sélection des éléments
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const body = document.body;
    
    // Vérifier que les éléments existent
    if (!burgerMenu || !nav) {
        console.error('❌ Éléments du menu non trouvés');
        return;
    }
    
    console.log('✅ Burger menu trouvé:', burgerMenu);
    console.log('✅ Nav trouvée:', nav);
    
    // ========================================
    // 1. OUVRIR/FERMER le menu avec le bouton burger
    // ========================================
    burgerMenu.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        nav.classList.toggle('active');
        burgerMenu.classList.toggle('active');
        
        // Bloquer le scroll quand le menu est ouvert
        if (nav.classList.contains('active')) {
            body.style.overflow = 'hidden';
            console.log('🔓 Menu OUVERT');
        } else {
            body.style.overflow = '';
            console.log('🔒 Menu FERMÉ');
        }
    });
    
    // ========================================
    // 2. FERMER le menu quand on clique sur un lien
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            burgerMenu.classList.remove('active');
            body.style.overflow = '';
            console.log('🔗 Menu fermé via lien');
        });
    });
    
    // ========================================
    // 3. FERMER le menu quand on clique en dehors
    // ========================================
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !burgerMenu.contains(e.target)) {
            nav.classList.remove('active');
            burgerMenu.classList.remove('active');
            body.style.overflow = '';
            console.log('👆 Menu fermé via clic extérieur');
        }
    });
    
    // ========================================
    // 4. FERMER le menu avec la touche Échap
    // ========================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            burgerMenu.classList.remove('active');
            body.style.overflow = '';
            console.log('⌨️ Menu fermé via Échap');
        }
    });
    
    // ========================================
    // 5. FERMER le menu lors du redimensionnement
    // ========================================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            burgerMenu.classList.remove('active');
            body.style.overflow = '';
            console.log('📱 Menu fermé via resize');
        }
    });
    
    console.log('✅ Menu burger initialisé avec succès');
});


// ========================================
// ANIMATION DES STATS (Compteur)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const stats = document.querySelectorAll('.stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const countElement = entry.target.querySelector('.count');
                if (countElement) {
                    animateCounter(countElement);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
    
    function animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9+]/g, '');
        
        if (isNaN(number)) return;
        
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = (hasPlus ? '+' : '') + Math.floor(current) + suffix;
        }, 16);
    }
});


// ========================================
// SMOOTH SCROLL pour les liens d'ancrage
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#') return;
            
            const targetId = href.substring(1);
            let targetElement = document.getElementById(targetId);
            
            if (!targetElement) {
                targetElement = document.querySelector(href);
            }
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// ========================================
// HEADER TRANSPARENT/SOLIDE au scroll
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(10, 14, 39, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#0a0e27';
                header.style.backdropFilter = 'none';
            }
        });
    }
});


// ========================================
// 🎨 ANIMATIONS AU SCROLL - Apparition élégante
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const animatedElements = document.querySelectorAll(`
        .hero, 
        .photo-container,
        .main-title,
        .subtitle,
        .description,
        .small-text,
        .buttons,
        .stats,
        .apropos-hero,
        .apropos-section,
        .services-section,
        .service-card,
        .temoignages-section,
        .card,
        .contact-section,
        .footer,
        .socials-row
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in-element');
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in-visible');
                }, index * 100);
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    const testimonialCards = document.querySelectorAll('.card');
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
});


// ========================================
// ✨ PARTICULES ANIMÉES - Arrière-plan
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = duration + 's';
        
        const delay = Math.random() * 5;
        particle.style.animationDelay = delay + 's';
        
        const opacity = Math.random() * 0.5 + 0.2;
        particle.style.opacity = opacity;
        
        particlesContainer.appendChild(particle);
        
        particle.addEventListener('animationend', function() {
            particle.remove();
            createParticle();
        });
    }
});


// ========================================
// 📊 BARRE DE PROGRESSION DU SCROLL
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
});


// ========================================
// 🎯 EFFET PARALLAX sur les sections
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const parallaxElements = document.querySelectorAll('.hero, .apropos-hero, .temoignages-hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.backgroundPositionY = yPos + 'px';
            }
        });
    });
});


console.log('🚀 Tous les scripts + Animations chargés avec succès!');

// ========================================
// 🌓 MODE SOMBRE/CLAIR
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const body = document.body;
    
    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
    
    // Toggle au clic
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        // Changer l'icône
        if (body.classList.contains('light-mode')) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'light');
            console.log('🌞 Mode clair activé');
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'dark');
            console.log('🌙 Mode sombre activé');
        }
        
        // Animation de transition
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
    
    console.log('✅ Mode sombre/clair initialisé');
});

// ========================================
// 🎬 LOADER DE PAGE
// ========================================
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    
    // Attendre 2 secondes puis masquer le loader
    setTimeout(() => {
        loader.classList.add('fade-out');
        
        // Supprimer complètement le loader après l'animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// ========================================
// ⬆️ BOUTON RETOUR EN HAUT
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) {
        console.error('Bouton retour en haut non trouvé');
        return;
    }
    
    // Afficher/Masquer le bouton au scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Retour en haut au clic
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('✅ Bouton retour en haut initialisé');
});

// ========================================
// 📂 PORTFOLIO - FILTRES ET MODALS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Système de filtres
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer la catégorie à filtrer
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrer les éléments
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            console.log('Filtre appliqué:', filterValue);
        });
    });
    
    console.log('✅ Portfolio filtres initialisés');
});

// Fonctions pour ouvrir/fermer les modals
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        console.log('Modal ouvert:', modalId);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        console.log('Modal fermé:', modalId);
    }
}

// Fermer le modal en cliquant en dehors
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('portfolio-modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Fermer le modal avec la touche Échap
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.portfolio-modal.show');
        if (openModal) {
            openModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
});

// ========================================
// 📧 VALIDATION FORMULAIRE DE CONTACT
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.error('Formulaire de contact non trouvé');
        return;
    }
    
    const nameInput = contactForm.querySelector('input[name="nom"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const subjectInput = contactForm.querySelector('input[name="objet"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Fonction de validation en temps réel
    function validateField(input, validationFn) {
        input.addEventListener('blur', function() {
            if (!validationFn(this.value)) {
                this.style.borderColor = '#f44336';
                showError(this, getErrorMessage(this.name));
            } else {
                this.style.borderColor = '#42a5f5';
                removeError(this);
            }
        });
        
        input.addEventListener('input', function() {
            if (validationFn(this.value)) {
                this.style.borderColor = '#42a5f5';
                removeError(this);
            }
        });
    }
    
    // Messages d'erreur personnalisés
    function getErrorMessage(fieldName) {
        const messages = {
            'nom': 'Le nom doit contenir au moins 2 caractères',
            'email': 'Veuillez entrer une adresse email valide',
            'objet': 'L\'objet doit contenir au moins 3 caractères',
            'message': 'Le message doit contenir au moins 10 caractères'
        };
        return messages[fieldName] || 'Ce champ est requis';
    }
    
    // Afficher l'erreur
    function showError(input, message) {
        removeError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#f44336';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        input.parentElement.appendChild(errorDiv);
    }
    
    // Retirer l'erreur
    function removeError(input) {
        const error = input.parentElement.querySelector('.form-error');
        if (error) {
            error.remove();
        }
    }
    
    // Validations
    validateField(nameInput, value => value.trim().length >= 2);
    validateField(emailInput, value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    validateField(subjectInput, value => value.trim().length >= 3);
    validateField(messageInput, value => value.trim().length >= 10);
    
    // Soumission du formulaire
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Vérifier tous les champs
        const isNameValid = nameInput.value.trim().length >= 2;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        const isSubjectValid = subjectInput.value.trim().length >= 3;
        const isMessageValid = messageInput.value.trim().length >= 10;
        
        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            showNotification('Veuillez remplir correctement tous les champs', 'error');
            return;
        }
        
        // Désactiver le bouton et afficher le loader
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loader-btn"></span> Envoi en cours...';
        
        // Envoyer le formulaire via Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showNotification('Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
                contactForm.reset();
                
                // Réinitialiser les bordures
                [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                    input.style.borderColor = '#1e2a47';
                });
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        })
        .catch(error => {
            showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
            console.error('Erreur:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Envoyer';
        });
    });
    
    console.log('✅ Validation formulaire initialisée');
});

// Système de notifications
function showNotification(message, type) {
    // Supprimer les notifications existantes
    const existingNotif = document.querySelector('.form-notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // Styles inline
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        backgroundColor: type === 'success' ? '#4caf50' : '#f44336',
        color: '#fff',
        zIndex: '10000',
        boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
        animation: 'slideInRight 0.5s ease',
        minWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    // Retirer après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .loader-btn {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid #fff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-icon {
        font-size: 20px;
        font-weight: bold;
    }
`;
document.head.appendChild(style);