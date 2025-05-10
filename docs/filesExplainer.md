
# Project Files Explanation

This document provides an overview of all files in the project, explaining their purpose and importance.

## Legend
- 🟢 Low importance (few imports, utility files)
- 🟡 Medium importance (components, hooks)
- 🟠 High importance (pages, core functionality)

## Root Files
- `.gitignore` 🟢 - Specifies intentionally untracked files to ignore
- `README.md` 🟢 - Project overview and setup instructions
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
- `App.tsx` 🟠 - Main application component with routing
- `index.css` 🟢 - Global styles including Tailwind imports
- `main.tsx` 🟠 - Application entry point
- `vite-env.d.ts` 🟢 - Vite environment type definitions

### /src/components
- `FilterPanel.tsx` 🟡 - Job filtering UI component
- `Footer.tsx` 🟡 - Footer component with site info
- `Header.tsx` 🟡 - Navigation header component
- `JobCard.tsx` 🟡 - Job listing card component
- `SEO.tsx` 🟡 - SEO component managing meta tags
- `SearchBar.tsx` 🟡 - Search input component
- `SitemapGenerator.tsx` 🟢 - Component to generate sitemap

### /src/components/ui
- `accordion.tsx` 🟢 - Shadcn UI accordion component
- `alert-dialog.tsx` 🟢 - Shadcn UI alert dialog component
- `alert.tsx` 🟢 - Shadcn UI alert component
- `aspect-ratio.tsx` 🟢 - Shadcn UI aspect ratio component
- `avatar.tsx` 🟢 - Shadcn UI avatar component
- `badge.tsx` 🟡 - Shadcn UI badge component (used in JobCard)
- `breadcrumb.tsx` 🟢 - Shadcn UI breadcrumb component
- `button.tsx` 🟡 - Shadcn UI button component (widely used)
- `calendar.tsx` 🟢 - Shadcn UI calendar component
- `card.tsx` 🟡 - Shadcn UI card component (used in JobCard)
- `carousel.tsx` 🟢 - Shadcn UI carousel component
- `chart.tsx` 🟢 - Shadcn UI chart component
- `checkbox.tsx` 🟢 - Shadcn UI checkbox component
- `collapsible.tsx` 🟢 - Shadcn UI collapsible component
- `command.tsx` 🟢 - Shadcn UI command component
- `context-menu.tsx` 🟢 - Shadcn UI context menu component
- `dialog.tsx` 🟢 - Shadcn UI dialog component
- `drawer.tsx` 🟢 - Shadcn UI drawer component
- `dropdown-menu.tsx` 🟢 - Shadcn UI dropdown menu component
- `form.tsx` 🟡 - Shadcn UI form component
- `hover-card.tsx` 🟢 - Shadcn UI hover card component
- `input-otp.tsx` 🟢 - Shadcn UI OTP input component
- `input.tsx` 🟡 - Shadcn UI input component (used in SearchBar)
- `label.tsx` 🟢 - Shadcn UI label component
- `menubar.tsx` 🟢 - Shadcn UI menubar component
- `navigation-menu.tsx` 🟢 - Shadcn UI navigation menu component
- `pagination.tsx` 🟢 - Shadcn UI pagination component
- `popover.tsx` 🟢 - Shadcn UI popover component
- `progress.tsx` 🟢 - Shadcn UI progress component
- `radio-group.tsx` 🟢 - Shadcn UI radio group component
- `resizable.tsx` 🟢 - Shadcn UI resizable component
- `scroll-area.tsx` 🟢 - Shadcn UI scroll area component
- `select.tsx` 🟢 - Shadcn UI select component
- `separator.tsx` 🟡 - Shadcn UI separator component
- `sheet.tsx` 🟢 - Shadcn UI sheet component
- `sidebar.tsx` 🟢 - Shadcn UI sidebar component
- `skeleton.tsx` 🟢 - Shadcn UI skeleton component
- `slider.tsx` 🟢 - Shadcn UI slider component
- `sonner.tsx` 🟡 - Shadcn UI toast component (Sonner)
- `switch.tsx` 🟢 - Shadcn UI switch component
- `table.tsx` 🟢 - Shadcn UI table component
- `tabs.tsx` 🟢 - Shadcn UI tabs component
- `textarea.tsx` 🟢 - Shadcn UI textarea component
- `toast.tsx` 🟡 - Shadcn UI toast component
- `toaster.tsx` 🟡 - Shadcn UI toaster component
- `toggle-group.tsx` 🟢 - Shadcn UI toggle group component
- `toggle.tsx` 🟢 - Shadcn UI toggle component
- `tooltip.tsx` 🟢 - Shadcn UI tooltip component
- `use-toast.ts` 🟢 - Shadcn UI toast hook

### /src/data
- `jobs.ts` 🟠 - Job listing mock data and types

### /src/hooks
- `use-mobile.tsx` 🟡 - Hook for detecting mobile devices
- `use-toast.ts` 🟡 - Hook for displaying toast notifications

### /src/integrations/supabase
- `client.ts` 🟢 - Supabase client configuration
- `types.ts` 🟢 - Supabase type definitions

### /src/lib
- `utils.ts` 🟡 - Utility functions used throughout the app

### /src/pages
- `Index.tsx` 🟠 - Home page component
- `JobDetailPage.tsx` 🟠 - Job detail page component
- `JobsPage.tsx` 🟠 - Job listing page component
- `NotFound.tsx` 🟡 - 404 page component

### /src/utils
- `seo.ts` 🟡 - SEO utility functions for structured data
- `sitemap.ts` 🟡 - Sitemap generation utilities

### /public
- `favicon.ico` 🟢 - Website favicon
- `placeholder.svg` 🟢 - Placeholder image
- `robots.txt` 🟢 - Instructions for web crawlers
- `sitemap.xml` 🟡 - XML sitemap for search engines

## /supabase
- `config.toml` 🟢 - Supabase configuration file

