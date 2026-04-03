import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* Main App — always mounted, just hidden behind loader initially */}
      <motion.div
        style={{
          minHeight: "100vh",
          background: "#000",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: loading ? 0 : 0.3 }}
      >
        <Sidebar />
        <main
          style={{
            position: "relative",
            marginLeft: 220,
            padding: "28px 36px 48px 36px",
            minHeight: "100vh",
            zIndex: 1,
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
            background:
              "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
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
            background:
              "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)",
            bottom: -100,
            left: 100,
            zIndex: 0,
          }}
        />
      </motion.div>
    </BrowserRouter>
  );
}