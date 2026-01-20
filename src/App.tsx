import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "./ErrorBoundary";

// Lazy load blog page
const Blog = lazy(() => import("./pages/Blog").then(module => ({ default: module.default })));

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering");
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