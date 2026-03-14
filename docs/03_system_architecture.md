# 🏗️ 03 — System Architecture

A senior engineer's breakdown of every layer of this application.

---

## 🗺️ Architecture Overview

```
┌────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                     │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  React UI    │  │ Framer Motion│  │  HTML5 Canvas    │  │
│  │  Components  │  │  Animations  │  │  (3D Sequence)   │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│           │                │                  │             │
│           └────────────────┴──────────────────┘            │
│                            │                               │
│                    ┌───────▼──────┐                        │
│                    │  Next.js App │                        │
│                    │   Router     │                        │
│                    └───────┬──────┘                        │
└────────────────────────────│───────────────────────────────┘
                             │ (HTML/CSS/JS files served)
                    ┌────────▼──────┐
                    │  Next.js      │
                    │  Server (SSR) │
                    └───────────────┘
                             │ (Static assets)
                    ┌────────▼──────┐
                    │  /public/     │
                    │  sequence/    │
                    │  (120 PNGs)   │
                    └───────────────┘
```

This is a **frontend-only architecture**. There is no database, no backend API. Everything lives in the browser and the Next.js server serves only static HTML and assets.

---

## 🧱 Layer-by-Layer Breakdown

### 🖥️ Layer 1: Client Layer (The Browser)

This is what the **user sees and interacts with**.

When a user opens the website, the browser:
1. Receives the **pre-rendered HTML** from the Next.js server
2. Downloads **JavaScript bundles** (React, Framer Motion code)
3. **Hydrates** the page — this means React "wakes up" the pre-rendered HTML and attaches event listeners to it
4. From this point forward, the page is fully interactive

> 💡 **Hydration** is a critical concept: the page first appears as plain HTML (fast), then React takes over and makes it interactive (smart). This gives us the best of both worlds — fast first load AND rich interactivity.

**What lives here:**
- All React components (`HeroIntro`, `ScrollyCanvas`, `Projects`, etc.)
- All Framer Motion animations (cursor, fade-ins, parallax)
- The Canvas renderer for the 3D sequence
- User event handlers (scroll, mouse move, click)

---

### 🌐 Layer 2: Server Layer (Next.js)

This project uses Next.js's **Static Site Generation (SSG)** approach for the home page. This means:

1. At **build time** (`npm run build`), Next.js renders all pages to static HTML files
2. These files are stored and served from a **CDN edge** like Vercel's network
3. When a user requests the page, they receive the pre-built HTML instantly — no computation needed on the server per request

> 💡 **CDN (Content Delivery Network)** — A network of servers distributed around the world. Your HTML and files are copied to the server nearest to each user. A user in Kuwait gets data from a server in the Middle East, not from a server in New York. This makes pages load 3-10x faster.

**What the server does:**
- Serves the initial HTML page (pre-rendered)
- Serves the 120 PNG frames from `/public/sequence/`
- Serves CSS, JavaScript bundles, fonts

**What the server does NOT do:**
- No user authentication
- No database queries
- No form processing (Contact form not wired to backend — future feature)

---

### 📁 Layer 3: Static Assets Layer

The `/public/` folder is a special directory in Next.js. Anything inside it is served **directly** as a static file, just like a traditional web server.

```
public/
└── sequence/
    ├── frame_001.png
    ├── frame_002.png
    ├── ...
    └── frame_120.png
```

URLs are automatically mapped:
- `/public/sequence/frame_001.png` → `http://localhost:3000/sequence/frame_001.png`

This is how the Canvas animation loads all 120 frames — it requests them from `/sequence/frame_XXX.png`.

---

### 💬 Layer 4: Communication Layer (Data Flow)

Since there is no backend database, there is no traditional "API communication". Instead, data flows through the component tree via **props** and **React state**.

**Scroll Data Flow (the most critical flow in this app):**

```
User Scrolls Mouse Wheel
        │
        ▼
Browser fires "scroll" event
        │
        ▼
useScroll() hook (Framer Motion)
captures scrollYProgress (0 → 1)
        │
        ├──────────────────────────────────────┐
        ▼                                      ▼
ScrollyCanvas.tsx                       Overlay.tsx
Canvas reads scroll value           Text sections fade in/out
Maps it to frame index (0-120)      based on scroll position
Draws frame to <canvas>
        │
        ▼
User sees the 3D animation playing
as they scroll
```

**Mouse Data Flow (Custom Cursor):**

```
User Moves Mouse
        │
        ▼
Browser fires "mousemove" event
        │
        ▼
cursorX.set(e.clientX)   ← MotionValue updates instantly
cursorY.set(e.clientY)
        │
        ▼
useSpring() smooths the raw values
using spring physics (damping, stiffness)
        │
        ▼
motion.div reads smoothed x/y values
AND re-renders at 60fps
        │
        ▼
Cursor orb appears to "float" behind
mouse with beautiful inertia
```

