# Multilingual Setup Guide

This guide explains how to work with the 6 supported languages in this Vike React i18n template: English, German, French, Chinese (Simplified), Spanish, and Arabic.

## 🌍 Supported Languages

| Language | Code | Direction | Font Support | Flag |
|----------|------|-----------|--------------|------|
| English | `en` | LTR | Default | 🇺🇸 |
| German | `de` | LTR | Default | 🇩🇪 |
| French | `fr` | LTR | Default | 🇫🇷 |
| Chinese (Simplified) | `zh` | LTR | Noto Sans SC | 🇨🇳 |
| Spanish | `es` | LTR | Default | 🇪🇸 |
| Arabic | `ar` | RTL | Noto Sans Arabic | 🇸🇦 |

## 🚀 Quick Start

### Viewing Different Languages

Navigate to different language versions:
- English (default): `http://localhost:3001/`
- German: `http://localhost:3001/de`
- French: `http://localhost:3001/fr`
- Chinese: `http://localhost:3001/zh`
- Spanish: `http://localhost:3001/es`
- Arabic: `http://localhost:3001/ar`

### Language Switcher

The navigation header includes a language switcher with:
- Flag emojis for visual identification
- Native language names (中文, عربي)
- Proper RTL support for Arabic
- Tooltip with full language names

## 📝 Adding Translations

### 1. Update Translation Files

Add new translations to `locales/translations.ts`:

```typescript
export const translations = {
  "Your new text": {
    de: "Ihr neuer Text",
    fr: "Votre nouveau texte",
    zh: "您的新文本",
    es: "Su nuevo texto",
    ar: "النص الجديد الخاص بك",
  },
  // ...existing translations
}
```

### 2. Using Translations in Components

```tsx
import { LocaleText } from '$/locales/LocaleText'
import { LocalizedText } from '$/components/LanguageWrapper'

function MyComponent() {
  return (
    <div>
      {/* Basic translation */}
      <h1>
        <LocaleText>Your new text</LocaleText>
      </h1>
      
      {/* With proper typography for current language */}
      <p>
        <LocalizedText>
          <LocaleText>Your new text</LocaleText>
        </LocalizedText>
      </p>
    </div>
  )
}
```

## 🎨 Typography and Fonts

### Font Configuration

The project includes Google Fonts for optimal display:

```html
<!-- In renderer/+onRenderHtml.tsx -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Tailwind Font Classes

```css
/* In tailwind.config.js */
fontFamily: {
  'arabic': ['Noto Sans Arabic', 'Arial', 'sans-serif'],
  'chinese': ['Noto Sans SC', 'SimSun', 'sans-serif'],
}
```

### Using Language-Specific Typography

```tsx
import { LocalizedText } from '$/components/LanguageWrapper'

// Automatically applies correct font and direction
<LocalizedText className="text-lg">
  <LocaleText>Welcome message</LocaleText>
</LocalizedText>

// Manual font application
<p className="font-chinese">中文文本示例</p>
<p className="font-arabic text-right" dir="rtl">نص عربي</p>
```

## 🔄 Right-to-Left (RTL) Support

### Automatic RTL Detection

The HTML element automatically gets the correct direction:

```html
<!-- For Arabic -->
<html lang="ar" dir="rtl">

<!-- For other languages -->
<html lang="en" dir="ltr">
```

### RTL-Aware Components

```tsx
import { LanguageWrapper } from '$/components/LanguageWrapper'

function MyPage() {
  return (
    <LanguageWrapper>
      {/* Content automatically adapts to language direction */}
      <div className="text-center">
        <LocalizedText>
          <LocaleText>Welcome</LocaleText>
        </LocalizedText>
      </div>
    </LanguageWrapper>
  )
}
```

### Manual RTL Styling

```tsx
// Conditional RTL styling
<div className={locale === 'ar' ? 'text-right rtl' : 'text-left ltr'}>
  Content
</div>

// Using Tailwind RTL utilities
<div className="text-right rtl:text-left">
  This text is right-aligned in RTL, left-aligned in LTR
</div>
```

## 🛠 Development Patterns

### 1. Language-Aware Components

```tsx
import { usePageContext } from '$/renderer/usePageContext'
import { languageConfig } from '$/components/LanguageWrapper'

