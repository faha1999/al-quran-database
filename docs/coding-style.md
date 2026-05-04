# Coding Style Guide

To maintain consistency, readability, and performance across the Quran Developer Platform, please adhere to the following guidelines.

## 1. TypeScript & Typing
- **Strict Typing**: Always use TypeScript. Avoid `any` unless absolutely necessary (e.g., when interfacing with untyped third-party data). Use `unknown` for runtime validation.
- **Interfaces over Types**: Use `interface` for object shapes and class structures. Use `type` for unions, intersections, and primitives.
- **Explicit Returns**: While TS infers return types, explicitly typing API responses and complex functions improves documentation and catches errors early.

## 2. React & Next.js Components
- **Server vs Client**: Default to Server Components. Only use `'use client'` at the top of a file when you need state (`useState`), effects (`useEffect`), or browser APIs.
- **Separation of Concerns**: Keep components focused. If a component grows beyond 150 lines, consider extracting logical parts (like we did with `<AdvancedFilters />`).
- **Props Interface**: Define a `Props` interface right above the component definition.

## 3. Formatting & Linting
- **Prettier**: Code formatting is enforced by Prettier. Do not argue about styling (quotes, trailing commas); let Prettier format it automatically.
- **ESLint**: Treat all warnings as issues to be resolved. Do not use `// eslint-disable-next-line` unless you have a documented, valid reason.

## 4. API & Error Handling
- **Centralized Logging**: Never use `console.error` or `console.log` directly in production routes. Use the `logger` from `@/lib/logger.ts`.
- **Standardized Responses**: All API routes must return a JSON structure matching: `{ success: boolean; data?: any; error?: string; meta?: any }`.
- **Try/Catch Blocks**: Wrap all asynchronous operations in `try/catch` and use the logger in the catch block to record stack traces.

## 5. File Structure & Naming
- **Kebab Case**: File and directory names should be `kebab-case` (e.g., `data-loader.ts`, `advanced-filters/`).
- **PascalCase**: React Components must be `PascalCase` (e.g., `AdvancedFilters.tsx`).
- **camelCase**: Variables, functions, and instances should be `camelCase`.

## 6. Documentation
- **TSDoc**: Add TSDoc comments (`/** ... */`) to all exported functions, interfaces, and shared components. Explain *why*, not just *what*.
