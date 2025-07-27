# AI Development Rules for "ที่นี่ วังสามหมอ"

This document outlines the core technologies used in this project and provides guidelines on which libraries and frameworks to use for specific functionalities. Adhering to these rules ensures consistency, maintainability, and optimal performance.

## Tech Stack Overview

*   **React**: The primary library for building the user interface.
*   **TypeScript**: Used for all application code to ensure type safety and improve developer experience.
*   **Vite**: The build tool and development server, chosen for its speed and efficiency.
*   **Tailwind CSS**: A utility-first CSS framework for all styling, enabling rapid and consistent UI development.
*   **Shadcn UI**: A collection of reusable UI components built with Radix UI and styled with Tailwind CSS.
*   **React Router**: Manages client-side routing and navigation within the application.
*   **Lucide Icons**: A comprehensive icon library for all visual icons.
*   **React Helmet Async**: Used for managing document head tags (e.g., title, meta descriptions) for SEO.
*   **React Hook Form & Zod**: The preferred combination for robust form management and schema validation.
*   **Tanstack Query (React Query)**: Handles server state, data fetching, caching, and synchronization.
*   **Sonner**: Provides elegant and accessible toast notifications for user feedback.
*   **Supabase**: The chosen Backend-as-a-Service (BaaS) for authentication, database, and storage.

## Library Usage Guidelines

To maintain a consistent and efficient codebase, please follow these rules when implementing new features or modifying existing ones:

*   **UI Components**:
    *   **Always** prioritize using components from `shadcn/ui`.
    *   If a required component is not available in `shadcn/ui` or needs significant customization, **create a new component file** in `src/components/` and style it with Tailwind CSS. **Do not modify existing `shadcn/ui` component files.**
*   **Styling**:
    *   **Exclusively** use Tailwind CSS utility classes for all styling.
    *   Avoid writing custom CSS in `.css` files unless it's for global styles (e.g., `src/index.css`) or specific third-party overrides.
*   **Routing**:
    *   Use `react-router-dom` for all client-side navigation.
    *   All main application routes should be defined in `src/App.tsx`.
*   **Icons**:
    *   Use icons from the `lucide-react` library.
*   **Forms**:
    *   For all forms, use `react-hook-form` for state management and validation.
    *   Pair `react-hook-form` with `zod` for schema-based validation.
*   **Data Fetching & Server State**:
    *   Use `react-query` (from `@tanstack/react-query`) for fetching, caching, and updating server data.
*   **Notifications**:
    *   Use `sonner` for displaying all toast notifications to the user.
*   **SEO & Metadata**:
    *   Manage document head elements (like `<title>` and `<meta>` tags) using `react-helmet-async`.
    *   Utilize the structured data generation functions in `src/utils/seo.ts` for rich snippets.
*   **Mobile Responsiveness**:
    *   All UI components and pages **must** be designed with a mobile-first approach and be fully responsive using Tailwind CSS.
*   **Backend Interaction**:
    *   All interactions with the backend (authentication, database queries, file storage) should be done via the Supabase client (`@supabase/supabase-js`) as configured in `src/integrations/supabase/client.ts`.
*   **File Structure**:
    *   Adhere to the existing logical file structure:
        *   `src/pages/`: Top-level page components for routes.
        *   `src/components/`: Reusable UI components.
        *   `src/hooks/`: Custom React hooks.
        *   `src/utils/`: General utility functions.
        *   `src/data/`: Mock data or static configuration data.
        *   `src/integrations/supabase/`: Supabase client and types.
    *   Create a new file for every new component or hook, no matter how small.
*   **Language**:
    *   All new code and modifications **must** be written in TypeScript.