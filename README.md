# Platform Engine — Influencer Search Platform (Antigravity Core)

A high-performance web platform based on the **Antigravity** architecture, designed to browse, filter, and curate top content creators across major social platforms (Instagram, YouTube, and TikTok). This system features custom multi-layered ambient backdrop themes, fluid micro-interactions, and an interactive list state selection framework.

### 🔗 Live Project Link
* **Live Deployment Url:** [https://platform-engine-antigravity.vercel.app](https://platform-engine-antigravity.vercel.app)

---

## 🛠️ Tech Stack & Architecture

* **Design Pattern Core:** Antigravity UI Style Specifications
* **Frontend Framework:** React with TypeScript (configured for strict module type checking)
* **Styling Engine:** Tailwind CSS
* **State Management:** Zustand (`useInfluencerStore`) for reactive searching, platform switching, and real-time collection selection
* **Core Font:** Geist (Premium geometric sans-serif aesthetic matched to Antigravity standards)

---

## 🚀 Recent Architecture Upgrades

We cleaned and optimized the entire project codebase to match Antigravity style guide frames, resolve layout constraints, and guarantee zero compilation errors during production builds:

### 1. 🎨 Visual & Design Enhancements
* **Premium Typography:** Integrated the modern **Geist** font engine to achieve the distinctive clean, sleek UI look.
* **Ambient Aurora Backdrop:** Implemented custom multi-layered radial glow gradients inside the global container to create an active glowing background layout.
* **Text Reveal Timelines:** Integrated smooth CSS keyframe entries (`fadeInUp`) that softly animate layout components into view upon application load.

### 2. 🎯 Micro-Interactions & Brand Hovers
* **Dynamic Control Filters:** Updated platform navigation buttons to automatically transform into their native brand colors (**Instagram Purple, YouTube Red, TikTok Cyan**) with glowing drop shadows when hovered over.
* **Interactive Card Actions & List Curations:** Synchronized the exact same premium branding animations onto individual creator "Add to List" card actions based on their social network.
* **Dedicated Selection Dashboard:** Engineered a separate, real-time tracking panel ("Selected List") to manage curated profiles with native state removal handlers.

### 3. 🛡️ Critical Production Bug Fixes
* **Strict Type Compilation (`ts(1484)`):** Resolved module runtime faults by enforcing strict type-only imports (`import { type ReactNode }`) required by the project's strict `verbatimModuleSyntax` rules.
* **Logical Guard Optimization (`ts(2367)`):** Fixed a conditional check block inside the rendering filter loop by low-casing active platform evaluation states. This safely bypasses strict string literal type overlap conflicts.

---

## 📁 Key Project Files Optimized

* 📄 `src/components/Layout.tsx` — Controls global layout structures, type-safe imports, container wrapping metrics, and page fade-in entry timelines.
* 📄 `src/components/PlatformFilter.tsx` — Handles active platform selection, input query searches, and dynamic brand hover styles safely without type conflicts.
* 📄 `src/index.css` — Centralizes global key utility rules, typography imports, keyframe maps, and core background variables.
* 📄 `src/components/AnimatedBackground.tsx` — Computes the high-performance gradient rendering configurations smoothly behind application card windows.
* 📄 `src/components/AnimatedWrapper.tsx` — Acts as the declarative entry controller structure deploying reveal keyframes on internal DOM clusters.
* 📄 `src/store/useInfluencerStore.ts` — Runs the global application state machine, seamlessly handling search input mutations, switching filters, card additions, list removals, and state adjustments.
