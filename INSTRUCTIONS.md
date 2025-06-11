# Vike React i18n Template - Project Instructions

This is a full-featured React application built with Vike (formerly Vite-plugin-ssr) that demonstrates internationalization (i18n), multiple render modes, and modern web development practices.

## Project Overview

This template showcases:
- **Internationalization (i18n)** with support for multiple languages (English, German, French)
- **Client-side and Server-side Routing**
- **Data Fetching** (server-side + isomorphic)
- **Pre-rendering** with static site generation
- **TypeScript** throughout
- **Markdown** page support
- **Error handling** with custom error pages
- **Active link highlighting**
- **HTML streaming**
- **Page transition animations**
- **Tailwind CSS** for modern styling

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Initial Setup

1. **Clone and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Environment Configuration:**
   Create a `.env` file based on `.env.sample` if needed:
   ```bash
   cp .env.sample .env
   ```
   Edit the `.env` file with your domain and other configuration.

3. **Development:**
   ```bash
   pnpm dev
   ```

4. **Build for production:**
   ```bash
   pnpm build
   ```

5. **Preview production build:**
   ```bash
   pnpm preview
   ```

## Project Structure

### Core Directories

- **`pages/`** - Page components and routing configuration
  - Each folder represents a route
  - `+Page.tsx` - Main page component
  - `+data.ts` - Data fetching logic
  - `+route.ts` - Route configuration
  - `+onBeforePrerenderStart.ts` - Prerendering configuration

- **`renderer/`** - Vike configuration and rendering logic
  - `+config.h.ts` - Global Vike configuration
  - `+onRenderHtml.tsx` - Server-side rendering
  - `+onRenderClient.tsx` - Client-side hydration

- **`locales/`** - Internationalization system
  - `translations.ts` - Translation definitions
  - `LocaleText.tsx` - Translation component
  - `extractLocale.ts` - Locale parsing utilities

- **`components/`** - Reusable React components
  - `Link.tsx` - Internationalized link component
  - `Counter.tsx` - Interactive counter example

## Internationalization (i18n)

### Supported Languages
- English (default)
- German (`de`)
- French (`fr`)

### Adding Translations

1. **Add new translation keys** to `locales/translations.ts`:
   ```typescript
   export const translations = {
     "Your new key": {
       de: "Ihr neuer Schlüssel",
       fr: "Votre nouvelle clé",
     },
     // ...existing translations
   }
   ```

2. **Use translations in components:**
   ```tsx
   import { LocaleText } from '$/locales/LocaleText'
   
   function MyComponent() {
     return <LocaleText>Your new key</LocaleText>
   }
   ```

### URL Structure
- English: `/about` (default, no prefix)
- German: `/de/about`
- French: `/fr/about`

## Creating New Pages

### Basic Page
1. Create a new directory in `pages/`
2. Add `+Page.tsx`:
   ```tsx
   import React from "react"
   import { LocaleText } from '$/locales/LocaleText'
   
   export default function Page() {
     return (
       <div className="max-w-4xl mx-auto px-4 py-8">
         <h1 className="text-4xl font-bold text-gray-900 mb-6">
           <LocaleText>Page Title</LocaleText>
         </h1>
       </div>
     )
   }
   ```

### Page with Data Fetching
Add `+data.ts` alongside your page:
```typescript
export { data }

async function data() {
  // Fetch data here
  const result = await fetch('https://api.example.com/data')
  return await result.json()
}
```

Use data in your page:
```tsx
import { useData } from '$/renderer/useData'
import type { Data } from './+data'

export default function Page() {
  const data = useData<Data>()
  return <div>{/* Use data here */}</div>
}
```

### Dynamic Routes
Create `+route.ts` for custom routing:
```typescript
export default '/user/@id'
```

## Render Modes

Configure render modes in your page's `+config.ts`:

```typescript
export default {
  renderMode: 'SSR', // or 'SPA' or 'HTML'
}
```

- **SSR**: Server-side rendering (default)
- **SPA**: Single Page Application
- **HTML**: Static HTML generation

## Navigation and Links

Use the custom `Link` component for internationalized navigation:

```tsx
import { Link } from '$/components/Link'

function Navigation() {
  return (
    <nav className="flex space-x-4">
      <Link href="/about" className="text-blue-600 hover:text-blue-800">
        About
      </Link>
      <Link href="/star-wars" locale="fr" className="text-blue-600 hover:text-blue-800">
        Movies (French)
      </Link>
    </nav>
  )
}
```

## Styling with Tailwind CSS

This project is configured with Tailwind CSS for modern, utility-first styling.

### Basic Usage
```tsx
// Using Tailwind classes directly
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold mb-2">Title</h1>
  <p className="text-blue-100">Description text</p>
</div>
```

### Responsive Design
```tsx
// Responsive utilities
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="bg-white p-6 rounded-lg shadow">Card 1</div>
  <div className="bg-white p-6 rounded-lg shadow">Card 2</div>
  <div className="bg-white p-6 rounded-lg shadow">Card 3</div>
</div>
```

### Component Patterns
```tsx
// Button component with Tailwind
function Button({ children, variant = 'primary', ...props }) {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]}`} 
      {...props}
    >
      {children}
    </button>
  )
}
```

## CSS Files Structure

- `renderer/css/tailwind.css` - Tailwind directives
- `renderer/css/reset.css` - Base reset styles
- `renderer/css/links.css` - Link styling
- `renderer/css/code.css` - Code block styling
- `renderer/css/page-transition-loading-animation.css` - Loading animations
- `renderer/css/index.css` - Main CSS entry point

## Development Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

## Path Aliases

The project uses `$` as an alias for the root directory:
```typescript
import { LocaleText } from '$/locales/LocaleText'
import { Link } from '$/components/Link'
```

This is configured in both `vite.config.ts` and `tsconfig.json`.

## Best Practices

1. **Always use LocaleText** for user-facing text
2. **Use the custom Link component** for navigation
3. **Follow the folder structure** for pages
4. **Add translations** for new text content
5. **Use TypeScript** for type safety
6. **Use Tailwind classes** for styling
7. **Follow responsive design principles**
8. **Test both dev and preview** modes

## Configuration Files

- `vite.config.ts` - Vite configuration with Vike plugin
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.cjs` - ESLint rules
- `.prettierrc.cjs` - Code formatting rules

## Troubleshooting

### Common Issues

1. **Missing translations**: Add keys to `translations.ts`
2. **Routing issues**: Check `+route.ts` files and URL structure
3. **Build failures**: Ensure all imports use correct path aliases
4. **Hydration mismatches**: Check SSR/client code differences
5. **Tailwind styles not working**: Verify PostCSS configuration and file paths in `tailwind.config.js`

### Debug Information
- Check browser console for client-side errors
- Check terminal output for server-side logs
- Use Vike's debug mode by setting `DEBUG=vike:*`
- Use browser dev tools to inspect Tailwind classes

## Architecture Patterns

### Page Components
- Keep pages simple and focused
- Use composition for complex layouts
- Leverage Tailwind for consistent styling

### Data Flow
- Server-side data fetching for initial loads
- Client-side fetching for dynamic content
- Type-safe data with TypeScript

### Internationalization
- Centralized translation management
- URL-based locale detection
- Fallback to default language

This template provides a solid foundation for building modern, internationalized React applications with excellent developer experience and performance.
