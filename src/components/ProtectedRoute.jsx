import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Skeleton from "./ui/Skeleton";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-brand-dark min-h-screen text-white p-8 flex flex-col gap-6 items-center justify-center">
        <Skeleton width="w-24" height="h-24" variant="circle" className="animate-spin" />
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Restoring session...</span>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if user session is invalid
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
