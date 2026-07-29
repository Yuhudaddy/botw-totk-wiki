# Generative Frontend Prompt — Yuda's Channel: Game Wiki

Create a fully finished, standalone, premium interactive landing page for **Yuda's Channel — Game Wiki**. The visual language should retain the cinematic, quiet, particle-driven quality of the supplied reference, but this is no longer an error page. Its focal point is the word **YUDA**, formed entirely from living orange-toned particles that become a vortex around the pointer.

Reproduce the composition, scale, responsive behaviour, particle physics, and refined atmosphere described below as precisely as possible. This is a build specification, not a loose visual suggestion. Do not simplify the animation, replace it with CSS dots, add stock imagery, or turn the hero into a conventional card layout.

If a reference screenshot is supplied, use it only as the source of the original composition and motion language. All text, colour, branding, and interface details in this prompt override the screenshot.

## 1. Required output

Create one complete, working `index.html` file.

・ Put all HTML, CSS, and JavaScript in that file.
・ Use native HTML, CSS, JavaScript, and Canvas 2D only.
・ Do not use React, npm, a bundler, images, videos, WebGL, Three.js, GSAP, or heavy external libraries.
・ The page must run by opening the HTML file directly in a browser.
・ Do not use placeholders, pseudocode, unfinished functions, or omitted sections.
・ Return only the complete code of `index.html` in one HTML code block; do not add explanation before or after it.

## 2. Experience and visual intent

The page should feel like entering a secret game shrine: warm, contemplative, high-end, technical, and slightly mysterious. It is a portal to game knowledge, not a generic gaming dashboard and not a cyberpunk interface.

Core metaphor:

・ Hundreds or thousands of luminous particles assemble into the readable uppercase word `YUDA`.
・ The letters are created by particle density, never by a filled white DOM heading.
・ A very subtle outline of `YUDA` may sit behind the particles as a holographic guide only.
・ As a mouse or finger moves near the letters, particles lose their rigid attachment and spiral around that position as a real vortex.
・ Once the pointer leaves, particles smoothly return to their assigned positions and rebuild `YUDA`.
・ The wordmark must remain recognisable after its entrance animation and after the vortex settles.

Desired mood:

・ cinematic, warm, futuristic, dreamy, premium, calm, and editorial;
・ orange, amber, copper, and soft ivory light instead of the original violet and blue palette;
・ sparse and intentional, with no unnecessary cards or sci-fi decoration;
・ elegant game-wiki identity, suitable for guides to The Legend of Zelda, Super Smash Bros., and related games;
・ never use cheap neon, CRT scanlines, acid colours, a star-field game background, planets, astronauts, or a generic gaming HUD.

## 3. Colour system and themes

The site must support a proper dark theme and light theme. The chosen theme controls the entire page, including canvas particles, ambient lighting, cursor light, text, buttons, borders, and the destination project view.

Set `color-scheme` appropriately and expose the active theme through `data-theme="dark"` or `data-theme="light"` on `<html>`.

### Dark theme — default when system preference is unavailable

```css
:root[data-theme="dark"] {
  color-scheme: dark;
  --background: #130b06;
  --background-secondary: #211006;
  --background-deep: #090503;
  --surface: rgba(58, 29, 12, 0.54);
  --text-primary: #fff5e8;
  --text-muted: rgba(255, 229, 200, 0.64);
  --line: rgba(255, 202, 141, 0.20);
  --accent: #ff9c3f;
  --accent-bright: #ffc06b;
  --accent-deep: #d85a21;
  --glow: #ffb35c;
}
```

### Light theme

```css
:root[data-theme="light"] {
  color-scheme: light;
  --background: #fff8ef;
  --background-secondary: #f8e6cf;
  --background-deep: #eed4b4;
  --surface: rgba(255, 250, 243, 0.72);
  --text-primary: #321407;
  --text-muted: rgba(79, 37, 14, 0.70);
  --line: rgba(137, 68, 25, 0.22);
  --accent: #c85017;
  --accent-bright: #e9832b;
  --accent-deep: #8a2f0e;
  --glow: #f09a47;
}
```

