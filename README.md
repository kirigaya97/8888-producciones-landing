# 8888 Producciones — Landing

Productora audiovisual / estudio de grabación / management de artistas.
**Multimodal Brutalism · Future-Pop**

## Stack

- [Astro 6](https://astro.build) — static MPA
- [Tailwind CSS v4](https://tailwindcss.com) — design tokens en `src/styles/global.css`
- [Motion One](https://motion.dev) — scroll-reveal & micro-animations (~3.8KB)
- [Lenis](https://lenis.studiofreight.com) — smooth scroll

## Identidad

Guidelines completas: `../Lineamientos/stitch_8888_producciones_brand_identity/lineamientos.html`

| Token | Hex |
|---|---|
| Acid Green | `#B6F700` |
| Deep Black | `#0E0E0E` |
| Studio White | `#FFFFFF` |

Tipografía: Newsreader (editorial), Space Grotesk (display), Inter (body).

## Scripts

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

## Estructura

```
src/
├─ layouts/Base.astro
├─ components/
│  ├─ Loader.astro            # 0000→8888 counter + acid bar reveal
│  ├─ Header.astro
│  ├─ Hero.astro              # text split reveal
│  ├─ Manifesto.astro
│  ├─ Servicios.astro
│  ├─ Roster.astro
│  ├─ Reel.astro
│  ├─ Estudio.astro
│  ├─ Marquee.astro
│  ├─ Contacto.astro
│  ├─ Footer.astro
│  ├─ GrainOverlay.astro
│  └─ Cursor.astro
└─ pages/index.astro
```

## Animaciones

- **Loader** — counter eased `0000`→`8888`, barra acid creciendo, flash + sweep-out (sessionStorage para no repetir).
- **Hero** — stagger reveal palabra por palabra al terminar el loader.
- **Scroll** — `[data-reveal]` y `[data-stagger]` activados por `Motion One inView`.
- **Marquee** — CSS animation infinita entre secciones.
- **Cursor custom** — dot acid green con `mix-blend-mode: difference`, escala en hover.
- **Scroll progress bar** — acid green, sincronizada con Lenis.

---

© 2026 · Built in Buenos Aires, AR.
