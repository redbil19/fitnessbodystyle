import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "./ErrorBoundary";

// Lazy load pages
const Blog = lazy(() => import("./pages/Blog").then(module => ({ default: module.default })));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin").then(module => ({ default: module.default })));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard").then(module => ({ default: module.default })));
const CreatePost = lazy(() => import("./pages/Admin/CreatePost").then(module => ({ default: module.default })));

const queryClient = new QueryClient();

const App = () => {
  return (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* EXISTING ROUTE */}
          <Route path="/" element={<Index />} />
          
          {/* BLOG ROUTE */}
          <Route path="/blog" element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><Blog /></Suspense>} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><AdminLogin /></Suspense>} />
          <Route path="/admin/dashboard" element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><Dashboard /></Suspense>} />
          <Route path="/admin/create" element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><CreatePost /></Suspense>} />

          {/* DO NOT TOUCH */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ErrorBoundary>
  );
};

export default App;