Use strong text contrast in light mode; body copy and interactive labels must meet at least 4.5:1 contrast against their background.

Use theme-aware particle palettes. Select the appropriate palette whenever the theme changes, then redraw the canvas without a flash or stale colours.

```javascript
const PARTICLE_COLORS = {
  dark: [
    [255, 126, 43],
    [255, 174, 83],
    [255, 210, 139],
    [202, 70, 24]
  ],
  light: [
    [190, 67, 17],
    [222, 103, 28],
    [247, 151, 62],
    [125, 45, 12]
  ]
};
```

### Background layers

Build the background from a deep or warm-ivory base, fine grain, a clean edge vignette, a pointer-following radial glow, and barely visible orbital lines around `YUDA`.

Dark theme base:

```css
background:
  radial-gradient(circle at 50% 38%, rgba(109, 47, 13, 0.42), transparent 36%),
  linear-gradient(145deg, #130b06 0%, #211006 48%, #090503 100%);
```

Light theme base:

```css
background:
  radial-gradient(circle at 50% 38%, rgba(246, 157, 75, 0.23), transparent 38%),
  linear-gradient(145deg, #fffaf2 0%, #f9e6cc 50%, #efd3b0 100%);
```

The slow ambient layer should use muted amber, burnt orange, and soft gold glows. Expand it to about `inset: -30%`, apply `filter: blur(20px)`, and drift it with an 18–24 second period. Keep it subtle enough that the particle word remains the clear focal point.

## 4. Page geometry and layers

The page is one viewport with no desktop vertical scroll:

```css
width: 100%;
min-height: 100svh;
overflow: hidden;
display: grid;
grid-template-rows: auto 1fr auto;
```

Use this approximate stacking order:

・ `z-index: 1` ambient light;
・ `z-index: 2–3` full-page particle canvas and dust;
・ `z-index: 4` pointer light and vortex ring;
・ `z-index: 5–7` hero content;
・ `z-index: 8–9` vignette and grain;
・ `z-index: 10–12` header and footer;
・ `z-index: 30` custom cursor on fine pointers only.

The canvas must fill the page and must not capture pointer events:

```css
position: absolute;
inset: 0;
width: 100%;
height: 100%;
pointer-events: none;
```

Test 1440×900, 1366×768, 1176×666, 390×844, and 360×800. The full composition must remain visible and readable at every size.

## 5. Header and theme control

The header floats at the upper edge of the scene with:

```css
padding-inline: clamp(24px, 4vw, 68px);
padding-top: clamp(24px, 4.4vh, 48px);
```

On the left, use a small, restrained wordmark such as `YUDA` with the descriptor `GAME WIKI`. It may include a compact circular Y monogram, but it must not look like a bordered card.

On the right, place one accessible icon-only button that toggles the theme:

・ Use a hand-drawn-feeling but precise inline SVG sun and crescent moon, never emoji.
・ Do not give the control an exterior border, pill, square, or card background.
・ The visible icon cross-fades or gently rotates between sun and moon; a warm glow and opacity change are sufficient hover feedback.
・ Include `aria-label`, a native `<button>`, an obvious `:focus-visible` ring, `cursor: pointer`, and a 150–300ms transition.
・ The control must announce its action accurately, for example `Switch to light theme` or `Switch to dark theme`.

Do not display any of these elements anywhere on the page: `47.2042° N`, `—03.0404 Z`, `04 — 04`, `UNMAPPED COORDINATE`, coordinate-like labels, status dots, or equalizer decoration.

### Theme persistence and project entry

On first visit, initialise from `prefers-color-scheme`; thereafter persist the user’s explicit choice in `localStorage` under `yuda-theme`. Set `<html data-theme>` before the page is painted to prevent a theme flash.

The `Enter Shrine` link must preserve this choice when entering the project: use the same-origin `localStorage` key and retain the `data-theme` convention so the destination project can read and apply the mode before it renders. Do not make the theme switch cosmetic or limited to the landing page.

## 6. Main YUDA particle composition

Place the `YUDA` word in the upper-middle of the viewport:

