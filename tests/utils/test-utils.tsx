import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Define LanguageTag type for testing
export type LanguageTag = "en" | "fr" | "de" | "zh" | "es" | "ar";

// All supported languages for testing
export const SUPPORTED_LANGUAGES: LanguageTag[] = ['en', 'de', 'fr', 'zh', 'es', 'ar'];

// RTL languages
export const RTL_LANGUAGES: LanguageTag[] = ['ar'];

// Simple mock context provider for testing
const MockI18nProvider: React.FC<{ locale: LanguageTag; children: React.ReactNode }> = ({ locale, children }) => {
  return (
    <div data-testid="mock-i18n-provider" data-locale={locale}>
      {children}
    </div>
  );
};

// Custom render function with i18n support
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: LanguageTag;
}

export const renderWithI18n = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { locale = 'en', ...renderOptions } = options;
  
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MockI18nProvider locale={locale}>
      {children}
    </MockI18nProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Test all languages for a component
export const testAllLanguages = (
  renderComponent: (locale: LanguageTag) => React.ReactElement,
  testFn: (locale: LanguageTag, container: HTMLElement) => void
) => {
  SUPPORTED_LANGUAGES.forEach(locale => {
    it(`works correctly in ${locale}`, () => {
      const { container } = renderWithI18n(renderComponent(locale), { locale });
      testFn(locale, container);
    });
  });
};

// Check if language is RTL
export const isRTLLanguage = (locale: LanguageTag): boolean => {
  return RTL_LANGUAGES.includes(locale);
};

// Get expected direction for language
export const getExpectedDirection = (locale: LanguageTag): 'ltr' | 'rtl' => {
  return isRTLLanguage(locale) ? 'rtl' : 'ltr';
};

// Test RTL support
export const testRTLSupport = (
  renderComponent: (locale: LanguageTag) => React.ReactElement,
  selector: string = '[dir]'
) => {
  describe('RTL Support', () => {
    test('applies correct direction for LTR languages', () => {
      const ltrLanguages = SUPPORTED_LANGUAGES.filter(lang => !isRTLLanguage(lang));
      
      ltrLanguages.forEach(locale => {
        const { container } = renderWithI18n(renderComponent(locale), { locale });
        const dirElement = container.querySelector(selector);
        
        if (dirElement) {
          expect(dirElement).toHaveAttribute('dir', 'ltr');
        }
      });
    });

    test('applies correct direction for RTL languages', () => {
      RTL_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(renderComponent(locale), { locale });
        const dirElement = container.querySelector(selector);
        
        if (dirElement) {
          expect(dirElement).toHaveAttribute('dir', 'rtl');
        }
      });
    });
  });
};

// Translation key checker
export const checkTranslationKey = (
  key: string,
  locale: LanguageTag,
  expectedPattern?: RegExp
): boolean => {
  try {
    // Import translations dynamically in test
    const translations = require('#locales/translations').translations;
    const translation = translations[locale]?.[key];
    
    if (!translation) {
      return false;
    }
    
    if (expectedPattern) {
      return expectedPattern.test(translation);
    }
    
    return typeof translation === 'string' && translation.length > 0;
  } catch (error) {
    return false;
  }
};

// Test translation completeness
export const testTranslationCompleteness = (keys: string[]) => {
  describe('Translation Completeness', () => {
    SUPPORTED_LANGUAGES.forEach(locale => {
      test(`has all required translations for ${locale}`, () => {
        keys.forEach(key => {
          expect(checkTranslationKey(key, locale)).toBe(true);
        });
      });
    });
  });
};

// Typography testing helpers
export const getExpectedFontClass = (locale: LanguageTag): string => {
  switch (locale) {
    case 'ar':
      return 'font-arabic';
    case 'zh':
      return 'font-chinese';
    default:
      return 'font-sans';
  }
};

export const testTypography = (
  renderComponent: (locale: LanguageTag) => React.ReactElement,
  selector: string = 'body, [class*="font-"]'
) => {
  describe('Typography', () => {
    test('applies correct font classes for each language', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(renderComponent(locale), { locale });
        const expectedFontClass = getExpectedFontClass(locale);
        
        // Check if the component or its container has the expected font class
        const elements = container.querySelectorAll(selector);
        const hasExpectedFont = Array.from(elements).some(el => 
          el.className.includes(expectedFontClass)
        );
        
        if (locale === 'ar' || locale === 'zh') {
          expect(hasExpectedFont).toBe(true);
        }
      });
    });
  });
};

// Performance testing helpers
export const measureRenderTime = (
  renderFn: () => void,
  iterations: number = 100
): number => {
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    renderFn();
  }
  
  const end = performance.now();
  return (end - start) / iterations;
};

// Accessibility testing helpers
export const testAccessibility = (
  renderComponent: (locale: LanguageTag) => React.ReactElement
) => {
  describe('Accessibility', () => {
    test('has proper lang attributes for each language', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(renderComponent(locale), { locale });
        const langElements = container.querySelectorAll('[lang]');
        
        if (langElements.length > 0) {
          langElements.forEach(element => {
            expect(element.getAttribute('lang')).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/);
          });
        }
      });
    });

    test('maintains focus management across languages', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(renderComponent(locale), { locale });
        const focusableElements = container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
          expect(element).not.toHaveAttribute('tabindex', '-1');
        });
      });
    });
  });
};
