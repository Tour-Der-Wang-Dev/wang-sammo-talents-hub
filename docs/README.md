
# ที่นี่ วังสามหมอ Job Board

## Project Overview

Welcome to the "ที่นี่ วังสามหมอ" job board - a web application designed to connect job seekers with employment opportunities in Thailand's Wang Sam Mo region. The platform focuses on providing a clean, modern, and accessible UI with Thai cultural elements, mobile responsiveness, and bilingual support.

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm

### Installation Steps

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd <project-directory>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory with the following variables for Supabase integration:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Technologies Used

### Front-end
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [React Router](https://reactrouter.com/) - Routing library
- [Lucide Icons](https://lucide.dev/) - Icon library
- [React Helmet Async](https://github.com/staylor/react-helmet-async) - Document head manager
- [React Hook Form](https://react-hook-form.com/) - Form validation library
- [Zod](https://zod.dev/) - Schema validation
- [Recharts](https://recharts.org/) - Charting library
- [Tanstack Query](https://tanstack.com/query/latest) - Data fetching library

### Backend Integration
- [Supabase](https://supabase.com/) - Backend-as-a-Service for authentication and database

## Project Structure

The project follows a feature-based organization with:

- `/src/components` - Reusable UI components
- `/src/components/ui` - Shadcn UI components
- `/src/pages` - Top-level page components for routing
- `/src/data` - Mock data and types
- `/src/utils` - Utility functions and helpers
- `/src/hooks` - Custom React hooks
- `/docs` - Project documentation

See `filesExplainer.md` for a detailed breakdown of all files and their purposes.

## Contribution Guidelines

### Code Style

- Follow the [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) for TypeScript best practices
- Use ESLint and Prettier for code formatting
- Follow BEM naming convention for custom CSS classes
- Use Tailwind CSS utilities whenever possible

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add job filtering functionality
fix: resolve mobile layout issues
docs: update README
style: format code according to style guidelines
refactor: reorganize component structure
test: add tests for search functionality
chore: update dependencies
```

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Test your changes on both desktop and mobile views
4. Create a pull request with a descriptive title and detailed description
5. Request review from a team member

## Folder Structure Recommendations

For improved organization as the application grows:

1. Consider reorganizing components into feature-based folders (e.g., `/src/features/jobs`, `/src/features/companies`)
2. Move shared UI components to `/src/components/common`
3. Group related utilities by domain in `/src/utils`
4. Create separate folders for API services in `/src/services`
5. Add a `/src/contexts` directory for React context providers

## License

This project is proprietary software. All rights reserved.
