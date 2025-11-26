// Détecte les éléments quand ils entrent dans l'écran
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

// Sélection des éléments à animer
document.querySelectorAll('.fade-element').forEach(el => {
    observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll('.count');
    let hasRun = false;

    const startCounting = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 50;

            const update = () => {
                const current = +counter.innerText;
                const increment = Math.ceil(target / speed);

                if (current < target) {
                    counter.innerText = current + increment;
                    setTimeout(update, 20);
                } else {
                    counter.innerText = target;
                }
            };

            update();
        });

    };

    // Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasRun) {
                entry.target.classList.add('visible');
                hasRun = true;
                startCounting();
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.stat').forEach(stat => {
        observer.observe(stat);
    });

});

const fadeElements = document.querySelectorAll('.fade-element');
const observerFade = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

fadeElements.forEach(el => observerFade.observe(el));


const text = document.querySelector('.typing-text');
const content = text.textContent;
text.textContent = '';
let i = 0;

function typeWriter() {
    if(i < content.length){
        text.textContent += content.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // vitesse de frappe
    }
}

document.addEventListener('DOMContentLoaded', typeWriter);