---

## 🗂️ File & Folder Structure Explained

```
portfolio/
├── src/
│   ├── app/                    ← Next.js App Router folder
│   │   ├── layout.tsx          ← Root layout: applies to ALL pages
│   │   │                         (fonts, metadata, global components like Cursor)
│   │   ├── page.tsx            ← The "/" home page component
│   │   └── globals.css         ← Global CSS (resets, body styles, custom rules)
│   │
│   └── components/             ← Reusable UI building blocks
│       ├── HeroIntro.tsx       ← First visible section on load (title + CTA)
│       ├── ScrollyCanvas.tsx   ← The 3D animation engine + sticky container
│       ├── Overlay.tsx         ← Text that floats over the canvas during scroll
│       ├── About.tsx           ← Doctor introduction section
│       ├── Stats.tsx           ← Parallax numbers section
│       ├── Projects.tsx        ← Services grid (4 cards)
│       ├── Testimonials.tsx    ← Patient reviews section
│       ├── CallToAction.tsx    ← Contact info + location map card
│       └── CustomCursor.tsx    ← The mix-blend-difference cursor tracker
│
├── public/
│   └── sequence/               ← 120 PNG frames for the canvas animation
│
├── docs/                       ← YOU ARE HERE (educational documentation)
│
├── next.config.ts              ← Next.js configuration file
├── tailwind.config.ts          ← Tailwind configuration file
└── package.json                ← Project dependencies and scripts
```

---

## 📍 Where State Lives

In this project, state is very minimal because it's a display-only portfolio:

| State | Component | Type | Purpose |
|-------|-----------|------|---------|
| `isHovered` | `CustomCursor.tsx` | `useState` | Tracks if cursor is over a clickable element |
| Scroll progress | `ScrollyCanvas.tsx` | Framer Motion `useScroll` | Track page scroll 0→1 |
| `imagesLoaded` | `ScrollyCanvas.tsx` | `useRef` | Stores 120 preloaded Image objects |
| Animation frame values | `Stats.tsx` | `useTransform` | Derived parallax y-positions |

---

## 🔐 Security Considerations

This site is **read-only** — no user input, no accounts, no database. Security risk is minimal, but:

| Risk | Status | Notes |
|------|--------|-------|
| XSS (Cross-Site Scripting) | ✅ Not applicable | No user input or dynamic content from users |
| API Key exposure | ✅ Not applicable | No APIs used |
| Image hotlinking | ⚠️ Minor | Unsplash images are loaded from external URLs. Unsplash could theoretically block them. Solution: download & self-host images in `/public/` |
| DDoS | ⚠️ If self-hosted | On Vercel, handled automatically with rate limiting |

---

## 📈 Scaling to 10,000 Users

Because this is a **fully static site** (no server computation per request), it scales effortlessly.

**Current architecture can handle millions of users** with no changes, because:
1. Vercel distributes the static HTML to CDN edge nodes globally
2. Each user's request is served from their nearest edge node in milliseconds
3. No database queries occur, so there is no bottleneck

To add dynamic features (booking system, contact form) and scale them:
- Add a serverless API route (`app/api/book/route.ts`)
- Use a managed database like **PlanetScale** or **Supabase**
- Use email services like **Resend** or **SendGrid** for confirmations

---

## 🚀 Production Deployment (How This Is Deployed)

### Option 1: Vercel (Recommended — made by Next.js creators)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy with one command from project folder
vercel
```
Every push to your GitHub `main` branch automatically triggers a new deployment. Zero configuration.

### Option 2: Netlify
Similar to Vercel. After connecting GitHub, it auto-deploys on every push.

### Option 3: Self-hosted (e.g., VPS / DigitalOcean)
```bash
npm run build     # Generates optimized static files in /.next
npm run start     # Starts the production server
```
Run behind **Nginx** as a reverse proxy with SSL certificates from **Let's Encrypt**.

---

## 🧩 Frontend vs. Backend Responsibilities

| Responsibility | Frontend (This Project) | Backend (Future Addition) |
|--------------|----------------------|------------------------|
| Display UI | ✅ All React components | — |
| Animations | ✅ Framer Motion | — |
| Routing | ✅ Next.js App Router | — |
| Booking form submission | ❌ Not yet | Would use API Route |
| Storing appointments | ❌ Not yet | Would use PostgreSQL / Firestore |
| Email confirmation | ❌ Not yet | Would use Resend/SendGrid |
| Authentication | ❌ Not needed | Would use NextAuth.js |
