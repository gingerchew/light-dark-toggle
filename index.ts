let instances = new Set<LightDarkToggle>(),
    d = document,
    meta = d.querySelector<HTMLMetaElement>('[name="color-scheme"]') ?? 
    d.head.insertAdjacentElement(
        'beforeend', 
        Object.assign(d.createElement('meta'), { name: 'color-scheme', content: matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light' }
    )
) as HTMLMetaElement,
    render = () => requestAnimationFrame(() => instances.forEach(i => i._render()))

export class LightDarkToggle extends HTMLElement {
    constructor() {super()}

    static define(name = 'light-dark-toggle') {
        window.customElements.define(name, this)
    }

    _render() {
		this.innerHTML = `<button>${meta.content}</button>`
    }
    
	_toggle = () => {
        meta.content = meta.content === 'dark' ? 'light' : 'dark'
		
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