function MyComponent() {
  const { locale } = usePageContext()
  const config = languageConfig[locale as keyof typeof languageConfig]
  
  return (
    <div className={`${config.fontClass} ${config.direction === 'rtl' ? 'text-right' : 'text-left'}`}>
      <span>{config.flag}</span>
      <LocaleText>Welcome</LocaleText>
    </div>
  )
}
```

### 2. Conditional Content by Language

```tsx
function CulturallyAwareComponent() {
  const { locale } = usePageContext()
  
  const getColorTheme = (locale: string) => {
    switch (locale) {
      case 'zh': return 'bg-red-100 text-red-800' // Red for Chinese culture
      case 'ar': return 'bg-green-100 text-green-800' // Green for Islamic culture
      case 'es': return 'bg-yellow-100 text-yellow-800' // Warm colors for Spanish
      default: return 'bg-blue-100 text-blue-800'
    }
  }
  
  return (
    <div className={`p-4 rounded ${getColorTheme(locale)}`}>
      <LocalizedText>
        <LocaleText>Welcome</LocaleText>
      </LocalizedText>
    </div>
  )
}
```

### 3. Form Handling with Multiple Languages

```tsx
function MultilingualForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  return (
    <form>
      <Input
        label={`${getTranslation('Name')} / 姓名 / الاسم / Nombre`}
        name="name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Enter your name"
      />
      
      <Textarea
        label={`${getTranslation('Message')} / 消息 / الرسالة / Mensaje`}
        name="message"
        value={formData.message}
        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
        className="resize-none"
      />
      
      <Button type="submit">
        <LocalizedText>
          <LocaleText>Send Message</LocaleText>
        </LocalizedText>
      </Button>
    </form>
  )
}
```

## 🌐 URL Structure

### Route Patterns

```
English (default): /page-name
German:            /de/page-name
French:            /fr/page-name
Chinese:           /zh/page-name
Spanish:           /es/page-name
Arabic:            /ar/page-name
```

### Language Detection

The language is detected from the URL automatically:

```typescript
// In locales/extractLocale.ts
function extractLocale(url: string) {
  const segments = url.split('/')
  const maybeLocale = segments[1]
  
  if (locales.includes(maybeLocale as LanguageTag)) {
    return {
      locale: maybeLocale as LanguageTag,
      urlWithoutLocale: '/' + segments.slice(2).join('/')
    }
  }
  
  return {
    locale: localeDefault,
    urlWithoutLocale: url
  }
}
```

## 📱 Responsive Considerations

### Mobile Language Switcher

```tsx
// Responsive language switcher
<div className="flex flex-wrap gap-1 max-w-xs">
  {Object.entries(languageConfig).map(([code, config]) => (
    <a 
      key={code}
      href={code === 'en' ? '/' : `/${code}`}
      className="px-2 py-1 text-xs font-medium rounded flex items-center space-x-1"
      title={config.name}
    >
      <span className="text-sm">{config.flag}</span>
      <span className={`${config.fontClass} hidden sm:inline`}>
        {config.name}
      </span>
    </a>
  ))}
</div>
```

### Touch-Friendly RTL

```css
/* Additional RTL-specific mobile styles */
.rtl .mobile-menu {
  right: auto;
  left: 0;
}

.rtl .slide-in {
  transform: translateX(-100%);
}
```

## 🧪 Testing Multilingual Features

### Testing Different Languages

```bash
# Test each language endpoint
curl http://localhost:3001/        # English
curl http://localhost:3001/de      # German
curl http://localhost:3001/fr      # French
curl http://localhost:3001/zh      # Chinese
curl http://localhost:3001/es      # Spanish
curl http://localhost:3001/ar      # Arabic
```

### Visual Testing Checklist

- [ ] Text displays correctly in all languages
- [ ] Arabic text appears right-to-left
- [ ] Chinese characters render with proper font
- [ ] Language switcher is accessible
- [ ] Forms work in all languages
- [ ] Navigation adapts to text direction
- [ ] Mobile responsiveness maintained

### Translation Quality

```typescript
// Helper to find missing translations
function findMissingTranslations() {
  const languages = ['de', 'fr', 'zh', 'es', 'ar']
  const missing: Record<string, string[]> = {}
  
  Object.entries(translations).forEach(([key, value]) => {
    languages.forEach(lang => {
      if (!value[lang]) {
        if (!missing[lang]) missing[lang] = []
        missing[lang].push(key)
      }
    })
  })
  
  return missing
}
```

## 🚀 Deployment Considerations

### SEO and hreflang

The template automatically generates hreflang tags:

```html
<link rel="alternate" hreflang="en" href="https://example.com/" />
<link rel="alternate" hreflang="de" href="https://example.com/de" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr" />
<link rel="alternate" hreflang="zh" href="https://example.com/zh" />
<link rel="alternate" hreflang="es" href="https://example.com/es" />
<link rel="alternate" hreflang="ar" href="https://example.com/ar" />
```

### Server Configuration

Ensure your server handles language routes correctly:

```nginx
# Nginx example
location ~ ^/(de|fr|zh|es|ar)(/.*)?$ {
    try_files $uri $uri/ /index.html;
}
```

### Performance Optimization

- Google Fonts are preconnected for faster loading
- Font files are loaded with `display=swap` for better perceived performance
- Translations are bundled efficiently
- RTL styles are applied conditionally

## 🔧 Advanced Configuration

### Adding New Languages

1. Update `locales/types.ts`:
```typescript
type LanguageTag = "en" | "fr" | "de" | "zh" | "es" | "ar" | "ja" // Add Japanese
```

2. Update `locales/locales.ts`:
```typescript
export const locales: LanguageTag[] = ["en", "de", "fr", "zh", "es", "ar", "ja"]
```

3. Add translations in `locales/translations.ts`

4. Update `LanguageWrapper.tsx` with new language configuration

### Custom Font Loading

```typescript
// For additional languages requiring special fonts
const fontMap = {
  'ja': 'font-japanese', // Japanese
  'ko': 'font-korean',   // Korean
  'th': 'font-thai',     // Thai
  'hi': 'font-hindi',    // Hindi
}
```

This comprehensive setup provides robust multilingual support with proper typography, direction handling, and cultural considerations for a truly international application.