・ centre X: 50%;
・ centre Y: about 40–42% of viewport height on desktop;
・ visual width: about 62–74% of viewport width, without touching side edges;
・ the headline sits below the wordmark.

The shape must be made from particles. Add an optional ghost DOM element containing only `YUDA` beneath them, but keep it transparent and extremely faint:

```css
color: transparent;
-webkit-text-stroke: 0.75px color-mix(in srgb, var(--accent) 25%, transparent);
text-shadow: 0 0 18px color-mix(in srgb, var(--glow) 14%, transparent);
opacity: 0.34;
mix-blend-mode: screen;
```

Use a bold geometric sans-serif for the mask. The shape should have enough spacing to make all four letters legible:

```css
font-family: Arial, Helvetica, sans-serif;
font-size: min(22vw, 34vh, 390px);
font-weight: 900;
line-height: 0.8;
letter-spacing: -0.055em;
white-space: nowrap;
```

Never use a filled text layer to fake the word. Readability must come from particle density.

## 7. Exact interface copy

Do not rewrite or translate these strings.

Eyebrow above the heading:

`Yuda's Channel - Game Wiki`

Main heading, split across lines if needed:

`Welcome to`
`Dazotikuy Shrine`

Set only `Dazotikuy Shrine` in an elegant serif italic.

Description:

`Advanced game guides and mechanics for The Legend of Zelda, Super Smash Bros., and beyond.`

Primary button:

`Enter Shrine`

Secondary button:

`Visit Channel`

Footer, as the only footer text:

`© 2026 Yuhudaddy - Content Curated from Personal YouTube Channel`

## 8. Typography, content layout, and buttons

Position the hero text beneath `YUDA` in the lower middle of the viewport. Use a clean, modern sans-serif for all non-italic text; it should resemble Geist, Inter, or Helvetica Neue.

```css
max-width: 970px;
font-size: clamp(42px, 5.85vw, 85px);
font-weight: 450;
line-height: 0.96;
letter-spacing: -0.064em;
text-align: center;
```

For the italic shrine name, use an available serif stack such as:

```css
font-family: "Iowan Old Style", "Bodoni 72", "Bodoni MT", Didot, Georgia, serif;
font-style: italic;
font-weight: 400;
```

Give the shrine name a subtle, theme-aware gold-to-orange text gradient. Keep it legible in both modes.

Above the heading, display the eyebrow in uppercase/lowercase exactly as supplied, with a thin 38px amber light line. Use a mono or technical sans at about 8px and letter-spacing around `0.17em`; it is a title label, not an error status.

Below the heading, place the description and two actions in a compact horizontal block:

```css
display: grid;
grid-template-columns: minmax(230px, 350px) auto;
gap: clamp(36px, 7vw, 104px);
align-items: center;
margin-top: clamp(22px, 3.2vh, 35px);
```

Description: maximum width about 350px; 12px; line-height 1.75; use `--text-muted`.

Buttons: use genuine anchors, with their destinations defined as clearly named top-level URL constants. `Enter Shrine` navigates to the project entry; `Visit Channel` navigates to the personal YouTube channel. If production URLs have not been supplied, use same-origin `/` as the safe initial target rather than inventing third-party links.

```css
min-width: 168px;
min-height: 50px;
border-radius: 999px;
font-size: 10px;
```

The primary action is a dark/light-aware translucent amber surface with a fine line, soft inner highlight, and restrained warm shadow. The secondary action is quieter but still clearly interactive. Each action may contain a small 30×30px circular arrow indicator; use inline SVG, not a text symbol or emoji.

Hover and focus behaviour:

・ strengthen the warm glow and border/line opacity;
・ send a soft light streak through the action;
・ rotate or offset the SVG arrow very slightly;
・ use `cubic-bezier(0.16, 1, 0.3, 1)` and 250–450ms transitions;
・ a magnetic displacement of at most 5px is allowed on fine pointers only;
・ never let a hover state change layout or obscure text.

`Visit Channel` is a navigation link, not a particle-reset action. Do not introduce a recalibration, status change, collapse effect, or hidden error state.

## 9. Footer

Place a single centred footer line at the bottom edge with:

