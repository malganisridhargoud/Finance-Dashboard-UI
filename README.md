<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
</p>

# 💎 Finance Dashboard UI

A **cinematic**, **industry-grade** finance dashboard featuring advanced motion design, 3D card interactions, and a strict **black → electric blue → white** design system. Built to push the boundaries of what a frontend dashboard can look and feel like.

---

## ✨ What Makes This Different

| Feature | Description |
|---|---|
| 🎬 **Cinematic Loading Screen** | SVG particle constellation with 30+ animated nodes, morphing gradient geometry, letter-by-letter stagger reveal with blur-in, and an elastic progress bar |
| 🧭 **Animated Sidebar Navigation** | Glassmorphism sidebar with a spring-physics active indicator that slides between items using Framer Motion `layoutId` |
| 🃏 **3D Tilt Stat Cards** | Cards follow mouse position with `rotateX`/`rotateY` transforms, feature animated number counting, aurora gradient edge bars, and a cursor-tracking glow orb |
| 📊 **Glowing Charts** | Area chart with SVG `feGaussianBlur` glow filter on the stroke, blue gradient fill; donut chart with center label, glowing cells, and custom dot legend |
| ⚡ **Staggered Motion System** | Every grid, card set, and table row enters with choreographed stagger animations via Framer Motion `staggerChildren` |
| 🌊 **Hover Beam Effect** | Table rows feature a blue light-beam sweep that slides left-to-right on hover via CSS `::after` pseudo-element |
| 💫 **Shimmer Badges** | Badges have a continuous shimmer sweep animation via `background-position` keyframes |
| 🎯 **Spring Pill Toggle** | Role toggle uses a sliding pill indicator with spring physics (`stiffness: 400, damping: 30`) |
| 🔵 **Pulsing Accents** | Section headers include a breathing blue dot, insight cards have animated border glow pulses |
| 📐 **Page Transitions** | Route changes animate with a blur-in / blur-out spring transition via `AnimatePresence` |

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-surface` | `#0A0A0F` | Page background |
| `--color-primary` | `#2563EB` | Electric blue — buttons, glows, accents |
| `--color-accent` | `#06B6D4` | Cyan — gradients, chart accents |
| `--color-text-primary` | `#F8FAFC` | Headings, key values |
| `--color-text-secondary` | `#94A3B8` | Labels, descriptions |
| `--color-text-muted` | `#64748B` | Hints, metadata |

### Typography
- **Font:** Inter (300–900 weights via Google Fonts)
- **Headings:** 700–900 weight, tight tracking, gradient clip text (`gradient-text`)
- **Body:** 400–500 weight

### Animation Keyframes (15+)
`shimmer-sweep` · `pulse-glow` · `float` · `aurora-shift` · `gradient-rotate` · `border-glow-pulse` · `sweep-beam` · `draw-line` · `dot-pulse` · `morph-hex` · `text-blur-in` · `progress-fill` · `particle-drift` · `wipe-up` · `breathe` · `count-pop` · `ripple`

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | React | 19.2 |
| Build Tool | Vite | 8.0 |
| Styling | TailwindCSS | 4.2 |
| Animations | Framer Motion | 12.38 |
| Charts | Recharts | 3.8 |
| State | Zustand | 5.0 |
| Routing | React Router | 7.13 |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── cards/
│   │   ├── StatCard.jsx          # 3D tilt + animated counting
│   │   └── InsightCard.jsx       # Pulsing glow + tone icons
│   ├── charts/
│   │   ├── BalanceTrendChart.jsx  # Glowing blue area chart
│   │   └── SpendingBreakdownChart.jsx  # Blue donut + center label
│   ├── layout/
│   │   ├── Sidebar.jsx           # Glassmorphism sidebar nav
│   │   └── PageTransition.jsx    # Blur-in spring page wrapper
│   ├── transactions/
│   │   ├── TransactionTable.jsx  # Staggered rows + hover beam
│   │   ├── TransactionToolbar.jsx # Glow inputs + filter badge
│   │   └── TransactionForm.jsx   # Stagger field reveals
│   └── ui/
│       ├── Badge.jsx             # Shimmer sweep pill
│       ├── Button.jsx            # Gradient + glow + tap spring
│       ├── EmptyState.jsx        # Floating SVG + particles
│       ├── LoadingScreen.jsx     # Cinematic particle intro
│       ├── RoleToggle.jsx        # Spring sliding pill
│       └── SectionHeader.jsx     # Pulsing dot + animated underline
├── pages/
│   ├── Dashboard.jsx             # Staggered grid hero
│   ├── Transactions.jsx          # Animated panel reveals
│   └── Insights.jsx              # Card cascade + glow observation
├── store/
│   └── useFinanceStore.js        # Zustand with localStorage persistence
├── data/
│   └── mockData.js               # 12 sample transactions + category sets
├── hooks/
│   └── useDebounce.js
├── utils/
│   └── finance.js                # Currency formatting, filtering, insights
├── App.jsx                       # Layout shell + loading gate + ambient orbs
├── main.jsx                      # React 19 createRoot entry
└── index.css                     # 280-line design system + 15+ keyframes
```

---

## 🚀 Getting Started

### 1. Clone

```bash
git clone https://github.com/malganisridhargoud/Finance-Dashboard-UI.git
cd Finance-Dashboard-UI
```

### 2. Install

```bash
npm install
```

### 3. Run

```bash
npm run dev
```

Open **http://localhost:5173/** in your browser.

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## 📌 Core Features

### 📊 Dashboard
- Summary stat cards with animated currency counting
- Balance trend area chart (monthly)
- Spending breakdown donut chart (by category)
- AI-style insight cards (top category, average expense, balance health)

### 💸 Transactions
- Full-text search across all fields
- Filter by type (income/expense) and category
- Sort by date, amount, or category
- Admin mode: Add, Edit, Delete transactions
- Viewer mode: Read-only access

### 📈 Insights
- Top expense category detection
- Month-over-month comparison
- Net position calculation
- Observation text with contextual advice

### 👤 Role-Based UI
- **Viewer** — Read-only, no mutation controls
- **Admin** — Full CRUD with transaction form

---

## ⚙️ Architecture Decisions

| Decision | Rationale |
|---|---|
| **Zustand** over Redux | Zero boilerplate, built-in `persist` middleware, tiny bundle |
| **CSS variables** over Tailwind theme | Runtime-accessible tokens, cleaner animation integration |
| **Framer Motion** for all motion | Spring physics, `layoutId` shared element transitions, `AnimatePresence` |
| **Inline SVG** illustrations | No external asset dependencies, fully animatable with Framer Motion |
| **`glass-card` utility** | Single reusable class for all card containers, enforces design consistency |

---

## 🧪 Edge Cases Handled

- Empty transaction lists → animated SVG empty state
- No search results → contextual empty message
- Invalid form inputs → HTML5 validation
- Role switching mid-edit → form auto-hides
- Zero-value balances → neutral tone indicators

---

## 📦 Possible Enhancements

- ✅ Local storage persistence
- ✅ Role-based UI simulation
- ✅ Cinematic loading screen
- ✅ 3D card interactions
- ⏳ Dark/light theme toggle
- ⏳ CSV/JSON export
- ⏳ Backend API integration
- ⏳ PWA support

---

<p align="center">
  <sub>Built with 🔵 by <a href="https://github.com/malganisridhargoud">malganisridhargoud</a></sub>
</p>
