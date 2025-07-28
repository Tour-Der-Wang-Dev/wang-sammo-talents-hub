# AI Rules for Lovable Project

This document outlines the technical stack and guidelines for developing this React application. Adhering to these rules ensures consistency, maintainability, and optimal performance.

## Tech Stack Overview

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A superset of JavaScript that adds static typing, enhancing code quality and developer experience.
*   **Vite:** A fast build tool that provides a lightning-fast development experience.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **shadcn/ui:** A collection of reusable components built with Radix UI and styled with Tailwind CSS.
*   **React Router DOM:** For declarative routing in the application.
*   **TanStack Query (React Query):** For efficient server state management, data fetching, caching, and synchronization.
*   **Lucide React:** A library of beautiful and customizable open-source icons.
*   **Sonner:** A modern toast component for displaying notifications.
*   **Supabase:** An open-source Firebase alternative providing database, authentication, and storage services.
*   **React Hook Form & Zod:** For robust form management and validation.
*   **date-fns:** A comprehensive JavaScript date utility library.

## Library Usage Guidelines

To maintain consistency and leverage the strengths of our chosen libraries, please follow these guidelines:

*   **UI Components:**
    *   **Primary Choice:** Always prefer components from `shadcn/ui` for standard UI elements (e.g., Button, Input, Card, Dialog, Sheet, Checkbox, Label, Badge, Separator).
    *   **Custom Components:** For unique UI elements or compositions of existing `shadcn/ui` components, create new components in `src/components/`. Keep them focused and reusable.
*   **Styling:**
    *   **Tailwind CSS:** All styling must be done using Tailwind CSS utility classes. Avoid writing custom CSS unless it's for global styles in `src/index.css` (e.g., base typography, custom utilities like `.thai-pattern`).
*   **Routing:**
    *   **React Router DOM:** Use for all client-side navigation. Define main application routes within `src/App.tsx`.
*   **Data Fetching & Server State:**
    *   **TanStack Query:** Utilize `useQuery`, `useMutation`, and other hooks from `@tanstack/react-query` for fetching, caching, and updating server data.
*   **Icons:**
    *   **Lucide React:** Use icons exclusively from `lucide-react`.
*   **Notifications:**
    *   **Sonner:** Implement all toast notifications using the `sonner` library.
*   **Backend & Database:**
    *   **Supabase:** Interact with the backend (database, authentication) via the Supabase client (`@supabase/supabase-js`).
*   **Form Management:**
    *   **React Hook Form & Zod:** Use `react-hook-form` for managing form state and `zod` for schema validation.
*   **Date Manipulation:**
    *   **date-fns:** Use `date-fns` for any date formatting, parsing, or manipulation tasks.