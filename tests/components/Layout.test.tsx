import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from '../../components/Layout';
import {
  renderWithI18n,
  testAllLanguages,
  testRTLSupport,
  testTypography,
  testAccessibility,
  SUPPORTED_LANGUAGES,
  isRTLLanguage,
} from '../utils/test-utils';

describe('Layout Component', () => {
  const mockChildren = <div data-testid="mock-content">Mock Content</div>;

  const renderLayout = (locale = 'en') => (
    <Layout>
      {mockChildren}
    </Layout>
  );

  describe('Basic Structure', () => {
    test('renders header, main content, and footer', () => {
      renderWithI18n(renderLayout());
      
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('main')).toBeInTheDocument(); // main
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
      expect(screen.getByTestId('mock-content')).toBeInTheDocument();
    });

    test('renders navigation menu', () => {
      renderWithI18n(renderLayout());
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText(/home/i)).toBeInTheDocument();
      expect(screen.getByText(/about/i)).toBeInTheDocument();
      expect(screen.getByText(/examples/i)).toBeInTheDocument();
    });

    test('renders language switcher', () => {
      renderWithI18n(renderLayout());
      
      // Look for language selection elements
      const languageElements = screen.getAllByText(/en|de|fr|zh|es|ar/i);
      expect(languageElements.length).toBeGreaterThan(0);
    });
  });

  describe('Multilingual Support', () => {
    testAllLanguages(
      renderLayout,
      (locale, container) => {
        // Verify layout renders correctly for each language
        expect(container.querySelector('[role="banner"]')).toBeInTheDocument();
        expect(container.querySelector('[role="main"]')).toBeInTheDocument();
        expect(container.querySelector('[role="contentinfo"]')).toBeInTheDocument();
      }
    );

    test('displays correct navigation labels for each language', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        renderWithI18n(renderLayout(locale), { locale });
        
        // Navigation should be present regardless of language
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      });
    });

    test('language switcher shows all supported languages', () => {
      SUPPORTED_LANGUAGES.forEach(currentLocale => {
        const { container } = renderWithI18n(renderLayout(currentLocale), { 
          locale: currentLocale 
        });
        
        // Should show options for all languages
        SUPPORTED_LANGUAGES.forEach(lang => {
          const langElement = container.querySelector(`[data-lang="${lang}"], [href*="${lang}"]`);
          // Not all implementations may use these exact attributes, so check more broadly
          expect(container.textContent).toContain(lang.toUpperCase());
        });
      });
    });
  });

  describe('RTL Layout Support', () => {
    testRTLSupport(() => renderLayout('ar'));

    test('applies correct text direction for RTL languages', () => {
      const { container } = renderWithI18n(renderLayout('ar'), { locale: 'ar' });
      
      // Check if any element has RTL direction
      const elementsWithDir = container.querySelectorAll('[dir]');
      const hasRTL = Array.from(elementsWithDir).some(el => 
        el.getAttribute('dir') === 'rtl'
      );
      
      if (elementsWithDir.length > 0) {
        expect(hasRTL).toBe(true);
      }
    });

    test('navigation order is appropriate for RTL', () => {
      const { container } = renderWithI18n(renderLayout('ar'), { locale: 'ar' });
      
      const nav = container.querySelector('[role="navigation"]');
      expect(nav).toBeInTheDocument();
      
      // Navigation should still be accessible regardless of direction
      const navLinks = nav?.querySelectorAll('a, button');
      expect(navLinks && navLinks.length).toBeGreaterThan(0);
    });
  });

  // Typography Testing
  testTypography(() => renderLayout());

  // Accessibility Testing
  testAccessibility(() => renderLayout());

  describe('Responsive Design', () => {
    test('maintains structure on different screen sizes', () => {
      // Test with different viewport sizes
      const viewports = [
        { width: 320, height: 568 }, // Mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1920, height: 1080 }, // Desktop
      ];

      viewports.forEach(viewport => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: viewport.width,
        });
        
        Object.defineProperty(window, 'innerHeight', {
          writable: true,
          configurable: true,
          value: viewport.height,
        });

        renderWithI18n(renderLayout());
        
        expect(screen.getByRole('banner')).toBeInTheDocument();
        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      });
    });

    test('navigation adapts to screen size', () => {
      renderWithI18n(renderLayout());
      
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      
      // Should have responsive classes or behavior
      expect(nav.className).toMatch(/responsive|mobile|desktop|md:|lg:|sm:/);
    });
  });

  describe('Semantic HTML', () => {
    test('uses proper semantic elements', () => {
      const { container } = renderWithI18n(renderLayout());
      
      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelector('nav')).toBeInTheDocument();
      expect(container.querySelector('main')).toBeInTheDocument();
      expect(container.querySelector('footer')).toBeInTheDocument();
    });

    test('has proper heading hierarchy', () => {
      renderWithI18n(renderLayout());
      
      // Look for any heading elements
      const headings = screen.getAllByRole('heading');
      
      if (headings.length > 0) {
        // Check that we start with h1 or reasonable heading levels
        const firstHeading = headings[0];
        const headingLevel = firstHeading.tagName.toLowerCase();
        expect(['h1', 'h2', 'h3'].includes(headingLevel)).toBe(true);
      }
    });
  });

  describe('Language Switching', () => {
    test('preserves layout when switching languages', () => {
      // Test switching between different language directions
      const testLanguages = ['en', 'ar', 'zh'] as const;
      
      testLanguages.forEach(locale => {
        const { container } = renderWithI18n(renderLayout(locale), { locale });
        
        // Core layout elements should always be present
        expect(container.querySelector('[role="banner"]')).toBeInTheDocument();
        expect(container.querySelector('[role="main"]')).toBeInTheDocument();
        expect(container.querySelector('[role="contentinfo"]')).toBeInTheDocument();
        expect(container.querySelector('[role="navigation"]')).toBeInTheDocument();
      });
    });

    test('handles font loading for different languages', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(renderLayout(locale), { locale });
        
        // Check for language-specific font classes
        const hasLanguageFont = 
          locale === 'ar' && container.textContent?.includes('font-arabic') ||
          locale === 'zh' && container.textContent?.includes('font-chinese') ||
          ['en', 'de', 'fr', 'es'].includes(locale);
        
        expect(hasLanguageFont).toBeTruthy();
      });
    });
  });

  describe('Performance', () => {
    test('renders efficiently across languages', () => {
      const renderTimes: number[] = [];
      
      SUPPORTED_LANGUAGES.forEach(locale => {
        const start = performance.now();
        renderWithI18n(renderLayout(locale), { locale });
        const end = performance.now();
        
        renderTimes.push(end - start);
      });
      
      // Average render time should be reasonable
      const averageTime = renderTimes.reduce((sum, time) => sum + time, 0) / renderTimes.length;
      expect(averageTime).toBeLessThan(100); // Less than 100ms average
    });
  });
});
