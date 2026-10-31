# Teamood Cafe website update

## Included changes
- Added an animated, scroll-triggered statistics section immediately after the homepage hero.
- Rebuilt the About page with an animated milestone journey and image-led timeline.
- Added a reusable split-layout page hero with text on the left and an animated image panel on the right.
- Applied the mustard yellow, white and charcoal palette across public-facing pages and shared navigation/footer theme tokens.
- Removed the separate Brands navigation entry and retired the old public Brands page route (legacy `/brands` redirects to `/about`).
- Removed the two non-Teamood brand names from public and seeded brand content.
- Simplified franchise options to the Teamood Cafe Lounge only.
- Rebuilt menu cards to show each menu item's configured image, with a fallback image if an image URL fails.
- Added image-backed page headers to the cart, checkout and order confirmation flows; product detail layout places text before the product image on desktop.
- Preserved existing cart, checkout, contact enquiry and franchise enquiry handlers.

## Run locally
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Create a production build: `npm run build`

The `dist/` folder is intentionally not included because it would otherwise contain the old, unmodified build. Rebuild it after installing dependencies.
