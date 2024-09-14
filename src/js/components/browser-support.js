class BrowserSupport extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const feature = this.getAttribute('feature');

        const isSupported = CSS.supports(feature);

        const content = isSupported
            ? `<p class='browser-support-message supported'>${feature} est supportée!</p>`
            : `<p class='browser-support-message unsupported'>Attention, ${feature} n'est pas supportée. Vous ne pouvez donc pas acceder a la demonstration.</p>`;

        this.innerHTML = content;
    }
}

customElements.define('browser-support', BrowserSupport);