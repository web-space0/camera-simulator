# ShutterCraft — Photography Lab

**Experiment. Capture. Learn.**

A browser-based camera simulator built with plain **HTML, CSS and JavaScript**
(no frameworks, no libraries). It lets students pick a fictional Sony or
Canon-style camera, use their real webcam as the "sensor," and practice
photography concepts — ISO, aperture, shutter speed, zoom, filters and
focus — the same way they'd interact with a real digital camera.

Built as a teaching project for Class 9 students. The code is intentionally
simple: plain functions, `if/else`, `for` loops, and basic DOM methods —
nothing that needs an advanced JavaScript background to read.

---

## Project name

**ShutterCraft**

---

## File structure

```text
ShutterCraft/
├── index.html    → the page structure (camera selection + simulator)
├── style.css     → all visual styling (camera body, HUD, gallery, etc.)
├── script.js     → all interactivity (webcam, filters, gallery, challenges)
└── README.md     → this file
```

Only these four files are needed. No build tools, no installs, no npm.

---

## How to run it

1. Download or copy all files into **one folder**, keeping the file names
   exactly as they are (`index.html`, `style.css`, `script.js`).
2. Double-click `index.html` to open it in a browser. **Chrome or Edge**
   work best for webcam access.
3. Choose a camera, click **START CAMERA**, and allow webcam permission
   when the browser asks.
4. No webcam, or permission blocked? Click **DEMO MODE** to try every
   feature with a placeholder photo instead.

> **Note:** Some browsers restrict webcam access on pages opened directly
> from disk (`file://`). If the webcam doesn't start, run a simple local
> server instead:
>
> ```bash
> python -m http.server
> ```
>
> then open `http://localhost:8000` in your browser.

---

## Features

- Camera selection screen (Sony / Canon style, drawn entirely in CSS)
- Live webcam preview with a Demo Mode fallback
- Zoom (1x–3x), brightness, and 6 filters (Normal, B&W, Vintage, Warm,
  Cool, Bright)
- Simulated Auto Focus with a focus box and status text
- Take Photo with a shutter flash effect — capture via `<canvas>`
- Photo gallery with Download and Delete for each shot
- Simulated ISO / Aperture / Shutter Speed controls shown on the HUD
- A "Learn Photography" section explaining ISO, aperture, shutter speed
  and exposure in simple language
- Four mini challenges that check the student's camera settings with
  basic `if` statements
- Fully responsive layout for desktop, tablet and mobile

---

## Teaching notes

- ISO, aperture and shutter speed **do not physically change** the
  webcam — a normal webcam can't be controlled like a real lens. The
  interface is a **learning simulation**: it teaches the vocabulary and
  the trade-offs, and the note is shown to students directly on the page.
- Auto Focus is also a simulation — see the comment above `startCamera()`-
  style functions in `script.js` for the exact explanation to give
  students.
- Every function in `script.js` is written to be read and explained line
  by line: `startCamera()`, `takePhoto()`, `changeFilter()`,
  `changeZoom()`, `deletePhoto()`, `downloadPhoto()`, and so on.

---

## JavaScript concepts covered

Variables · Functions · Events (`addEventListener`) · If/else · Sliders ·
DOM manipulation (`getElementById`, `classList`, `createElement`) ·
Arrays and `for` loops · `<canvas>` and `toDataURL()` · Webcam access with
`getUserMedia()` · Changing CSS from JavaScript

---

## Credits

Built as a beginner-friendly classroom project. Free to use, modify and
share for teaching purposes.
