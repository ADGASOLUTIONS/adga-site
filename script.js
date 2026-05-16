document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. ANIMATION AU DÉFILEMENT (SCROLL) ---
    const cards = document.querySelectorAll('.card');
    
    const checkCards = () => {
        const triggerBottom = window.innerHeight / 5 * 4;
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if(cardTop < triggerBottom) {
                card.classList.add('show');
            }
        });
    };

    window.addEventListener('scroll', checkCards);
    checkCards(); // Appel initial

    // --- 2. LIGHTBOX POUR LES RÉALISATIONS ---
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.classList.add('active');
            const img = item.querySelector('img');
            const title = item.querySelector('h4').textContent;
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                    <h3>${title}</h3>
                </div>
            `;
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', e => {
        if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});