# AURA — boutique digital

Refinement of the existing React commerce demo, not a replacement application.

## Direction

Warm ivory and ink with dusty rose for personalized discovery and champagne for the Arabian selection. Avoid black/gold luxury shorthand. Photography and an editorial masthead lead; commercial controls stay unambiguous. Existing Manrope/Public Sans remain the operating typography. Instrument Serif is limited to wordmarks and a single editorial product feature.

## System

Store-specific colors, type roles, categories, brands and contacts live in `src/config/store.ts`. The Layout maps them to CSS variables. Spacing and motion tokens live in `src/atelier.css`. Card radius 14px, control radius 8–10px, utility pills only where appropriate. Product prices use tabular numerals. Header/hero commerce ledge are the principal glass surfaces; the catalog stays flat.

## Rhythm

Photographic masthead → designed brand navigation → four-column commerce → asymmetric categories → warm horizontal Arabian selection → step-based finder → editorial notes → new arrivals → gifting → support → typographic footer.

## Motion

One hero image settle and commerce mask. Hover uses interruptible springs. Finder transitions convey progression. Reveal defaults remain visible rather than hiding all content. Respect reduced motion, and only load the existing 3D bottle when the finder approaches the viewport. No external HDR assets.

## Mobile

Two product columns with permanently available add/favorite actions. Compact five-category composition. Finder illustration sits beside a compact introduction, not in a giant empty canvas. Full-width choice controls and 44px touch targets for core actions. Catalog filters use a bottom sheet. Product gallery is the same illustrative image with an explicit close-up control, not unrelated bottles.

## Truth / constraints

22 original product records preserved. Current photos are generic demo illustrations, not official brand/product photography. Prices, contact details and shipping messaging are demo values. The finder filters existing aroma and occasion tags; no AI claim. The current checkout is a demonstration, not a real payment integration.

## Validation

390, 768, 1440px plus 1920px. Home, listing, detail, finder, favorites, search, cart, keyboard dismissal, reduced-motion static path, URL category changes and production build.
