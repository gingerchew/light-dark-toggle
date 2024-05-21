let instances = new Set<LightDarkToggle>(),
    ls = localStorage,
    getPreference = () => ls.ldt ?? matchMedia(`(prefers-color-scheme: dark)`).matches ? 'dark' : 'light',
    d = document,
    meta = ((m) => {
        m ??= d.head.insertAdjacentElement(
            'beforeend', 
            Object.assign(d.createElement('meta'), { name: 'color-scheme', content: getPreference() })
        ) as HTMLMetaElement
        m.content !== ls.ldt && (m.content = ls.ldt);
        return m;
    })(d.querySelector<HTMLMetaElement>(`[name="color-scheme"]`)),
    render = () => requestAnimationFrame(() => instances.forEach(i => i._render())),
    reflect = false;

export class LightDarkToggle extends HTMLElement {
    constructor() {
        super();
        reflect ||= this.getAttribute('reflect') === 'local'
    }

    static define(name = 'light-dark-toggle') {
        window.customElements.define(name, this)
    }

    _render() {
		this.innerHTML = `<button>${meta.content}</button>`
    }
    
	_toggle = () => {
        meta.content = meta.content === 'dark' ? 'light' : 'dark'
		reflect && (ls.ldt = meta.content);
        render()
    }

    connectedCallback() {
        this.addEventListener('click', this._toggle, true);
        instances.add(this)
		this._render()
    }

    disconnectedCallback() {
		this.removeEventListener('click', this._toggle, true)
		instances.delete(this)
    }
}