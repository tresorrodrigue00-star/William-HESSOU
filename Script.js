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