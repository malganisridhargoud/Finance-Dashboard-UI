import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Sidebar from "./components/layout/Sidebar";
import PageTransition from "./components/layout/PageTransition";
import LoadingScreen from "./components/ui/LoadingScreen";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          }
        />
        <Route
          path="/transactions"
          element={
            <PageTransition>
              <Transactions />
            </PageTransition>
          }
        />
        <Route
          path="/insights"
          element={
            <PageTransition>
              <Insights />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div
          className="min-h-screen bg-grid-pattern bg-noise"
          style={{ background: "var(--color-surface)" }}
        >
          <Sidebar />
          <main
            className="relative z-10"
            style={{
              marginLeft: 72,
              padding: "32px 32px 48px 32px",
              minHeight: "100vh",
            }}
          >
            <AnimatedRoutes />
          </main>

          {/* Ambient Glow Orbs */}
          <div
            className="fixed pointer-events-none"
            style={{
              width: 600,
              height: 600,
              background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
              top: -100,
              right: -100,
              zIndex: 0,
            }}
          />
          <div
            className="fixed pointer-events-none"
            style={{
              width: 400,
              height: 400,
              background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)",
              bottom: -100,
              left: 100,
              zIndex: 0,
            }}
          />
        </div>
      )}
    </BrowserRouter>
  );
}