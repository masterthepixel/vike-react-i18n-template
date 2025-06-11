# Vike React i18n Template with Tailwind CSS

A modern, full-featured React application template built with Vike (formerly Vite-plugin-ssr) that demonstrates internationalization (i18n), multiple render modes, and modern web development practices with Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📚 Documentation

- **[INSTRUCTIONS.md](./INSTRUCTIONS.md)** - Comprehensive project documentation
- **[TAILWIND_SETUP.md](./TAILWIND_SETUP.md)** - Tailwind CSS usage guide and examples
- **[MULTILINGUAL_GUIDE.md](./MULTILINGUAL_GUIDE.md)** - Complete multilingual development guide
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Practical development patterns
- **[TESTING_FRAMEWORK.md](./TESTING_FRAMEWORK.md)** - Comprehensive multilingual testing framework
- **[TESTING_STATUS.md](./TESTING_STATUS.md)** - Current testing implementation status

## ✨ Features

### Core Features
- **🌍 Advanced Internationalization** - 6 languages with RTL support for Arabic
- **🎭 Multiple Render Modes** - SSR, SPA, and static HTML generation
- **📊 Data Fetching** - Server-side fetching + isomorphic fetching
- **⚡ Pre-rendering** - Static site generation with the `prerender()` hook
- **📘 TypeScript** - Full TypeScript support throughout
- **🛡️ Error Handling** - Custom error pages
- **🔗 Active Links** - Automatic active link highlighting
- **🌊 HTML Streaming** - Optimized server-side rendering
- **🎬 Page Transitions** - Loading animations between pages

### Modern Styling & Typography
- **🎨 Tailwind CSS v4** - Latest version with modern utility-first styling
- **📱 Responsive Design** - Mobile-first approach with Tailwind utilities
- **🔤 Multilingual Typography** - Google Fonts (Noto Sans Arabic, Noto Sans SC)
- **↔️ RTL Support** - Right-to-left text direction for Arabic
- **🧩 Component Library** - Pre-built components with Tailwind classes
- **🌙 Dark Mode Ready** - Easy to implement with Tailwind's dark mode utilities

### Testing & Quality Assurance
- **🧪 Comprehensive Testing Framework** - Multilingual component and integration testing
- **📊 Translation Validation** - 100% coverage across all 6 languages
- **🌐 RTL Testing** - Automated Right-to-Left layout validation
- **♿ Accessibility Testing** - WCAG compliance validation across languages
- **⚡ Performance Testing** - Render time monitoring across languages
- **📈 Quality Metrics** - Automated translation quality and coverage reporting

### Development Experience
- **⚡ Hot Module Replacement** - Fast development with Vite
- **🛣️ Path Aliases** - Clean imports with `$` alias
- **🔍 ESLint & Prettier** - Code quality and formatting
- **🔒 Type Safety** - Comprehensive TypeScript configuration

## 🌍 Multilingual Support

**6 Languages Supported:**
- 🇺🇸 **English** (default) - `/about`
- 🇩🇪 **German** - `/de/about` 
- 🇫🇷 **French** - `/fr/about`
- 🇨🇳 **Chinese (Simplified)** - `/zh/about`
- 🇪🇸 **Spanish** - `/es/about`
- 🇸🇦 **Arabic** - `/ar/about` (RTL support)

### Adding Translations
```typescript
// locales/translations.ts
export const translations = {
  "Your new key": {
    de: "Ihr neuer Schlüssel",
    fr: "Votre nouvelle clé",
    zh: "您的新键",
    es: "Su nueva clave",
    ar: "مفتاحك الجديد",
  },
}
```

```tsx
// Usage in components
import { LocaleText } from '$/locales/LocaleText'

function MyComponent() {
  return <LocaleText>Your new key</LocaleText>
}
```

## 🎨 Styling with Tailwind

### Basic Example
```tsx
<div className="max-w-4xl mx-auto px-4 py-8">
  <h1 className="text-4xl font-bold text-gray-900 mb-6">
    <LocaleText>Page Title</LocaleText>
  </h1>
  <p className="text-lg text-gray-600 leading-relaxed">
    Content with beautiful typography
  </p>
</div>
```

