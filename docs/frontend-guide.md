# Frontend Guide

The Quran Developer Platform's documentation and landing page are built using **Next.js 16** and **React 19**, focusing on performance, accessibility, and a premium aesthetic.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Design System

### Visual Language
The project uses a dark-themed, modern aesthetic characterized by:
- **Liquid Glassmorphism**: High-blur background elements with semi-transparent borders (e.g., in `aside` and navigation elements).
- **Vibrant Accents**: Primary color is a curated Blue (`#3b82f6`) used for highlights and interactive states.
- **Typography**: Uses the Inter font family for high legibility across all devices.

### Components
- **Server Components**: Used for all static documentation content to minimize client-side JavaScript.
- **Client Components**: Used for interactive elements such as search filters, API previews, and animations.
- **Atomic Primitives**: Reusable UI components (e.g., `ApiCard`, `CodeBlock`, `SearchInput`) are located in `components/`.

## Animations
Framer Motion is used for subtle micro-animations to enhance user engagement:
- **Hover Transitions**: Smooth border and background color changes on cards and navigation links.
- **Entry Animations**: Subtle fade-in effects for content sections.
- **Interactive Feedback**: Dynamic scaling or shifts for active buttons and filters.

## Accessibility (A11y)
- **Semantic HTML**: Proper use of `<nav>`, `<aside>`, `<main>`, and heading hierarchy.
- **Keyboard Navigation**: Focus states are clearly visible and logically ordered.
- **Color Contrast**: All text meets WCAG AA standards for readability on dark backgrounds.
- **ARIA Labels**: Used for interactive elements like the search input and custom filters.

## Responsive Strategy
The UI is fully responsive, utilizing a grid-based layout that adapts to mobile, tablet, and desktop viewports.
- **Mobile**: Sidebar navigation collapses into a top-bar or drawer (depending on implementation).
- **Desktop**: Persistent sidebar for easy documentation navigation.
- **Containerization**: Main content is constrained to a maximum width of `7xl` for optimal reading comfort.
