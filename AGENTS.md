# Lakbay Web Frontend - AI Agents Guide

This document defines the architecture, established coding patterns, and UI/UX design rules specifically for the `lakbay-web` frontend. Use these principles to maintain consistency and "vibe" when generating or refactoring code for this project.

## Tech Stack Overview
- **Framework:** Vue.js 3 (Composition API)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** Vue Router 4
- **HTTP Client:** Axios


## Agent Maintenance
- **Self-Correction:** After completing a significant feature or structural change, the agent must evaluate if this `AGENTS.md` is still accurate.
- **Update Protocol:** If the code evolves (e.g., new folder, new primary color, new dependency), the agent should proactively suggest a specific "diff" or update for this file to keep the project context current.


---

## 1. Directory Structure

```text
lakbay-web/
├── public/                 # Static non-compiled assets (favicons, etc.)
├── src/
│   ├── assets/             # CSS (Tailwind index) and static JavaScript data files
│   ├── components/         # Reusable UI components
│   │   ├── modals/         # Overlay components (e.g., NewTrip.vue, AiItinerary.vue, OneDayPlan.vue)
│   │   ├── trip_tabs/      # Sub-components specific to the TripDetails view
│   │   ├── TopNavbar.vue   # Main application navigation
│   │   └── MainFooter.vue  # Main application footer
│   ├── router/             # Vue Router logic and Navigation Guards
│   │   └── index.ts        # Router definition
│   ├── views/              # Full-page routing components (e.g., PlanView, Authentication)
│   ├── App.vue             # Root layout component
│   └── main.ts             # Vue app entry point and plugin registration
├── package.json            # Dependencies and NPM scripts
└── vite.config.ts          # Vite bundler configuration
```

---

## 2. Coding Patterns & Architecture

### Vue Components
- **Composition API First:** All single-file components (`.vue`) must use the `<script setup>` tag.
- **State Management:** Reactive state is primarily handled functionally at the component level using `ref()` and `computed()`. Cross-component state relies on event emission/props or `localStorage` for semi-persistent states (like auth tokens). Currently, we actively avoid heavy global stores (like Pinia) unless the local `ref` flow becomes too nested.
- **Handling Modals:** 
  - Modals (found in `src/components/modals/`) are treated as reusable drop-ins. 
  - They should expose styling and behavior but rely on strict open/close booleans passed dynamically from the parent component.
  - E.g., `const activeModal = ref(null)` in `PlanView.vue`.

### Routing and Navigation Guards
- **Setup:** Defined in `src/router/index.ts` using `createWebHistory()`.
- **Authentication:** Unauthenticated users are protected via a `router.beforeEach` guard. The logic tracks the `'access_token'` value in the browser's `localStorage`.
- **UX Rule:** `App.vue` checks the route name against an array (`hideNavScreens`) to conditionally render or hide the `TopNavbar` and `MainFooter` on screens where they aren't needed (like `/login`).

### API & Backend Communication
- **Axios:** We execute all REST calls to the FastAPI backend (typically via `http://127.0.0.1:8000/api/...`) via asynchronous Axios procedures.
- **External AI Integrations:** Direct LLM calls (e.g., Gemini 2.5 Flash) are executed on the frontend using Axios. We primarily use OpenRouter as a proxy (`VITE_OPENROUTER_API_KEY`) to bypass native API quota restrictions. Ensure sensitive keys are securely managed in `.env` using the Vite prefix.
  - **Prompt Engineering & Limits:** Always enforce strict schema boundaries and brevity in your prompts (e.g., "strictly under 25 words"). To prevent massive JSON outputs from truncating mid-generation, explicitly set `max_tokens` (e.g., 8000) in the API payload.
- **Mapping & Geolocation:** We use `leaflet` for interactive maps. Rather than relying on external geocoding APIs, we prompt the AI to generate accurate `lat` and `lng` floats for every destination in its JSON response, which we then plot using Leaflet markers and polylines.
- **Error Handling:** Use `try/catch` blocks inside of your `async` functions. Expect standard FastApi responses (like `error.response.data.detail`) to relay clear, non-cryptic error messages to the user interface.

---

## 3. UI Aesthetics & "Vibe Coding" Best Practices

Keep the user interface feeling premium, dynamic, and responsive:

- **Tailwind Native:** Stick exclusively to Tailwind CSS v4 utility classes. Avoid `<style scoped>` CSS blocks whenever possible, except to manage difficult dynamic height adjustments or complex SVGs.
- **Color Palette & Branding:** 
  - **Teal (Primary):** `#2A8B8B`
  - **Orange (Accent/Action):** `#D97736`
  - **Backgrounds:** Gentle off-whites and natural tones like `#Fdfbf9` and `#F4EBE1`.
- **Micro-interactions:** To sustain the "magic" feel:
  - Add `transition` utility classes to buttons and cards.
  - Use `hover:scale-105` and `hover:shadow-xl`.
  - Prefer soft layout animations and blurred background elements (`blur-3xl`, glassmorphism).

---

## 4. Run Instructions

```bash
# Install required packages (if adding new dependencies)
npm install

# Start the Vite development server with Hot-Module-Replacement
npm run dev

# Build the project for production
npm run build
```