```css
padding-inline: clamp(24px, 4vw, 68px);
padding-bottom: clamp(23px, 3.7vh, 41px);
font-family: monospace;
font-size: 7px;
letter-spacing: 0.12em;
color: var(--text-muted);
```

It should be quiet but readable. Do not add a left code, right equalizer, coordinates, or any other footer content.

## 10. Canvas particle system

Implement genuine particle physics using one Canvas 2D canvas and `requestAnimationFrame`. Do not create DOM nodes for particles.

Account for device pixel ratio:

```javascript
const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
```

### Build the YUDA mask

Create an offscreen canvas at logical viewport size. Draw a filled `YUDA` text mask, read `ImageData`, and collect pixels whose alpha exceeds 80. Use a 7px sample step on desktop and 5px on mobile; shuffle the valid coordinates with Fisher–Yates and a deterministic seeded random function with initial seed `2026`.

```javascript
const fontSize = Math.min(width * 0.22, height * 0.34, 390);
const centerY = height * (width < 720 ? 0.34 : 0.41);

maskContext.fillStyle = "#fff";
maskContext.textAlign = "center";
maskContext.textBaseline = "middle";
maskContext.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`;
maskContext.fillText("YUDA", width / 2, centerY);
```

If necessary, compute the font size from `measureText("YUDA")` so the mask never exceeds 74% of the viewport width. Rebuild the mask only on resize or theme-independent layout changes.

Particle count must be controlled:

```javascript
const count = width < 720
  ? clamp(Math.floor(width * height / 880), 560, 820)
  : clamp(Math.floor(width * height / 680), 1200, 2100);
```

Each particle stores:

```javascript
{ x, y, tx, ty, vx, vy, size, depth, phase, color, orbitSpeed }
```

Start particles around the screen centre at random radii rather than at their targets:

```javascript
const radius = Math.max(width, height) * (0.25 + random() * 0.8);
```

They must assemble into `YUDA` within a few seconds of loading.

### Continuous living motion

Particles must never become entirely static. Add a restrained personal orbit and flow field, but keep each letter coherent:

```javascript
const idleRadius = 1.8 + particle.depth * 4.8;
const idleAngle = time * particle.orbitSpeed + particle.phase;
const floatX = Math.cos(idleAngle) * idleRadius;
const floatY = Math.sin(idleAngle * 0.86) * idleRadius * 0.76;

