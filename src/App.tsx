import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import SitemapGenerator from './components/SitemapGenerator';
import { ErrorBoundary } from './hooks/use-error-boundary';
import { LanguageProvider } from '@/context/LanguageContext';

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const JobsPage = lazy(() => import("./pages/JobsPage"));
const JobDetailPage = lazy(() => import("./pages/JobDetailPage"));
const JobPostingPage = lazy(() => import("./pages/JobPostingPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const CompaniesPage = lazy(() => import("./pages/CompaniesPage"));
const CompanyDetailPage = lazy(() => import("./pages/CompanyDetailPage"));
const CompanyRegisterPage = lazy(() => import("./pages/CompanyRegisterPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SavedJobsPage = lazy(() => import("./pages/SavedJobsPage"));
const JobAlertsPage = lazy(() => import("./pages/JobAlertsPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const CompanyProfilePage = lazy(() => import("./pages/CompanyProfilePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-10 w-10 animate-spin text-wang-blue" aria-label="กำลังโหลด" />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <Sonner />
            <BrowserRouter>
              <SitemapGenerator />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/job/:id" element={<JobDetailPage />} />
                  <Route path="/post-job" element={<JobPostingPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/companies" element={<CompaniesPage />} />
                  <Route path="/company/:id" element={<CompanyDetailPage />} />
                  <Route path="/company/register" element={<CompanyRegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/saved-jobs" element={<SavedJobsPage />} />
                  <Route path="/job-alerts" element={<JobAlertsPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/company-profile" element={<CompanyProfilePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;