<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
</p>

# 💎 Finance Dashboard UI

A sleek, industry-grade finance dashboard built with **React 19**, **Framer Motion**, and **Recharts** — using Apple's SF Pro font system and a strict **black + white + blue** palette. Designed to showcase modern frontend engineering, motion design, and clean component architecture.

---

## ✨ Key Features

### 📊 Dashboard Page
- **3D Tilt Stat Cards** — Mouse-tracking `rotateX`/`rotateY` transforms with animated number counting
- **Balance Trend Chart** — Area chart with SVG gaussian-blur glow filter, gradient fill, and Apple-styled tooltip
- **Spending Breakdown** — Donut chart with center label (total amount), blue-family palette, and custom dot legend
- **Insight Cards** — Categorized signals: highest spend, avg expense, and balance health with tone-variant borders

### 💸 Transactions Page
- **Search** — Full-text filter across description, category, and type
- **Filter & Sort** — By type (income/expense), category, and date/amount
- **Add / Edit / Delete** — Full CRUD operations in Admin mode
- **Staggered Row Animation** — Rows fade-slide in with `0.04s` stagger delay

### 📈 Insights Page
- **Monthly Comparison** — Month-over-month balance direction (up/down)
- **Net Position** — Income minus expenses at a glance
- **Observation Card** — Contextual text advice based on data analysis

### 🎬 Loading Screen
- **SVG Particle Constellation** — 30 animated nodes with connection lines
- **Morphing Gradient Geometry** — Blob with animated `borderRadius` and rotation
- **Letter-by-Letter Reveal** — "FINANCE" stagger-in with blur-to-sharp transition
- **Elastic Progress Bar** — Blue-to-cyan gradient with spring easing

### 🧭 Sidebar Navigation
- **Expanded (220px)** — With text labels, section header, and logo brand name
- **Spring-Animated Indicator** — `layoutId` shared-element transition between routes
- **Role Card** — Bottom widget showing current role (Admin/Viewer) with access level

### 👤 Role-Based Access
| Role | Capabilities |
|------|-------------|
| **Viewer** | Read-only — browse, filter, and sort transactions |
| **Admin** | Full CRUD — add, edit, delete transactions |

Toggle roles instantly with the spring-animated pill switch.

---

## 🎨 Design System

### Font
```
-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
'Helvetica Neue', 'Helvetica', 'Arial', sans-serif
```

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| Surface | `#000000` | Page background |
| Elevated | `#1C1C1E` | Card backgrounds |
| Primary | `#2563EB` | Buttons, accents, glows |
| Text Primary | `#F5F5F7` | Headings, values |
| Text Secondary | `#A1A1A6` | Descriptions |
| Text Muted | `#6E6E73` | Labels, hints |
| Income | `#34D399` | Positive amounts |
| Expense | `#F87171` | Negative amounts |

### Typography Scale
| Element | Size | Weight |
|---------|------|--------|
| Page Heading | 28px | 600 |
| Card Value | 26px | 600 |
| Section Title | 15–17px | 600 |
| Body Text | 13px | 400–500 |
| Label | 10–12px | 500–600 |
| Hint | 11px | 400 |

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | React 19 | Component UI |
| Build | Vite 8 | Dev server + bundler |
| Styling | Tailwind CSS 4 + CSS Variables | Design tokens + utilities |
| Animation | Framer Motion 12 | Spring physics, stagger, layout |
| Charts | Recharts 3 | Area chart, pie/donut chart |
| State | Zustand 5 | Global store with localStorage persist |
| Routing | React Router 7 | SPA navigation |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── cards/
│   │   ├── StatCard.jsx            # 3D tilt + animated counting
│   │   └── InsightCard.jsx         # Tone-variant insight cards
│   ├── charts/
│   │   ├── BalanceTrendChart.jsx    # Glowing area chart
│   │   └── SpendingBreakdownChart.jsx  # Donut + center label
│   ├── layout/
│   │   ├── Sidebar.jsx             # 220px expanded sidebar
│   │   └── PageTransition.jsx      # Spring blur transitions
│   ├── transactions/
│   │   ├── TransactionTable.jsx    # Staggered animated rows
│   │   ├── TransactionToolbar.jsx  # Search + filter grid
│   │   └── TransactionForm.jsx     # Add/edit form
│   └── ui/
│       ├── Badge.jsx               # Income/expense/default pills
│       ├── Button.jsx              # 4 variants (primary/secondary/ghost/danger)
│       ├── EmptyState.jsx          # Floating icon + message
│       ├── LoadingScreen.jsx       # Cinematic particle intro
│       ├── RoleToggle.jsx          # Spring pill toggle
│       └── SectionHeader.jsx       # Blue dot + subtitle
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Insights.jsx
├── store/
│   └── useFinanceStore.js          # Zustand + persist
├── data/
│   └── mockData.js                 # Sample transactions
├── hooks/
│   └── useDebounce.js
├── utils/
│   └── finance.js                  # Format, filter, compute
├── App.jsx                         # Layout + loading gate
├── main.jsx                        # Entry point
└── index.css                       # Design system + keyframes
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and **npm** 9+

### 1. Clone

```bash
git clone https://github.com/malganisridhargoud/Finance-Dashboard-UI.git
cd Finance-Dashboard-UI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Dev Server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### 4. Build for Production

```bash
npm run build
npm run preview
```

### 5. Deploy to Vercel

```bash
npx vercel --prod
```

Or connect the GitHub repo on [vercel.com](https://vercel.com) → Import → Deploy.  
A `vercel.json` is included for SPA routing.

---

## ⚙️ Architecture Decisions

| Decision | Why |
|----------|-----|
| **Zustand** over Redux | Zero boilerplate, built-in `persist`, tiny bundle |
| **CSS Variables** over Tailwind theme | Runtime-accessible tokens, cleaner animation integration |
| **Framer Motion** for all motion | Spring physics, `layoutId` shared elements, `AnimatePresence` |
| **Inline styles** for sizing | Precise pixel control matching Apple's design spec |
| **System font stack** | Native SF Pro on Apple, Segoe UI on Windows — no network request |

---

## 🧪 Edge Cases Handled

- Empty transaction list → animated empty state with icon
- No search results → contextual message
- Invalid form inputs → HTML5 validation
- Role switch mid-edit → form auto-hides
- Chart with zero data → safe `viewBox` guard on custom labels
- Loading screen exit → content fades in after overlay unmounts

---

<p align="center">
  <sub>Built with 🔵 by <a href="https://github.com/malganisridhargoud">malganisridhargoud</a></sub>
</p>
