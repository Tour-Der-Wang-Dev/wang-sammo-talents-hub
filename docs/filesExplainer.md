
# Project Files Explanation

This document provides an overview of all files in the project, explaining their purpose and importance.

## Legend
- 🟢 Low importance (few imports, utility files)
- 🟡 Medium importance (components, hooks)
- 🔴 High importance (pages, core functionality)

## Root Files
- `.gitignore` 🟢 - Specifies intentionally untracked files to ignore
- `README.md` 🟡 - Project overview and setup instructions
- `bun.lockb` 🟢 - Lock file for dependencies
- `components.json` 🟢 - Shadcn UI component configuration
- `eslint.config.js` 🟢 - ESLint configuration
- `index.html` 🟡 - Entry HTML file with initial metadata
- `package-lock.json` 🟢 - Dependency lock file
- `package.json` 🟡 - Project configuration and dependencies
- `postcss.config.js` 🟢 - PostCSS configuration for Tailwind
- `tailwind.config.ts` 🟡 - Tailwind CSS configuration
- `tsconfig.app.json` 🟢 - TypeScript configuration for the app
- `tsconfig.json` 🟢 - Main TypeScript configuration
- `tsconfig.node.json` 🟢 - TypeScript configuration for Node.js
- `vite.config.ts` 🟡 - Vite build tool configuration

## /src
- `App.css` 🟢 - Global CSS styles
- `App.tsx` 🔴 - Main application component with routing
- `index.css` 🟢 - Global styles including Tailwind imports
- `main.tsx` 🔴 - Application entry point
- `vite-env.d.ts` 🟢 - Vite environment type definitions

### /src/components
- `CompanyCard.tsx` 🟡 - Company listing card component
- `CompanySearch.tsx` 🟡 - Search component for companies
- `FilterPanel.tsx` 🟡 - Job filtering UI component
- `Footer.tsx` 🟡 - Footer component with site info
- `Header.tsx` 🟡 - Navigation header component
- `ImageUploader.tsx` 🟡 - Component for uploading images
- `JobCard.tsx` 🟡 - Job listing card component
- `JobFormPreview.tsx` 🟡 - Preview for job posting form
- `JobPostingForm.tsx` 🟡 - Form for posting new jobs
- `NavigationMenu.tsx` 🟡 - Navigation menu component
- `OptimizedImage.tsx` 🟢 - Component for optimized image loading
- `SearchBar.tsx` 🟡 - Search input component
- `SEO.tsx` 🟡 - SEO component managing meta tags
- `SettingCard.tsx` 🟢 - Card component for settings
- `SiteNavigation.tsx` 🟡 - Site navigation component
- `SitemapGenerator.tsx` 🟢 - Component to generate sitemap

### /src/components/companies
- `CompanyPageHeader.tsx` 🟡 - Header component for company pages
- `CompanyStatistics.tsx` 🟡 - Statistics display for companies
- `CompanyTabSection.tsx` 🟡 - Tab navigation for company pages

### /src/components/ui
- Various shadcn UI components 🟢 - Reusable UI components
- Commonly used components like `button.tsx`, `card.tsx`, `input.tsx` 🟡

### /src/data
- `companies.ts` 🔴 - Company data and types
- `jobs.ts` 🔴 - Job listing mock data and types
- `navigation.ts` 🟡 - Navigation configuration data

### /src/hooks
- `use-mobile.tsx` 🟡 - Hook for detecting mobile devices
- `use-optimized-image.tsx` 🟡 - Hook for image optimization
- `use-toast.ts` 🟡 - Hook for displaying toast notifications

### /src/integrations/supabase
- `client.ts` 🟢 - Supabase client configuration
- `types.ts` 🟢 - Supabase type definitions

### /src/lib
- `utils.ts` 🟡 - Utility functions used throughout the app

### /src/pages
- `CompaniesPage.tsx` 🔴 - Companies listing page
- `CompanyDetailPage.tsx` 🔴 - Company detail page
- `CompanyRegisterPage.tsx` 🔴 - Company registration page
- `Index.tsx` 🔴 - Home page component
- `JobDetailPage.tsx` 🔴 - Job detail page component
- `JobPostingPage.tsx` 🔴 - Job posting page
- `JobsPage.tsx` 🔴 - Job listing page component
- `NotFound.tsx` 🟡 - 404 page component
- `SettingsPage.tsx` 🟡 - User settings page

### /src/types
- `Company.ts` 🟡 - TypeScript interfaces for company data

### /src/utils
- `seo.ts` 🟡 - SEO utility functions for structured data
- `sitemap.ts` 🟡 - Sitemap generation utilities

### /docs
- `filesExplainer.md` 🟢 - This file explaining project structure
- `README.md` 🟢 - Documentation overview
- `scripts.md` 🟢 - Package.json scripts documentation
- `systemDiagram.md` 🟢 - System architecture diagram

### /public
- `favicon.ico` 🟢 - Website favicon
- `placeholder.svg` 🟢 - Placeholder image
- `robots.txt` 🟢 - Instructions for web crawlers
- `sitemap.xml` 🟡 - XML sitemap for search engines
- `/lovable-uploads` 🟢 - Directory for uploaded images

## /supabase
- `config.toml` 🟢 - Supabase configuration file
