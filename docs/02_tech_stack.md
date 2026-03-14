# 🛠️ 02 — Tech Stack Deep Dive

Every single tool explained: What, Why, How, Alternatives.

---

## 1. ⚡ Next.js 14 (App Router)

### What is it?
Next.js is a **React framework** built by Vercel. Think of React as the engine of a car — it handles how your UI components render. Next.js is the full car: it adds routing, server-side rendering, performance optimization, and deployment tooling on top of React.

### Why are we using it?
- **File-based routing** — pages are just files in a folder, no complex config needed
- **Server-Side Rendering (SSR)** — the page HTML is generated on the server before being sent to the user, which is faster and better for SEO
- **The App Router** (introduced in Next.js 13) allows a modern, nested layout system

### How does it work internally?
1. You write a React component and save it inside the `app/` folder
2. Next.js reads the **file path** of that component and turns it into a URL route automatically
3. When a user visits a URL, Next.js decides: "Should I render this on the server first? Or on the client?"
4. It packages your code with **Turbopack** (the replacement for Webpack) for incredibly fast builds

### What problem does it solve?
Plain React gives you a blank browser page that loads JavaScript and then renders the UI (called **Client-Side Rendering**). This is slow for first loads and invisible to Google's search crawlers.

Next.js solves this by pre-rendering pages on the server so that users see content instantly.

### What if we didn't use it?
We would use plain React + a manual router (like React Router). We'd lose:
- Automatic routing
- Server-side rendering / fast first load
- Built-in image optimisation
- Easy deployment on Vercel

### Alternatives

| Tool | When to use instead |
|------|-------------------|
| **Vite + React** | For simple SPAs (Single Page Apps) where SEO doesn't matter |
| **Remix** | If you need heavy form handling and server mutations |
| **Astro** | If the site is mostly static content with minimal interactivity |

### How it fits in our architecture
Next.js is the **entire application shell**. Everything else (components, styles, animations) lives inside it.

---

## 2. ⚛️ React 18

### What is it?
React is a JavaScript **UI library** made by Meta (Facebook). Its core concept: instead of manipulating the page HTML directly, you describe what the UI *should look like*, and React figures out what to change.

### Key Concept: Virtual DOM
> **Virtual DOM** — React keeps a lightweight copy of the real HTML page in memory (called the Virtual DOM). When something changes, it compares the old copy to the new copy and only updates the actual page with the differences. This is called **reconciliation**, and it's what makes React incredibly fast.

### Why are we using it?
Because Next.js is built on React — they are inseparable. React handles all the component rendering, state management, and interactivity on the page.

### How does it work?
- You write **components** — reusable pieces of UI (like `<HeroIntro />`, `<Projects />`)
- Components receive data via **props** (arguments)
- They can store their own data in **state** using `useState`
- When state changes, React automatically re-renders only the affected components

### What if we didn't use it?
We'd write vanilla JavaScript and manually `document.querySelector()` every element we want to change. For 10 components that might be fine. For 50+ components it becomes an unmaintainable mess.

---

## 3. 🎨 Tailwind CSS

### What is it?
Tailwind is a **utility-first CSS framework**. Instead of writing CSS in `.css` files, you apply pre-built design classes directly on your HTML elements.

```html
<!-- Traditional CSS approach -->
<div class="hero-title">Design Your Smile</div>

<!-- Tailwind approach -->
<div class="text-9xl font-black text-white uppercase tracking-tighter">Design Your Smile</div>
```

### Why are we using it?
- **Speed** — No context switching between HTML and CSS files
- **No naming hell** — You don't need to invent class names like `.hero-section-inner-wrapper`
- **Built-in design system** — Consistent spacing, colours, and font sizes out of the box

### How does it work internally?
1. You add utility classes to your elements
2. At build time, Tailwind scans your code files
3. It generates **only the CSS that is actually used**, discarding everything else
4. This results in a tiny, near-zero-waste CSS file in production

### What problem does it solve?
Traditional CSS tends to grow into a tangled, hard-to-maintain mess over time. Tailwind eliminates "dead CSS" and ensures every style is co-located with the element it affects.

### Alternatives

| Tool | When to use instead |
|------|-------------------|
| **Vanilla CSS / CSS Modules** | When you need complex animations or precise art direction |
| **Styled Components** | When you want CSS-in-JS with JavaScript variables |
| **Bootstrap** | When you want pre-built UI components, not a utility system |

---

