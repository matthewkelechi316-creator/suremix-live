SUREMIX LIVE — VERSION 1 PROTOTYPE
==================================

WHAT THIS BUILD DOES
- Runs as a responsive web app on Android and Windows.
- Provides working Preview source selection and simulated Program switching.
- Includes CUT, simulated FADE, and BLACK output controls.
- Includes saved audio level controls (values only).
- Includes lower-third / verse / lyrics / announcement text overlays.
- Includes quick service scene presets.
- Saves settings in the browser and caches app files for offline reopening after first successful load.

IMPORTANT LIMITATION
This is the first user-interface prototype, not yet a full video production engine.
Camera tiles are source placeholders. CUT/FADE change the simulated program state;
they do not yet switch physical cameras or produce a real HDMI/projector output.
Audio sliders currently save control values but do not control Windows audio hardware.
The Android phone is not yet remotely connected to a Windows production engine.
Those features require the next build: a Windows capture/mixing engine and a local-network
control API. Do not advertise this prototype as a complete vMix replacement.

HOW TO TEST
1. Upload the contents of this folder to an HTTPS static host (for example, a free static
   hosting service) or run it on localhost.
2. Open the HTTPS link in Chrome on Android.
3. Use Chrome menu > Install app / Add to Home screen.
4. Open the app once while online. The service worker caches the app shell.
5. Turn off internet and reopen it to test offline mode.

NOTE
Installability and service-worker offline caching require HTTPS or localhost.
Opening index.html directly as a file will show the interface but will not enable PWA
installation or service-worker caching.

PROJECT FILES
- index.html: app layout
- style.css: visual design
- app.js: interactive controller prototype
- sw.js: offline cache
- manifest.webmanifest: install metadata
- icon-192.png and icon-512.png: app icons
