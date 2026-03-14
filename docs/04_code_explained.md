# 🔬 04 — Line-by-Line Code Explanations

The most important files explained in extreme depth, as if teaching a beginner to become an engineer.

---

## 📄 `src/app/layout.tsx` — The Root Layout

```tsx
// This directive tells Next.js: "This file runs on the SERVER."
// Without it, it's a React Server Component by default.
// Server components can't use browser APIs like window or document.
import type { Metadata } from "next";
```
> **Category:** Module Import | **Concept:** TypeScript Type Import  
> **What:** We are importing just the *type definition* for Metadata, not actual code.  
> **Why:** TypeScript uses types to verify we are giving the correct shape of data. If we set `metadata.title = 123`, TypeScript would warn us: "title should be a string, not a number."  
> **What breaks if removed:** The `Metadata` type annotation below would error.

---

```tsx
import { Inter } from "next/font/google";
```
> **Category:** Font Loading  
> **What:** We import the Inter typeface directly from Google Fonts, but through Next.js's special wrapper.  
> **Why Next.js's wrapper instead of a `<link>` tag?** Next.js's font module downloads the font at **build time** and self-hosts it. A regular `<link rel="stylesheet" href="fonts.google.com/...">` makes a second network request to Google's servers every time a user loads the page — this is slower AND sends user IP data to Google. Next.js's approach is faster and more private.

---

```tsx
import { CustomCursor } from "@/components/CustomCursor";
```
> **What:** `@/` is an alias for the `src/` folder. It is configured in `tsconfig.json`.  
> **Why:** Without it, we'd have to write `../../components/CustomCursor` with complex relative paths that break when files are moved. The `@` alias always points to `src/`, no matter where the importing file is.

---

```tsx
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```
> **What:** We configure the Inter font. `subsets: ["latin"]` means "only download the Latin alphabet characters, not Cyrillic, Greek, etc." — this keeps the font file small.  
> `variable: "--font-inter"` creates a CSS variable. We can then use `var(--font-inter)` anywhere in CSS.  
> **Performance impact:** Downloading only the Latin subset reduces font size from ~400KB to ~20KB.

---

```tsx
export const metadata: Metadata = {
  title: "Lumina Dental | Premium Experience",
  description: "World-class dental care..."
};
```
> **Category:** SEO (Search Engine Optimisation)  
> **What:** This object defines the content of the `<title>` and `<meta name="description">` tags in the HTML `<head>`.  
> **Why it matters:** Google reads these tags when indexing your site. The `title` appears as the clickable blue link in search results. The `description` appears as the grey text below it.  
> **What breaks if removed:** The browser tab shows "localhost:3000" and Google doesn't know what to title your page.

