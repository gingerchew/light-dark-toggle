# LightDarkToggle

Dark mode using the browser

## How to use?

```js
import { LightDarkToggle } from 'light-dark-toggle';

LightDarkToggle.define();
```

## How does it work?

When the toggle renders in your HTML, using `<light-dark-toggle>` it renders a button with the current mode inside of it and a `<meta>` with the name `color-scheme` and the content set to the preferred color scheme of the user.


## TODO

- [x] Use a `<meta name="color-scheme">` in the `<head>` as the source of truth if it exists.
- [x] Detect and handle multiple instances
- [ ] Accept a toggle in the light dom instead of overriding the `innerHTML` of the `light-dark-toggle` element.
- [x] Reflect preference in localstorage
- [ ] Tests?
- [ ] Performance?