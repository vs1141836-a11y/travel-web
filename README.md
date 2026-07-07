# TripCraft AI — Premium Personalized Travel Planner

TripCraft AI is a premium, agency-quality, AI-powered travel planner built on the MERN stack. It features a highly interactive, animated, scroll-driven user interface inspired by premium SaaS landing pages (like Stripe, Linear, or Framer).

Users enter a destination, dates, budget, travelers, and interests, and the AI generates a bespoke day-by-day itinerary with activities, timings, category tags, and estimated costs. Users can manage budgets, drag-and-drop activities between days, add manual items, export to PDF, and regenerate days using AI.

---

## 🛠️ Tech Stack & Credits

### Frontend (Client-side)
- **Core**: React (Vite) + React Router v7
- **Styling**: Tailwind CSS v3
- **Animations**: GSAP + ScrollTrigger, Framer Motion, Lenis
- **Drag & Drop**: @hello-pangea/dnd
- **Charts**: Recharts
- **Forms & API**: React Hook Form, Zod, Axios, React Hot Toast

### Backend (Server-side)
- **Server**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **AI**: OpenAI GPT-4o-mini

---

## ⚙️ Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Features

- AI-generated travel itineraries
- Budget tracking
- Drag-and-drop itinerary planner
- Authentication with JWT
- Export itinerary to PDF
- Modern animated UI
- Responsive design