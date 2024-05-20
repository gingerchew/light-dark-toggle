export class LightDarkToggle extends HTMLElement {
    _mode:'dark'|'light' = matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    constructor() { super() }

    static define(name = 'light-dark-toggle') {
        window.customElements.define(name, this);
    }

    _render() {
        requestAnimationFrame(() => 
            this.innerHTML = `<button>${this._mode}</button><meta name="color-scheme" content="${this._mode}" />`
        )
    }

    _toggle = () => {
        this._mode = this._mode === 'dark' ? 'light' : 'dark';
        this._render();
    }

    connectedCallback() {
        this.addEventListener('click', this._toggle);
        this._render();
    }

    disconnectedCallback() {
        this.removeEventListener('click', this._toggle);
    }
}