import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import SmoothScroll from "./components/SmoothScroll";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import TripDetail from "./pages/TripDetail";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-trip" 
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/trips/:id" 
          element={
            <ProtectedRoute>
              <TripDetail />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SmoothScroll>
          <Router>
            <AnimatedRoutes />
          </Router>
          <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#18181B",
              color: "#FFF",
              border: "1px solid #27272A",
              borderRadius: "8px",
              fontSize: "13px",
              fontFamily: "'Outfit', sans-serif"
            },
            success: {
              iconTheme: {
                primary: "#E5A93C",
                secondary: "#18181B",
              },
            },
          }}
        />
      </SmoothScroll>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
