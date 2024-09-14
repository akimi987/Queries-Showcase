class ResponsiveCard extends HTMLElement {

    canDelete;

    /**
     * @param {boolean} canDelete 
     */
    constructor(canDelete) {
        super();
        this.canDelete = canDelete;
        this.classList.add('card-container');
    }

    connectedCallback() {
        this.render();
        this.attachHandlers();
    }

    addNewComponent() {
        this.appendChild(new ResponsiveCard(true));
    }

    render() {
        this.innerHTML = `
        <article class="card">
            <h2 class="card__title">Un mignon chaton et un kiwi</h2>
            <img class="card__img" src="https://assets.codepen.io/9425/lilith.webp" alt="un chat mignon">
            <p class="card__desc">
                Affichage des différents styles des elements selon la taille de leur
                parent. Réduisez la largeur du conteneur pour modifier les styles appliqués.
            </p>
            <button class="card__btn btn">
                + ajouter nouveau composant
            </button>
        </article>
        `;
        if (this.canDelete) {
            const btn = document.createElement('button');
            btn.textContent = 'x';
            btn.classList.add('card__delete');
            this.prepend(btn);
        }
        this.$btn = this.querySelector('.card__btn');
        this.$delete = this.querySelector('.card__delete');
    }

    attachHandlers() {
        this.$btn.addEventListener('click', this.addNewComponent.bind(this));
        this.$delete?.addEventListener('click', this.remove.bind(this));
    }
}

customElements.define('responsive-card', ResponsiveCard);