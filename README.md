# Osama Portfolio 

A high-performance, immersive 3D portfolio and interactive AI assistant built using **Next.js 16**, **React 19**, and **Three.js (React Three Fiber)**. This codebase features interactive 3D WebGL neural animations, a hybrid LLM chatbot fallback, a developer terminal workspace, and responsive layout designs.

---

## ⚡ Core Technical Features

### 🎮 Immersive 3D WebGL Graphics
- **Mouse-Reactive 3D Neural Network:** An interactive neural node network and distorted brain mesh simulated in a 3D Canvas utilizing React Three Fiber, dynamically reacting to pointer movement, plus ambient particle fields.
- **Dynamic CSS Ambient Fallback:** Automatic performance scaling that degrades to smooth CSS radial gradients when WebGL is unsupported or running on low-power devices.

### 🤖 Hybrid AI Chatbot Integration
- **Context-Aware LLM Agent:** Uses a localized JSON schema (`portfolio.ts`) injected directly into the LLM system prompt for highly relevant personal data retrieval.
- **Dual-Provider Failover Pipeline:** Auto-routes requests through **Groq (Llama 3)** and dynamically falls back to **Google Gemini (1.5 Flash)** in case of rate-limiting or network issues.
- **Real-Time UI Utilities:** Features typing animations, Markdown message parsing, suggested query triggers, rate limiting, and query retry flows.

### 💻 Interactive Developer Terminal
- **Interactive Portfolio Shell:** A fully-featured terminal on the `/workspace` page supporting custom command executions (like `about`, `skills`, `projects`, `neofetch`, `run monjez-agent`, `contact`, and `clear`).

### 🎨 Premium Animation Stack
- **GSAP & ScrollTrigger:** Custom scroll-driven layout reveals.
- **Framer Motion:** Fluid routing transitions, spring-based animations, and theme toggling.
- **Lenis:** Smooth inertia scroll wrapper.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Framework & Engine** | Next.js 16, React 19, TypeScript, Node.js |
| **3D Rendering** | Three.js, React Three Fiber (R3F), `@react-three/drei` |
| **Animations** | GSAP, Framer Motion, Lenis (Smooth Scroll) |
| **Styling & UI** | Tailwind CSS, `shadcn/ui`, Class Variance Authority (CVA), Lucide Icons |
| **AI Processing** | Groq SDK, Google Generative AI (Gemini) |

---

## 🏗️ Architecture & File Structure

```
.
├── src/
│   ├── app/                      # App Router routes & API endpoints
│   │   ├── api/
│   │   │   ├── chat/route.ts     # Dual-LLM chatbot fallback handler
│   │   │   └── contact/route.ts  # Contact email sending handler
│   │   ├── contact/              # Interactive contact page
│   │   ├── skills/               # Full skills focus page
│   │   ├── workspace/            # Developer workspace with shell
│   │   ├── layout.tsx            # Global state context, themes, & i18n
│   │   └── page.tsx              # Main entry point (3D background & widgets)
│   ├── components/
│   │   ├── three/                # Scene3D neural composition and canvas
│   │   ├── sections/             # Modular dashboard layout panels
│   │   ├── ui/                   # High-fidelity UI primitives (BeamDivider, SplineScene)
│   │   └── layout/               # Global components (Chatbot interface, Footer, Navbar)
│   ├── data/
│   │   └── portfolio.ts          # Central source of truth for portfolio datasets
│   ├── hooks/                    # Mobile detection and performance-monitoring hooks
│   ├── providers/                # Theme, i18n, and smooth scrolling wrappers
│   └── styles/                   # Global CSS and custom animations
├── public/                       # Statics (models, SVGs, pre-compiled assets)
└── next.config.ts                # Next.js configurations & redirects
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed locally:
- Node.js (version `>= 18.0.0`)
- npm (version `>= 9.0.0`)

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/OsamaShakaki/Osama-portfolio.git
cd Osama-portfolio
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Gmail SMTP Configuration for Contact Form
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password

# AI Chatbot Credentials
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key

# Public Contact Details
NEXT_PUBLIC_PHONE_NUMBER=your_phone_number
```

### 4. Start Development Server
```bash
npm run dev
```

---

## ⚡ Performance Optimization
- **Dynamic Module Loading:** High-overhead WebGL and R3F components are dynamically loaded on the client-side (`ssr: false`) to minimize Initial Server Response times.
- **Low-Power Mode Detection:** Built-in hooks automatically scale down resource-intensive 3D simulations and particle counts on low-power devices.
