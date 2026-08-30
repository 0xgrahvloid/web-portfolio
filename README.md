# Anugrah Pratama Portfolio

Static portfolio built with HTML, Tailwind CSS CDN, custom CSS, JavaScript, and Lucide Icons.

## Structure

```text
anugrah_portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   └── anugrah-pratama.jpg
│   ├── cv-preview/
│   │   ├── page-1.png
│   │   └── page-2.png
│   └── projects/
│       └── README.txt
└── cv/
    └── Anugrah-Pratama-CV-2026.pdf
```

## Run locally

For the most reliable preview, run a local web server from this folder.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

You can upload the whole folder to GitHub Pages, Netlify, or Vercel as a static site. Keep the folder structure intact so the image, CSS, JS, and CV paths continue to work.

## Adding project artwork

Put project covers in `assets/projects/`. A 1600 x 900 WebP cover is recommended.
