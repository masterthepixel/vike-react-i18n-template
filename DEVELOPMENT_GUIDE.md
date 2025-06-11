# Development Guide

This guide provides practical examples and patterns for developing with this Vike React i18n template.

## Quick Development Workflow

### 1. Starting Development
```bash
# Start the development server
pnpm dev

# The server will be available at http://localhost:3001
# Hot reloading is enabled for instant feedback
```

### 2. Creating a New Feature Page

Let's create a "Products" page with internationalization and Tailwind styling:

```bash
# Create the page directory
mkdir pages/products
```

**pages/products/+Page.tsx**
```tsx
import React from "react"
import { LocaleText } from '$/locales/LocaleText'
import { Layout } from '$/components/Layout'
import { Card } from '$/components/Card'
import { Button } from '$/components/Button'

export default function Page() {
  const products = [
    { id: 1, name: "Product 1", price: "$99" },
    { id: 2, name: "Product 2", price: "$149" },
    { id: 3, name: "Product 3", price: "$199" },
  ]

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          <LocaleText>Our Products</LocaleText>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Card key={product.id}>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}</p>
              <Button className="w-full">
                <LocaleText>Add to Cart</LocaleText>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
```

### 3. Adding Translations

**locales/translations.ts** (add these entries):
```typescript
export const translations = {
  // ...existing translations...
  "Our Products": {
    de: "Unsere Produkte",
    fr: "Nos Produits",
  },
  "Add to Cart": {
    de: "In den Warenkorb",
    fr: "Ajouter au Panier",
  },
}
```

### 4. Adding Data Fetching

**pages/products/+data.ts**
```typescript
export { data }

interface Product {
  id: number
  name: string
  price: string
  description: string
}

async function data(): Promise<{ products: Product[] }> {
  // Simulate API call
  const products: Product[] = [
    { id: 1, name: "Product 1", price: "$99", description: "Description 1" },
    { id: 2, name: "Product 2", price: "$149", description: "Description 2" },
    { id: 3, name: "Product 3", price: "$199", description: "Description 3" },
  ]
  
  return { products }
}
```

**Updated pages/products/+Page.tsx**
```tsx
import { useData } from '$/renderer/useData'
import type { Data } from './+data'

export default function Page() {
  const { products } = useData<Data>()
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          <LocaleText>Our Products</LocaleText>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Card key={product.id}>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}</p>
              <Button className="w-full">
                <LocaleText>Add to Cart</LocaleText>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
```

## Common Development Patterns

### 1. Responsive Design with Tailwind

```tsx
// Mobile-first responsive grid
<div className="
  grid 
  grid-cols-1       // 1 column on mobile
  sm:grid-cols-2    // 2 columns on small screens
  md:grid-cols-3    // 3 columns on medium screens
  lg:grid-cols-4    // 4 columns on large screens
  gap-4             // Consistent gap
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Responsive typography
<h1 className="
  text-2xl          // Base size
  sm:text-3xl       // Larger on small screens
  md:text-4xl       // Even larger on medium screens
  lg:text-5xl       // Largest on large screens
  font-bold 
  text-gray-900
">
  Responsive Heading
</h1>

// Responsive spacing
<div className="
  p-4              // Padding on mobile
  md:p-6           // More padding on medium screens
  lg:p-8           // Most padding on large screens
">
  Content
</div>
```

### 2. Form Handling with Validation

```tsx
import React, { useState } from 'react'
import { Input, Textarea } from '$/components/Form'
import { Button } from '$/components/Button'
import { Card, CardHeader, CardContent } from '$/components/Card'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      // Submit form data
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      // Reset form
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">
          <LocaleText>Contact Us</LocaleText>
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            error={errors.name}
            required
          />
          
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            error={errors.email}
            required
          />
          
          <Textarea
            label="Message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            error={errors.message}
            rows={4}
            required
          />
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Sending...' : <LocaleText>Send Message</LocaleText>}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### 3. Loading States and Error Handling

```tsx
import React, { useState, useEffect } from 'react'

function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/data')
      if (!response.ok) throw new Error('Failed to fetch')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-red-800">{error}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 text-red-600 border-red-300 hover:bg-red-50"
          onClick={fetchData}
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div>
      {/* Render data */}
    </div>
  )
}
```

### 4. Custom Hooks for Reusable Logic

```tsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}

// Usage
function UserPreferences() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [language, setLanguage] = useLocalStorage('language', 'en')

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

## Performance Optimization

### 1. Code Splitting by Route
Vike automatically splits code by route, but you can also use dynamic imports:

```tsx
import React, { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <Suspense fallback={
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
      }>
        <HeavyComponent />
      </Suspense>
    </div>
  )
}
```

### 2. Image Optimization

```tsx
// components/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
}

export function OptimizedImage({ src, alt, className, sizes }: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      sizes={sizes}
      style={{ aspectRatio: 'auto' }}
    />
  )
}
```

### 3. Memoization for Heavy Computations

```tsx
import React, { useMemo } from 'react'

function ExpensiveList({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name))
  }, [items, filter])

  return (
    <div className="space-y-2">
      {filteredItems.map(item => (
        <Card key={item.id}>
          <CardContent>
            <h3 className="font-semibold">{item.name}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

## Testing Strategies

### 1. Component Testing Setup

```tsx
// __tests__/Button.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../components/Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-gray-600')
  })
})
```

### 2. Integration Testing

```tsx
// __tests__/ProductsPage.test.tsx
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ProductsPage from '../pages/products/+Page'

// Mock the data hook
jest.mock('../renderer/useData', () => ({
  useData: () => ({
    products: [
      { id: 1, name: 'Test Product', price: '$99', description: 'Test description' }
    ]
  })
}))

describe('Products Page', () => {
  it('displays products correctly', async () => {
    render(<ProductsPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument()
      expect(screen.getByText('$99')).toBeInTheDocument()
    })
  })
})
```

## Deployment

### 1. Build for Production

```bash
# Build the application
pnpm build

# The built files will be in the dist/ directory
# You can preview the build with:
pnpm preview
```

### 2. Environment Variables

Create `.env.production`:
```bash
VITE_API_URL=https://api.myapp.com
VITE_APP_TITLE=My Production App
```

### 3. Static Deployment (Netlify, Vercel)

The built application can be deployed to any static hosting service. The pre-rendered pages will be served as static HTML with client-side hydration.

### 4. Server Deployment (Node.js)

For SSR deployment, you'll need a Node.js server. The build output includes both static assets and server files.

This guide should get you up and running with developing modern, internationalized React applications using this template. Remember to check the existing pages and components for more examples and patterns!
