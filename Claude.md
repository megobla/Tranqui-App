# Folders 
├── index.html              # single page; all views live here
├── css/
│   ├── tokens.css          # CSS variables: colors, spacing, type scale
│   ├── base.css            # reset + global styles
│   └── components.css      # buttons, cards, player, breathing circle
├── js/
│   ├── main.js             # entry point (ES module), registers service worker
│   ├── router.js           # simple hash-based navigation (#/breathe, #/music...)
│   ├── audio.js            # audio manager (play, loop, volume, fade, sleep timer)
│   ├── breathing.js        # breathing animation + timer logic
│   ├── mood.js             # mood selector + tip rendering
│   └── utils.js
├── data/                   # content as JSON (editable without touching code)
│   ├── breathing.json
│   ├── music.json
│   ├── ambient.json
│   └── tips.json
├── audio/
│   ├── music/              # relaxing music tracks (compressed mp3/ogg)
│   └── ambient/            # rain, birds, sea, etc. (seamless loops)
└── assets/
    ├── icons/              # PWA icons (192, 512, maskable)
    └── img/                # images, illustrations, fonts

# Technical Stack
- **Languages:** HTML5, CSS3, vanilla JavaScript. No framework, no bundler, no build step.
- **Styling:** plain CSS with custom properties (variables) defined in `tokens.css`. Mobile-first media queries.
- **Backend / database:** none; static JSON
- **Hosting:** Vercel, GitHub Pages.

# Sitemap
Tranqui
│
├── 0. Splash                                    (first open only)
│     └── "Comenzar" → Home
│
├── 1. Inicio (Home)                             ← tab 1
│     ├── Mood selector (Estresada, Ansiosa, Agobiada, Inquieta, No puedo dormir)
│     │     └── → Consejos, filtered by that mood
│     ├── Featured card "Pausa de 3 minutos"
│     │     └── → Respirar, session ready to start
│     └── Consejo del día
│
├── 2. Respirar (Breathing)                      ← tab 2
│     ├── Setup: duration (1 / 3 / 5 min) + "Comenzar"
│     └── Session in progress: orb with inhale / hold / exhale cues
│           └── Session complete: "Terminaste" + options (listen to a sound, read a tip)
│
├── 3. Escuchar (Music & sounds)                 ← tab 3
│     ├── Música para soltar: track list
│     │     └── Player (play / pause)
│     └── Sonidos del ambiente: rain, birds, sea, wind
│           └── Player (play / pause, loops)
│
├── 4. Consejos (Tips)                           ← tab 4
│     ├── Mood chips (same moods as Home)
│     └── Tips for the selected mood
│           └── CTA "Probar respiración guiada" → Respirar
│
└── Supporting pages (suggested, not designed yet)
      ├── Sobre tu instructora: her story and method, plus a contact link to the studio
      └── Install guide / "Add to home screen" (this is a web app)

# Naming conventions

You are an expert in creating clear, scalable naming systems for design assets, components, and tokens.
## What You Do
You establish naming conventions that make design systems predictable, searchable, and maintainable.
## Principles
1. Predictable 2. Consistent 3. Scalable 4. Scannable 5. Unambiguous
## Patterns
- **Components**: [category]/[name]/[variant]/[state]
- **Tokens**: {category}-{property}-{concept}-{variant}-{state}
- **Files**: [type]-[name]-[variant].[ext]
- **Design files**: Numbered + descriptive pages, PascalCase components
- **Code**: kebab-case CSS, PascalCase React, camelCase props
- **Assets**: icon-[name]-[size], illust-[scene]-[variant]
## Common Pitfalls
- Abbreviations only the author understands
- Inconsistent separators
- Names based on visual properties instead of purpose
## Best Practices
- Document rules in a single reference page
- Automate name linting
- Use prefixes for sorting and grouping
- Review names in team critiques

# Code Conventions
- Semantic HTML (`<main>`, `<nav>`, `<section>`, `<button>`); no clickable divs.
- CSS: class-based (BEM-like naming), no inline styles, no `!important`.
- JavaScript: ES modules, `const`/`let` only, no globals, no jQuery.
- File names: lowercase, kebab-case for CSS/assets, camelCase for JS modules.
- All user-facing text in Spanish; code, comments, and commit messages in English.
- Prefer simple solutions; avoid adding any dependency without a clear reason.