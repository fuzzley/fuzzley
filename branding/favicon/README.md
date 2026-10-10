# Favicon

The letter f built from four bento tiles, with the hook in felt green.
`icon.svg` is the source of truth; everything else is exported from the same
geometry by `make_favicons.py`.

| File                   | Used by                                                     |
| ---------------------- | ----------------------------------------------------------- |
| `icon.svg`             | Modern browsers. Switches to light tiles in dark mode.      |
| `favicon.ico`          | Older browsers and `/favicon.ico` requests. 16, 32 and 48px. |
| `apple-touch-icon.png` | iOS home screen, 180px.                                     |
| `icon-192.png`, `icon-512.png` | Android home screen and install, via the manifest.  |
| `manifest.webmanifest` | Points Android at the two PNGs.                             |

To use them, copy every file except the script and this README into
`frontend/public/` and add to `<head>`:

```html
<link rel="icon" href="favicon.ico" sizes="32x32">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="manifest" href="manifest.webmanifest">
```

The paths are relative to match the current build's `base: "./"`.

To regenerate after changing the geometry or colors (needs Pillow):

```sh
python branding/favicon/make_favicons.py branding/favicon
```
