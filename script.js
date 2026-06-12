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

    // --- 3. TRAITEMENT DU FORMULAIRE DE CONTACT (Vider les champs après envoi) ---
    const form = document.getElementById("contactForm");
    const statusDiv = document.getElementById("formStatus");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Empêche le rechargement de la page et la redirection
            
            const data = new FormData(event.target);
            const button = form.querySelector(".btn-submit");
            
            // Changement d'état visuel du bouton
            button.textContent = "Envoi en cours...";
            button.disabled = true;

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Styles et message de succès si tout s'est bien passé
                    statusDiv.style.padding = "15px";
                    statusDiv.style.backgroundColor = "#d4edda"; // Fond Vert clair
                    statusDiv.style.color = "#155724";           // Texte Vert Foncé
                    statusDiv.innerHTML = "✨ Votre message a été envoyé avec succès ! Notre équipe vous contactera sous peu.";
                    
                    form.reset(); // Vides tous les champs du formulaire d'un coup !
                } else {
                    response.json().then(data => {
                        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                            statusDiv.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            statusDiv.innerHTML = "❌ Une erreur est survenue lors de l'envoi.";
                        }
                    });
                }
            }).catch(error => {
                // Gestion d'une erreur réseau (ex: coupure internet)
                statusDiv.style.padding = "15px";
                statusDiv.style.backgroundColor = "#f8d7da"; // Fond rouge clair
                statusDiv.style.color = "#721c24";           // Texte rouge foncé
                statusDiv.innerHTML = "❌ Impossible d'envoyer le message. Vérifiez votre connexion internet.";
            }).finally(() => {
                // Restauration de l'état initial du bouton d'envoi
                button.textContent = "Envoyer la demande";
                button.disabled = false;
            });
        });
    }
});
