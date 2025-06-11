# Tailwind CSS Setup Guide

This project is now configured with Tailwind CSS v4 for modern, utility-first styling.

## What's Included

The following files have been added/configured for Tailwind CSS:

- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration with Tailwind and Autoprefixer
- `renderer/css/tailwind.css` - Tailwind directives
- Updated `renderer/css/index.css` - Imports Tailwind styles

## Installation Complete

Tailwind CSS and its dependencies are already installed:
- `tailwindcss@latest`
- `postcss@latest` 
- `autoprefixer@latest`

## Usage Examples

### Basic Styling
```tsx
// pages/about/+Page.tsx - Updated with Tailwind
import React from "react"
import { LocaleText } from '$/locales/LocaleText'

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        <LocaleText>Hello</LocaleText>
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        <LocaleText>Another page</LocaleText>.
      </p>
    </div>
  )
}
```

### Layout Components
```tsx
// components/Layout.tsx - Example layout with Tailwind
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">
                My App
              </h1>
              <div className="hidden md:flex space-x-6">
                <a href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
                <a href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 My App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
```

### Card Components
```tsx
// components/Card.tsx - Reusable card component
interface CardProps {
  title: string
  description: string
  image?: string
  children?: React.ReactNode
}

export function Card({ title, description, image, children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        {children}
      </div>
    </div>
  )
}
```

### Button Components
```tsx
// components/Button.tsx - Styled button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Form Components
```tsx
// components/Input.tsx - Styled input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input 
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
```

### Grid Layouts
```tsx
// Example grid layout for a page
export default function GridPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Featured Content
      </h1>
      
      {/* Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card 
          title="Card 1" 
          description="This is a description for card 1"
        />
        <Card 
          title="Card 2" 
          description="This is a description for card 2"
        />
        <Card 
          title="Card 3" 
          description="This is a description for card 3"
        />
      </div>
      
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Welcome to Our Platform
        </h2>
        <p className="text-xl mb-6 opacity-90">
          Build amazing applications with our tools
        </p>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
          Get Started
        </Button>
      </div>
    </div>
  )
}
```

## Responsive Design

Tailwind provides responsive utilities with breakpoint prefixes:

```tsx
<div className="
  w-full           // Full width on mobile
  md:w-1/2         // Half width on tablet
  lg:w-1/3         // One third on desktop
  xl:w-1/4         // One quarter on large screens
">
  Responsive content
</div>
```

## Dark Mode Support

To enable dark mode, update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./renderer/**/*.{js,ts,jsx,tsx,mdx}",
    "./locales/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Then use dark mode classes:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content that adapts to dark mode
</div>
```

## Custom Styles

For custom styles, you can:

1. **Extend the theme** in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      brand: {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a',
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    }
  }
}
```

2. **Add custom CSS** in `renderer/css/tailwind.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
  }
}
```

## IntelliSense Setup

Install the "Tailwind CSS IntelliSense" VS Code extension for:
- Autocomplete for class names
- Linting and validation
- Hover previews
- Syntax highlighting

## Purging/Tree-shaking

Tailwind automatically removes unused styles in production builds. Make sure your content paths in `tailwind.config.js` include all files that use Tailwind classes.

## Migration from Existing CSS

You can gradually migrate from the existing CSS:

1. **Keep current CSS** files for complex animations and specific styles
2. **Replace common patterns** with Tailwind utilities:
   - `margin: 1rem` → `m-4`
   - `padding: 0.5rem 1rem` → `px-4 py-2`
   - `background-color: #3b82f6` → `bg-blue-500`

3. **Update components** one at a time with Tailwind classes

## Performance

Tailwind CSS is optimized for production:
- Unused styles are automatically purged
- CSS is minified and optimized
- Critical CSS can be inlined
- Supports HTTP/2 push for better caching

## Best Practices

1. **Use semantic class names** for complex components
2. **Leverage responsive utilities** for mobile-first design
3. **Create reusable components** instead of repeating class combinations
4. **Use Tailwind's color palette** for consistency
5. **Follow accessibility guidelines** with focus and contrast utilities
6. **Test responsive behavior** across different screen sizes

Your Tailwind CSS setup is complete and ready to use! Start by updating your existing components with Tailwind classes for a modern, maintainable styling approach.
