<<<<<<< HEAD
# TripCraft AI — Premium Personalized Travel Planner

TripCraft AI is a premium, agency-quality, AI-powered travel planner built on the MERN stack. It features a highly interactive, animated, scroll-driven user interface inspired by premium SaaS landing pages (like Stripe, Linear, or Framer). 

Users enter a destination, dates, budget, travelers, and interests, and the AI generates a bespoke day-by-day itinerary with activities, timings, category tags, and estimated costs. Users can manage budgets, drag-and-drop activities between days, add manual items, export to PDF, and regenerate days using AI.

---

## 🛠️ Tech Stack & Credits

### Frontend (Client-side)
*   **Core**: React (Vite) + React Router v7
*   **Styling**: Tailwind CSS v3 with a custom token configuration (deep-dark backgrounds, warm gold accents, soft layered shadows)
*   **Animations & Motion Design**:
    *   **GSAP + ScrollTrigger**: Powers the parallax scroll effects and pinned horizontal scrolling showcasing steps on the Landing Page.
    *   **Framer Motion**: Handles route transitions (`AnimatePresence`), spring hover-scale animations, floating panels, and the SVG flight-path loader.
    *   **Lenis Scroll**: Initialized globally to offer buttery smooth physics-based momentum mouse-wheel scrolling.
*   **Editor & Charting**:
    *   **@hello-pangea/dnd**: Premium drag-and-drop mechanics to reorder activities between day columns.
    *   **Recharts**: Custom colored pie charts and bar charts to display category budgets and daily costs.
*   **Forms & API**: React Hook Form, Zod Schemas, Axios Client, React Hot Toast.

### Backend (Server-side)
*   **Server**: Node.js + Express (MVC structure)
*   **Database**: MongoDB + Mongoose (with pre-save hooks to automatically recalculate trip total costs)
*   **Security**: JWT Authentication set inside double secure `httpOnly` cookies (`accessToken` and `refreshToken`) for protection against XSS and CSRF, paired with `bcryptjs` password hashing.
*   **AI Engine**: OpenAI API (`gpt-4o-mini` model with strict JSON formatting mode, schema verification, and automatic single-retry fallbacks).

---

## ⚙️ Installation & Running the Project

### Prerequisites
*   Node.js (v18+)
*   MongoDB Instance (Atlas connection URI or local MongoDB Server)
*   OpenAI API Key

### Backend Setup
1. Open a terminal and navigate to the backend:
    ```bash
    cd backend
    ```
2. Create your `.env` file from the template:
    ```bash
    cp .env.example .env
    ```
    *Modify `.env` to include your `MONGO_URI`, `JWT_SECRET`, and `OPENAI_API_KEY`.*
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the backend developer server:
    ```bash
    npm run dev
    ```
    *The server runs on port `5000` and automatically connects to MongoDB.*

### Frontend Setup
1. Open a second terminal and navigate to the frontend:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```
3. Start the Vite React development server:
    ```bash
    npm run dev
    ```
    *Vite will start the client, usually on `http://localhost:5173` or `http://localhost:5174` if the port is occupied. CORS has been pre-configured to trust both origins.*

---

## 🚀 Key Animation Highlights
*   **Hero Entrance**: Parallax glowing background blobs and staggered title slide-ins.
*   **How It Works Section**: The landing page pins the screen on desktop and translates panels horizontally on vertical scrolling, degrading smoothly to clean vertical blocks on mobile screens.
*   **Custom AI Plane Loader**: An SVG line-animation loops a flight path while status text dynamically cycles during itinerary generation.
*   **Drag-and-Drop Columns**: Day planner columns are snap-aligned and support fluid items drag reordering.
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 088e7b66cdb603d040629dc575cf39905dd9ea48