---

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
```
> **Category:** Component Architecture  
> **What:** `RootLayout` is the parent wrapper for every page. `children` is a special React prop that means "whatever is inside this component in JSX".  
> `Readonly<{...}>` means the props cannot be mutated — TypeScript will error if you try.  
> **How it works:** In Next.js, `layout.tsx` wraps around `page.tsx`. So the home page's `<HeroIntro>` becomes `children` here.  
> Think of it like a picture frame (layout) that holds different artworks (pages).

---

```tsx
  return (
    <html lang="en" className="dark scroll-smooth">
```
> **What:** The root HTML element. `lang="en"` tells screen readers and browsers: "this page is in English." `scroll-smooth` is a Tailwind class that enables CSS `scroll-behavior: smooth` — this makes anchor links scroll smoothly instead of jumping.

---

```tsx
      <body className={`${inter.variable} font-sans antialiased bg-black`}>
```
> **What (breaking it down piece by piece):**
> - `${inter.variable}` — injects the CSS variable `--font-inter` onto the body, making the Inter font available to all children
> - `font-sans` — Tailwind class that sets `font-family: var(--font-inter), sans-serif`
> - `antialiased` — enables font smoothing on Mac/Linux for crisper text rendering
> - `bg-black` — sets the background colour to black (Tailwind's `#000000`)
> **Why black and not dark grey?** Our main page has a `#050505` (nearly-black) background. Setting the body to `#000000` ensures there's no "flash of white" while the page loads.

---

## 📄 `src/components/ScrollyCanvas.tsx` — The 3D Animation Engine

This is the most technically complex file in the project.

```tsx
"use client";
```
> **Category:** Next.js Directive  
> **What:** Marks this file as a **Client Component**. This means React renders it in the browser, not on the server.  
> **Why needed:** This file uses `window.scrollY`, `useEffect`, `useRef`, and Canvas API — all of which are **browser-only APIs**. They don't exist on the server. Without `"use client"`, Next.js would try to run this on the server and crash.  
> **Rule of thumb:** Any component that uses `window`, `document`, `addEventListener`, `useEffect`, or interactivity needs `"use client"`.

---

```tsx
const imagesRef = useRef<HTMLImageElement[]>([]);
```
> **Category:** React Refs  
> **What:** `useRef` creates a container that holds a value WITHOUT triggering a re-render when it changes.  
> **Why use it instead of `useState`?** If we stored 120 images in `useState`, React would re-render the whole component every time an image loaded — causing 120 re-renders. `useRef` stores the images silently, invisibly, with zero re-renders.  
> `HTMLImageElement[]` is a TypeScript type annotation: "this ref will hold an array of HTML Image objects."

---

```tsx
const canvasRef = useRef<HTMLCanvasElement>(null);
```
> **What:** A ref pointing to the actual `<canvas>` HTML element. Without this, we have no way to call Canvas drawing methods in JavaScript.  
> **How refs work with DOM elements:** When you write `<canvas ref={canvasRef} />`, React stores a reference to that DOM element inside `canvasRef.current`. You can then call `canvasRef.current.getContext('2d')` to get the drawing API.

---

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"]
});
```
> **Category:** Scroll Tracking  
> **What:** `useScroll` from Framer Motion watches scroll position. It returns `scrollYProgress` — a MotionValue that goes from **0** (top of container) to **1** (bottom of container).  
> `offset: ["start start", "end end"]` defines: "start tracking when the container's START edge reaches the viewport's START edge; stop tracking when the container's END edge reaches the viewport's END edge."  
> **Result:** As the user scrolls through the 600vh container, `scrollYProgress` precisely moves from 0 → 1.

---

```tsx
useEffect(() => {
  const images: HTMLImageElement[] = [];
  let loadedCount = 0;

  for (let i = 1; i <= 120; i++) {
    const img = new Image();
    img.src = `/sequence/frame_${String(i).padStart(3, "0")}.png`;
```
> **Category:** Asset Preloading | Performance Optimization  
> **What:** We loop 120 times and create a new `Image` object each time.  
> `String(i).padStart(3, "0")` — converts the number `1` to `"001"`, `12` to `"012"`, `120` to `"120"`. This matches the filename format `frame_001.png`.  
> **Why preload everything at startup?** If we loaded each frame on demand, there'd be a noticeable stutter as the image downloads. Preloading all 120 images upfront means they're already in memory — switching frames is instant (sub-millisecond).

---

```tsx
    img.onload = () => {
      loadedCount++;
      if (loadedCount === 120) {
        drawFrame(0); // draw the very first frame once everything is ready
      }
    };
```
> **What:** `img.onload` is a callback that runs when the image has finished downloading. We count loaded images. Once all 120 are loaded, we draw the first frame to the canvas.  
> **Why we wait for ALL images:** If we started playing the animation before all frames were loaded, some frames would appear blank/broken.

---

```tsx
const drawFrame = useCallback((index: number) => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
```
> **Category:** Canvas API | Performance with useCallback  
> **What:** `getContext("2d")` gives us the **2D rendering context** — the object with all drawing methods (`drawImage`, `fillRect`, `strokeText`, etc.).  
> `useCallback` memoizes (caches) the function so it isn't recreated on every render. Without it, the function would be a different object every render, causing performance issues.

---

```tsx
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imagesRef.current[index], 0, 0, canvas.width, canvas.height);
```
> **What (line 1):** `clearRect` wipes the entire canvas blank. Without this, each new frame would be drawn *on top* of the previous frame — they'd stack and overlap.  
> **What (line 2):** `drawImage` paints the specified image onto the canvas, stretched to fill the full canvas dimensions.  
> **The core of the whole animation:** These two lines, running on every scroll tick, create the illusion of 3D video.

---

```tsx
return (
  <div ref={containerRef} className="relative" style={{ height: "600vh" }}>
```
> **What:** The container that is **600 viewport heights tall** (600vh). This is the "scroll runway" — the user must scroll through this entire distance for the animation to complete. The taller this div, the slower the animation plays relative to scroll speed.  
> **Why inline style instead of Tailwind?** Tailwind doesn't have a pre-built `h-[600vh]` utility by default. The `style` prop lets us set arbitrary values.

---

```tsx
    <div className="sticky top-0 h-screen overflow-hidden">
```
> **Category:** CSS Sticky Positioning — THE MOST CRITICAL CSS IN THE PROJECT  
> **What:** `sticky` keeps an element "glued" to a position while you scroll through its parent.  
> `top-0` means: "stick to the very top of the viewport."  
> `h-screen` means: "be exactly as tall as the viewport (100vh)."  
> **How it creates the scrollytelling effect:**
> - The parent `div` is 600vh tall (the full scroll track)
> - The child `div` is `sticky top-0` — it glues to the top of the screen
> - As the user scrolls through the 600vh, the sticky div stays visible
> - **CRITICAL BUG NOTE:** ANY parent element having `overflow: hidden` will break sticky. This was the original bug that made the animation too short! `overflow-hidden` on a parent silently disables `position: sticky` on children.

---

## 📄 `src/components/CustomCursor.tsx` — The Liquid Cursor

```tsx
const cursorX = useMotionValue(-100);
const cursorY = useMotionValue(-100);
```
> **What:** We initialise both values at `-100` (off-screen, top-left corner), so the cursor orb is invisible before the user moves their mouse.  
> **Why MotionValue instead of useState?**  
> `useState` triggers a full React re-render every time it changes. The cursor updates 60+ times per second on mouse move. That would mean 60+ re-renders per second — catastrophic for performance.  
> `useMotionValue` updates the CSS transform directly, bypassing React's render cycle entirely. This is orders of magnitude more efficient.

---

```tsx
const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
```
> **Category:** Physics Simulation  
> **The spring analogy:** Imagine a ball attached to a rubber band. The rubber band pulls the ball toward your cursor.  
> - `stiffness: 400` — how tight/strong the rubber band is. Higher = snappier
> - `damping: 25` — how much air resistance slows the oscillation. Higher = less "bounciness"
> - `mass: 0.1` — how heavy the ball is. Lower = faster response, lighter feel
> These values produce a cursor that feels extremely responsive but with just a tiny amount of satisfying weight.

---

```tsx
const moveCursor = (e: MouseEvent) => {
  cursorX.set(e.clientX - 10);
  cursorY.set(e.clientY - 10);
};
```
> **What:** `e.clientX` and `e.clientY` are the raw pixel coordinates of the mouse from the top-left of the viewport.  
> We subtract `10` because the cursor div is `20x20` pixels wide. Without the offset, the top-left corner of the cursor div would be at the mouse pointer, not the centre. Subtracting half-width and half-height centres it.

---

```tsx
className="... mix-blend-difference ..."
```
> **Category:** CSS Blend Modes — The Magic of This Cursor  
> **What:** `mix-blend-difference` is a CSS property that changes how the element's colours blend with whatever is behind it.  
> **How "difference" works:** The browser takes each pixel color of the cursor (white = `#ffffff`) and subtracts it from the color of whatever's behind it.
> - White cursor over black background: `255 - 0 = 255` → **white** (cursor is visible)
> - White cursor over white text: `255 - 255 = 0` → **black** (cursor becomes dark)
> The cursor literally **inverts** the colors beneath it, guaranteeing it's always 100% visible regardless of background.  
> This is why famous agency websites use this effect — it's elegant AND functional.

---

## 📄 `src/app/globals.css` — Global Styles

```css
@import "tailwindcss";
```
> **What:** Imports all of Tailwind's utility classes into this CSS file.  
> **Note:** The `@theme inline { ... }` rule below this is a Tailwind v4 experimental feature for defining theme tokens. It may show a lint warning in some IDEs since v4 syntax isn't fully finalised in all tools.

---

```css
nextjs-portal {
  display: none !important;
}
```
> **What:** The `nextjs-portal` element is a **custom HTML element** (Web Component) that Next.js injects into the DOM during development to show the build state indicator (the "N" logo).  
> `display: none !important` hides it completely.  
> **Why is this safe?** This component only exists during `npm run dev`. In production (`npm run build`), Next.js never injects it, so this rule has zero effect in production.
