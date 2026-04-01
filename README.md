# 💰 Finance Dashboard UI

A clean, interactive, and responsive finance dashboard built using **React + TailwindCSS**.
This project focuses on **UI/UX quality, state management, and frontend architecture**, simulating a real-world financial tracking interface.

---

## 🚀 Live Demo

*(Add your deployed link here — Vercel recommended)*

---

## 📌 Overview

This dashboard allows users to:

* View overall financial summary (balance, income, expenses)
* Explore and filter transactions
* Understand spending patterns through charts
* Switch between roles (Viewer / Admin)
* Generate insights from financial data

The goal of this project is to demonstrate:

* Strong frontend fundamentals
* Clean component architecture
* Thoughtful UI/UX decisions
* Effective state management

---

## 🧠 Key Features

### 📊 Dashboard Overview

* Summary cards (Balance, Income, Expenses)
* Animated and responsive charts:

  * Balance trend (time-based)
  * Spending breakdown (category-based)

---

### 💸 Transactions Management

* Transaction list with:

  * Date, Amount, Category, Type
* Features:

  * 🔍 Search
  * 🎯 Filtering (category, type)
  * ↕ Sorting
* Admin-only:

  * Add / Edit / Delete transactions

---

### 👤 Role-Based UI (Simulated)

* **Viewer**

  * Read-only access
* **Admin**

  * Full CRUD operations

Switch roles using UI toggle.

---

### 📈 Insights Section

* Highest spending category
* Monthly comparison
* Average expense
* Balance health indicator

---

### ⚙️ State Management

* Built using **Zustand**
* Handles:

  * Transactions data
  * Filters
  * Role switching
* Persisted using local storage

---

### 🎨 UI/UX Highlights

* Glassmorphism design
* Responsive layout (mobile + desktop)
* Smooth interactions and hover effects
* Clean typography and spacing
* Empty state handling

---

## 🛠️ Tech Stack

| Category   | Technology    |
| ---------- | ------------- |
| Framework  | React (Vite)  |
| Styling    | TailwindCSS   |
| State Mgmt | Zustand       |
| Charts     | Recharts      |
| Animations | Framer Motion |
| Routing    | React Router  |

---

## 📁 Project Structure

```
src/
 ├── components/
 │    ├── cards/
 │    ├── charts/
 │    ├── transactions/
 │    └── ui/
 │
 ├── pages/
 │    ├── Dashboard.jsx
 │    ├── Transactions.jsx
 │    └── Insights.jsx
 │
 ├── store/
 │    └── useFinanceStore.js
 │
 ├── data/
 │    └── mockData.js
 │
 ├── hooks/
 ├── utils/
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd finance-dashboard
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Install required packages

```bash
npm install zustand recharts framer-motion react-router-dom
```

---

### 4. Run development server

```bash
npm run dev
```

Open:

```
http://localhost:5173/
```

---

## 🎯 Design Decisions

### 1. Component-Based Architecture

* Separated UI, logic, and layout
* Reusable and scalable components

---

### 2. Zustand over Redux

* Lightweight and simple
* Minimal boilerplate
* Ideal for small-to-medium apps

---

### 3. Data Handling

* Mock data used
* No backend dependency
* Local persistence implemented

---

### 4. UX Focus

* Minimal cognitive load
* Clear visual hierarchy
* Fast interaction feedback

---

## 📦 Optional Enhancements (Implemented / Possible)

* ✅ Local storage persistence
* ✅ Role-based UI simulation
* ⏳ Dark mode toggle
* ⏳ Export data (CSV/JSON)
* ⏳ API integration

---

## 🧪 Edge Case Handling

* Empty transactions
* No search results
* Invalid inputs
* Role restrictions enforced

---