### Responsive Design
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="bg-white p-6 rounded-lg shadow-md">Card 1</div>
  <div className="bg-white p-6 rounded-lg shadow-md">Card 2</div>
  <div className="bg-white p-6 rounded-lg shadow-md">Card 3</div>
</div>
```

## 📁 Project Structure

```
├── pages/                 # Page components and routing
│   ├── about/            # About page with Tailwind examples
│   ├── hello/            # Demo page with data fetching
│   └── star-wars/        # Client-routed example
├── components/           # Reusable React components
├── locales/             # Internationalization system
├── renderer/            # Vike configuration and rendering
│   └── css/            # Stylesheets including Tailwind
├── types/              # TypeScript type definitions
└── demo-utils/         # Utility functions and types
```

## 🛠 Development Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm type-check   # TypeScript type checking
pnpm clean        # Clean build artifacts

# Testing commands
pnpm test              # Run all tests
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage report
pnpm test:i18n         # Run translation validation tests
pnpm test:components   # Run component tests
pnpm test:integration  # Run integration tests
pnpm test:report       # Generate translation quality report
pnpm test:all          # Run complete test suite
```

## 🧪 Testing Framework

This template includes a comprehensive multilingual testing framework:

### Translation Quality Validation
- **100% Translation Coverage** across all 6 languages
- **Automated Quality Checks** for missing, empty, or duplicate translations
- **Length Constraint Validation** ensuring text fits in UI components
- **Pattern Compliance** for consistent formatting across languages

### Multilingual Component Testing
- **Cross-Language Testing** with `testAllLanguages()` utility
- **RTL Layout Testing** for Arabic right-to-left support
- **Typography Testing** for language-specific font handling
- **Accessibility Testing** across all languages with WCAG compliance

### Performance & Integration
- **Render Performance** monitoring across languages
- **State Management** testing during language switching
- **Error Handling** validation for missing translations
- **Visual Regression** prevention for layout consistency

See [TESTING_FRAMEWORK.md](./TESTING_FRAMEWORK.md) for detailed testing documentation.

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration with Vike plugin
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS with Tailwind and Autoprefixer
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.cjs` - ESLint rules
- `.prettierrc.cjs` - Code formatting rules

## 🏗 Creating New Pages

1. Create a new directory in `pages/`
2. Add `+Page.tsx` with your component
3. Optionally add `+data.ts` for data fetching
4. Use `LocaleText` for internationalized content
5. Style with Tailwind CSS utilities

Example:
```tsx
// pages/my-page/+Page.tsx
import React from "react"
import { LocaleText } from '$/locales/LocaleText'

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        <LocaleText>My Page</LocaleText>
      </h1>
    </div>
  )
}
```

## 🌟 Best Practices

1. **Use LocaleText** for all user-facing text
2. **Leverage Tailwind utilities** for consistent styling
3. **Follow responsive design** with mobile-first approach
4. **Create reusable components** for common patterns
5. **Use TypeScript** for type safety
6. **Test across different locales** and screen sizes

## 🐛 Troubleshooting

### Common Issues
- **Missing translations**: Add keys to `locales/translations.ts`
- **Routing issues**: Check `+route.ts` files and URL structure
- **Tailwind not working**: Verify PostCSS configuration and content paths
- **Build failures**: Ensure correct path aliases and imports

### Debug Mode
Set environment variable for detailed logging:
```bash
DEBUG=vike:* pnpm dev
```

## 📈 Performance

- **Automatic code splitting** by route
- **Optimized CSS** with Tailwind's purging
- **Server-side rendering** for fast initial loads
- **Static generation** for cacheable pages
- **Modern build tooling** with Vite

## 🤝 Contributing

1. Follow the existing code style
2. Add translations for new user-facing text
3. Use TypeScript for new code
4. Test changes across different locales
5. Update documentation when needed

---

**Ready to build amazing multilingual React applications with modern styling!** 🎉