## 4. 🎞️ Framer Motion

### What is it?
Framer Motion is a **production-ready animation library** for React. It takes the complexity out of CSS animations and replaces it with a beautifully simple, declarative API.

### Why are we using it?
- It handles **spring physics** — animations that feel physically natural (like a real object decelerating)
- It provides `useScroll` and `useTransform` — hooks that turn scroll position into animation values
- It powers the custom cursor's smooth trailing effect

### Key Concepts Used in This Project

**`useMotionValue`**: A special React value that can change without causing a re-render. Perfect for things that update 60 times per second (like cursor position).

```tsx
const cursorX = useMotionValue(-100); // starts off-screen
cursorX.set(e.clientX);              // instantly updates on mouse move
```

**`useSpring`**: Takes a MotionValue and applies spring physics to it. This is why the cursor feels "elastic" and smooth rather than robotically precise.

```tsx
const smoothX = useSpring(cursorX, { stiffness: 400, damping: 25 });
// stiffness: how tense the spring is (higher = faster response)
// damping: how quickly it stops bouncing (higher = less oscillation)
```

**`useScroll` / `useTransform`**: Converts the page's scroll position (a number from 0 to 1) into any other value you want (like Y position for parallax).

```tsx
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
// scrollYProgress goes from 0 → 1 as user scrolls
// y goes from 0px → -200px (moves upward = parallax)
```

**`whileInView`**: Triggers an animation exactly when an element enters the user's viewport (the visible screen area).

### What if we didn't use it?
We'd write complex CSS `@keyframes` and JavaScript `requestAnimationFrame` loops manually. The spring physics alone would take hundreds of lines of math to replicate.

### Alternatives

| Tool | When to use instead |
|------|-------------------|
| **GSAP** | For extremely complex, timeline-based animations (e.g., full-screen scroll stories) |
| **CSS Transitions** | For simple hover effects and basic transitions |
| **React Spring** | Very similar to Framer Motion, slightly lower-level API |

---

## 5. 🖼️ HTML5 Canvas

### What is it?
The HTML `<canvas>` element is a drawing surface built directly into the browser. Unlike regular HTML elements (`<div>`, `<img>`), Canvas gives you a blank pixel grid and lets you draw anything on it using JavaScript.

### Why are we using it?
To render **the 120-frame 3D animation sequence**. We preload 120 images, and based on the user's scroll position, we instantly draw the correct frame onto the canvas — creating the illusion of a smooth 3D video scrubbing experience.

### How does it work internally?
1. We load all 120 PNG images into memory at page start
2. We listen to scroll events
3. We calculate which frame corresponds to the current scroll percentage:
   ```js
   const frameIndex = Math.floor(scrollProgress * 120);
   ```
4. We call `ctx.drawImage(images[frameIndex], 0, 0)` — this paints that image onto the canvas instantly
5. Because it updates on every scroll tick, it appears like a smooth animation

### What problem does it solve?
You cannot scrub through a standard HTML `<video>` element smoothly based on scroll position — browsers don't allow precise frame-level video seeking. Canvas gives us complete pixel-level control, so we can jump to any frame in under 1 millisecond.

### What if we didn't use it?
We'd have to use a video element (which doesn't scrub smoothly) or a CSS-based animation (which can't handle 120 detailed frames efficiently).

---

## 6. 🧩 Lucide React

### What is it?
A library of **clean, consistent, open-source SVG icons** as React components.

### Why are we using it?
Instead of downloading icon image files or embedding raw SVG code, we import self-contained icon components:
```tsx
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
<Phone className="w-5 h-5 text-amber-500" />
```

### Alternatives
- **Heroicons** — Made by the Tailwind CSS team, very similar quality
- **React Icons** — Huge library with thousands of icons from many sets
- **Font Awesome** — Popular but much heavier to load

---

## 7. 🔤 Inter Font (Google Fonts)

### What is it?
Inter is a professional, humanist sans-serif typeface designed specifically for screens and digital interfaces. It was designed by Rasmus Andersson and is used by companies like Linear, Vercel, and many premium SaaS products.

### Why are we using it?
- Extremely legible at both massive display sizes and tiny body text sizes
- Every character has perfect spacing optimised for screens
- It signals "premium, modern, digital-native" to the viewer

### How it connects
Next.js has built-in font optimisation via `next/font/google`. Instead of loading the font from Google's servers (which adds a network request), Next.js downloads and self-hosts it automatically at build time — making it faster and more private.
