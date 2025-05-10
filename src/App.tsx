
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import SitemapGenerator from './components/SitemapGenerator';

// Lazy load pages for better performance with more descriptive chunk names
const Index = lazy(() => import("./pages/Index" /* webpackChunkName: "index-page" */));
const JobsPage = lazy(() => import("./pages/JobsPage" /* webpackChunkName: "jobs-page" */));
const JobDetailPage = lazy(() => import("./pages/JobDetailPage" /* webpackChunkName: "job-detail-page" */));
const SettingsPage = lazy(() => import("./pages/SettingsPage" /* webpackChunkName: "settings-page" */));
const NotFound = lazy(() => import("./pages/NotFound" /* webpackChunkName: "not-found-page" */));

// Improved loading component with better visual feedback
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-10 w-10 animate-spin text-wang-blue" aria-label="กำลังโหลด" />
  </div>
);

// Create QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SitemapGenerator />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/job/:id" element={<JobDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