const flow = 0.012 + particle.depth * 0.016 * Math.sin(time * 0.54 + particle.phase);
particle.vx += Math.sin(particle.y * 0.011 + time * 0.72 + particle.phase) * flow * delta;
particle.vy += Math.cos(particle.x * 0.009 - time * 0.61 + particle.phase) * flow * delta;
```

### Pointer tracking

Track the pointer on `window`, not the canvas. Use a passive `pointermove` listener with a `mousemove` fallback, and support touch movement. Store:

```javascript
pointer = { x, y, smoothX, smoothY, moveX, moveY, speed, active };
```

Smooth the position with a 0.14 interpolation factor. The vortex should react to simple pointer movement; it must work in an embedded preview and after publishing.

### Real vortex physics

This is the principal interaction. Use an influence radius of about 270px on desktop and 160px on mobile. For particles inside it, calculate the radial and tangent directions from the smoothed pointer. Reduce the return spring strongly within the local vortex so particles can actually detach from the letter.

```javascript
const vortexStrength = Math.pow((influence - distance) / influence, 1.18);
const localSpring = spring * (1 - vortexStrength * 0.94);
const orbitRadius = 42 + particle.depth * 34 + Math.min(pointer.speed, 24) * 0.9;
const radialForce = (orbitRadius - distance) * 0.032 * vortexStrength;
const swirlForce = (1.55 + particle.depth * 2.7 + pointer.speed * 0.07) * vortexStrength;
```

Apply radial, tangent, and a small pointer-velocity force to `vx` and `vy`. The effect must create a visible empty centre and a dense rotating ring with spiral particle paths, around 180–270px in diameter on desktop. A slight repulsion is not acceptable.

Outside the influence radius, return particles to `tx + floatX` and `ty + floatY` with:

```javascript
const spring = 0.021;
const damping = 0.90;
```

Clamp speed and ensure the letters recover in roughly 2.5–4 seconds once the pointer leaves.

### Rendering, trails, dust, and cursor light

Use `ctx.globalCompositeOperation = "lighter"`. Particles should shimmer softly and vary from 0.55px to 2px. Larger particles may have a faint, larger secondary glow, but the word must never become a blurry solid mass.

Draw fine trails opposite moving particle velocity only when velocity exceeds about 0.48. Group trail strokes by particle colour and call `stroke()` once per group. Use round caps, a 0.72px line width, and alpha around 0.10–0.16.

Add a separate, slow background-dust array: about 110 particles on desktop and 52 on mobile. Dust rises gently and wraps to the bottom; it must not form letters.

Add a CSS pointer-light layer using a warm radial gradient at `--pointer-x` and `--pointer-y`. Add an extremely subtle amber conic-gradient ring around 260–270px wide, radial-masked to a ring. It enhances the physical vortex but never replaces it.

On `pointer: fine`, add a small warm centre dot and a smooth 34–36px custom ring. Expand it to about 54px over links and buttons. It must have `pointer-events: none`. Disable the custom cursor on touch devices.

## 11. Motion, responsive layout, and accessibility

Entrance sequence:

・ header comes in softly from above;
・ the ghost `YUDA` outline reveals from a small blur;
・ particles fly in and assemble into the word;
・ eyebrow, heading, description, and buttons arrive from below;
・ footer comes last.

Use `cubic-bezier(0.16, 1, 0.3, 1)`, gentle opacity/translation, and no bouncy effect.

For widths up to 720px:

・ retain the header and theme control;
・ move `YUDA` a little higher, with mask centre around 34% height;
・ use `min(31vw, 19vh)` for the ghost word size and preserve all four readable letters;
・ left-align the headline and use `clamp(41px, 12.7vw, 67px)`;
・ stack description above actions;
・ keep both actions side by side at equal width where space permits, otherwise stack without overflow;
・ keep the footer readable and account for safe-area insets.

Support `@media (prefers-reduced-motion: reduce)`. Reduce ambient drift, reveal distance, idle movement, magnetic hover, and optional trails, but do not remove the particle response or vortex. The interaction scale must remain at least about 0.60 of the normal vortex. Theme toggling and both links must always work.

Use semantic `header`, `main`, `section`, and `footer`; a real `<h1>`; meaningful aria-labels; `aria-hidden="true"` for decorative canvas and effects; visible `:focus-visible` styles; and real anchor elements for both actions. The canvas must not be the only way to understand or operate the page.

## 12. Performance, prohibitions, and acceptance criteria

Performance requirements:

・ one main canvas only;
・ `requestAnimationFrame` only, not multiple competing animation loops;
・ DPR capped at 1.6;
・ no O(n²) particle searches or particle-to-particle connection lines;
・ group colour strokes;
・ rebuild the mask only on resize;
・ use passive pointer listeners;
・ target 55–60 FPS on desktop and at least 30 FPS on modern mobile devices.

Do not create a standard error-page visual, static canvas, ordinary filled `YUDA` title, purple/blue-dominant palette, bright green/red cyberpunk, separate content sections, heavy libraries, horizontal mobile overflow, or any coordinates/status/equalizer remnants from the reference.

The result is ready only when all of the following are true:

1. Within 4–8 seconds, particles form a readable uppercase `YUDA` word.
2. The word is readable primarily through particles, not a filled text layer.
3. Hovering or touch movement creates a substantial rotating vortex with a visible empty core.
4. Particles form circular and spiral paths, then reassemble into `YUDA` after the pointer leaves.
5. The orange palette, particles, background, actions, and cursor light update correctly in both themes.
6. The sun/moon control has no exterior container, persists the selected mode, and provides the destination project with the same theme value.
7. The displayed copy exactly matches section 7.
8. No coordinates, unmapped label, error status, or old footer code is visible.
9. The layout fits one screen and stays readable at all required resolutions.
10. There are no browser-console errors, images, videos, or third-party heavy dependencies.

