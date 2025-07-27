
# Available Scripts

This document outlines all the scripts available in `package.json` and how to use them.

## Development Scripts

### `npm run dev`

Starts the development server with hot module replacement.

```bash
npm run dev
```

**Use case**: During development to see real-time changes as you code.

### `npm run build`

Builds the project for production deployment.

```bash
npm run build
```

**Use case**: When preparing for deployment to production environment.

### `npm run build:dev`

Builds the project for development environment deployment.

```bash
npm run build:dev
```

**Use case**: For testing production build in a development-like environment.

### `npm run preview`

Serves the production build locally for preview.

```bash
npm run build
npm run preview
```

**Use case**: For testing the production build before deploying.

## Linting and Type Checking

### `npm run lint`

Runs ESLint to check for code quality and style issues.

```bash
npm run lint
```

**Use case**: Before committing code to ensure it meets code standards.

### `npm run lint:fix`

Runs ESLint and automatically fixes issues when possible.

```bash
npm run lint:fix
```

**Use case**: To automatically fix formatting and simple code style issues.

### `npm run typecheck`

Checks TypeScript types without compiling the code.

```bash
npm run typecheck
```

**Use case**: To verify that TypeScript types are correct throughout the codebase.

## Testing

### `npm run test`

Runs the test suite.

```bash
npm run test
```

**Use case**: To verify that code changes don't break existing functionality.

### `npm run test:watch`

Runs the test suite in watch mode, re-running tests when files change.

```bash
npm run test:watch
```

**Use case**: During development when actively working on tests.

## Other Scripts

### `npm run format`

Formats code using Prettier.

```bash
npm run format
```

**Use case**: To ensure consistent code formatting across the project.

### `npm run clean`

Cleans build artifacts and dependencies.

```bash
npm run clean
```

**Use case**: When you want to start fresh, removing all generated files.

### `npm run analyze`

Analyzes bundle size.

```bash
npm run analyze
```

**Use case**: To identify large dependencies and optimize bundle size.

## Script Combinations

For a complete development workflow:

```bash
# Start development
npm run dev

# Before committing
npm run lint
npm run typecheck
npm run test

# Preparing for deployment
npm run build
npm run preview
```
