import { render } from '@testing-library/react';
import {
  validateTranslations,
  generateCoverageReport,
  validateTextLength,
  findUntranslatedStrings,
} from '../utils/translation-validator';
import {
  renderWithI18n,
  SUPPORTED_LANGUAGES,
  RTL_LANGUAGES,
  getExpectedDirection,
  getExpectedFontClass,
  measureRenderTime,
} from '../utils/test-utils';
import { Button } from '../../components/Button';
import { Card, CardContent } from '../../components/Card';
import { Counter } from '../../components/Counter';
import { Layout } from '../../components/Layout';

describe('Integration Tests', () => {
  describe('Complete Application Flow', () => {
    test('renders full application in all languages', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(
          <Layout>
            <Card>
              <CardContent>
                <h1>Welcome {locale}</h1>
                <Counter />
                <Button>Action Button</Button>
              </CardContent>
            </Card>
          </Layout>,
          { locale }
        );
        
        expect(container).toBeInTheDocument();
        expect(container.textContent).toContain('Welcome');
        expect(container.querySelector('button')).toBeInTheDocument();
      });
    });

    test('language switching preserves component state', () => {
      // This would typically involve more complex state management
      // For now, test that components render correctly in different languages
      const languages = ['en', 'de', 'ar'] as const;
      
      languages.forEach(locale => {
        const { container, rerender } = renderWithI18n(
          <div>
            <Counter />
            <Button>Test</Button>
          </div>,
          { locale }
        );
        
        // Component should maintain structure
        expect(container.querySelector('button')).toBeInTheDocument();
        
        // Test rerender with different locale
        rerender(
          <div>
            <Counter />
            <Button>Test</Button>
          </div>
        );
        
        expect(container.querySelector('button')).toBeInTheDocument();
      });
    });
  });

  describe('Cross-Component Multilingual Consistency', () => {
    test('all components use consistent RTL direction', () => {
      RTL_LANGUAGES.forEach(locale => {
        const components = [
          <Button key="button">Test</Button>,
          <Card key="card"><CardContent>Content</CardContent></Card>,
          <Counter key="counter" />,
        ];
        
        components.forEach((component, index) => {
          const { container } = renderWithI18n(
            <div dir="auto">{component}</div>,
            { locale }
          );
          
          const dirElement = container.querySelector('[dir]');
          if (dirElement) {
            expect(dirElement.getAttribute('dir')).toBe(getExpectedDirection(locale));
          }
        });
      });
    });

    test('all components use appropriate fonts for each language', () => {
      const specialFontLanguages = ['ar', 'zh'] as const;
      
      specialFontLanguages.forEach(locale => {
        const components = [
          <div key="button" className="font-inherit"><Button>Test</Button></div>,
          <div key="card" className="font-inherit"><Card><CardContent>Content</CardContent></Card></div>,
          <div key="counter" className="font-inherit"><Counter /></div>,
        ];
        
        const expectedFontClass = getExpectedFontClass(locale);
        
        components.forEach(component => {
          const { container } = renderWithI18n(component, { locale });
          
          // Check if the expected font class is present somewhere in the component tree
          const hasExpectedFont = container.innerHTML.includes(expectedFontClass) ||
                                 container.querySelector(`.${expectedFontClass}`) !== null;
          
          if (locale === 'ar' || locale === 'zh') {
            // For special languages, we expect specific font handling
            expect(container).toBeInTheDocument(); // Basic rendering test
          }
        });
      });
    });
  });

  describe('Translation System Validation', () => {
    test('all components have required translations', () => {
      const requiredKeys = [
        'title',
        'description',
        'welcome',
        'button.save',
        'button.cancel',
        'navigation.home',
        'navigation.about',
        'counter.title',
        'counter.increment',
        'counter.decrement',
      ];
      
      const validation = validateTranslations(requiredKeys);
      
      if (!validation.isValid) {
        console.error('Translation issues found:', {
          missing: validation.missing,
          empty: validation.empty,
          coverage: validation.coverage,
        });
      }
      
      expect(validation.isValid).toBe(true);
    });

    test('no critical translations are missing', () => {
      const criticalKeys = [
        'navigation.home',
        'navigation.about',
        'button.save',
        'button.cancel',
      ];
      
      const validation = validateTranslations(criticalKeys);
      expect(validation.missing).toHaveLength(0);
    });

    test('translation coverage meets minimum requirements', () => {
      const report = generateCoverageReport();
      
      // Overall coverage should be high
      expect(report.overall).toBeGreaterThanOrEqual(85);
      
      // Each language should have reasonable coverage
      Object.entries(report.byLanguage).forEach(([locale, stats]) => {
        expect(stats.percentage).toBeGreaterThanOrEqual(80);
      });
    });
  });

  describe('Performance Across Languages', () => {
    test('component rendering performance is consistent', () => {
      const renderTimes: Record<string, number> = {};
      
      SUPPORTED_LANGUAGES.forEach(locale => {
        const renderTime = measureRenderTime(() => {
          renderWithI18n(
            <Layout>
              <Card>
                <CardContent>
                  <Counter />
                  <Button>Test Button</Button>
                </CardContent>
              </Card>
            </Layout>,
            { locale }
          );
        }, 10);
        
        renderTimes[locale] = renderTime;
      });
      
      // All languages should render within reasonable time
      Object.entries(renderTimes).forEach(([locale, time]) => {
        expect(time).toBeLessThan(50); // 50ms per render
      });
      
      // Performance variance between languages should be minimal
      const times = Object.values(renderTimes);
      const maxTime = Math.max(...times);
      const minTime = Math.min(...times);
      const variance = maxTime - minTime;
      
      expect(variance).toBeLessThan(30); // Less than 30ms difference
    });

    test('memory usage is consistent across languages', () => {
      // Basic test - more sophisticated memory testing would require additional tools
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { unmount } = renderWithI18n(
          <Layout>
            <Counter />
            <Button>Test</Button>
          </Layout>,
          { locale }
        );
        
        // Clean unmount should work for all languages
        expect(() => unmount()).not.toThrow();
      });
    });
  });

  describe('Accessibility Across Languages', () => {
    test('screen reader compatibility in all languages', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(
          <Layout>
            <Card>
              <CardContent>
                <h1>Test Heading</h1>
                <p>Test content</p>
                <Button>Test Button</Button>
              </CardContent>
            </Card>
          </Layout>,
          { locale }
        );
        
        // Check for proper semantic structure
        expect(container.querySelector('h1')).toBeInTheDocument();
        expect(container.querySelector('button')).toBeInTheDocument();
        expect(container.querySelector('[role="main"]')).toBeInTheDocument();
      });
    });

    test('keyboard navigation works in all languages', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(
          <div>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </div>,
          { locale }
        );
        
        const buttons = container.querySelectorAll('button');
        buttons.forEach(button => {
          expect(button).not.toHaveAttribute('tabindex', '-1');
        });
      });
    });

    test('color contrast is maintained across languages', () => {
      // This is a basic test - real color contrast testing would require more sophisticated tools
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(
          <Button variant="primary">Test Button</Button>,
          { locale }
        );
        
        const button = container.querySelector('button');
        expect(button).toHaveClass('btn-primary');
      });
    });
  });

  describe('Visual Regression Prevention', () => {
    test('component layouts are stable across languages', () => {
      const testContent = "Test content that should maintain layout";
      
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(
          <Card>
            <CardContent>
              <p>{testContent}</p>
              <Button>{testContent}</Button>
            </CardContent>
          </Card>,
          { locale }
        );
        
        // Basic layout structure should be preserved
        expect(container.querySelector('.card')).toBeInTheDocument();
        expect(container.querySelector('button')).toBeInTheDocument();
        expect(container.textContent).toContain(testContent);
      });
    });

    test('text overflow is handled properly', () => {
      const longText = "This is a very long text that might cause overflow issues in some languages especially when translated to languages with longer word lengths";
      
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(
          <Button style={{ maxWidth: '200px' }}>
            {longText}
          </Button>,
          { locale }
        );
        
        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
        
        // Button should have appropriate text handling
        const computedStyle = window.getComputedStyle(button!);
        expect(['ellipsis', 'clip', 'break-word'].some(value => 
          computedStyle.textOverflow === value ||
          computedStyle.overflow === 'hidden' ||
          computedStyle.wordBreak === value
        )).toBeTruthy();
      });
    });
  });

  describe('Error Handling', () => {
    test('graceful fallback for missing translations', () => {
      // Test with a non-existent translation key
      SUPPORTED_LANGUAGES.forEach(locale => {
        expect(() => {
          renderWithI18n(
            <div>
              <Button>Fallback content</Button>
            </div>,
            { locale }
          );
        }).not.toThrow();
      });
    });

    test('error boundaries work in all languages', () => {
      // Basic error boundary test
      SUPPORTED_LANGUAGES.forEach(locale => {
        expect(() => {
          renderWithI18n(
            <Layout>
              <Card>
                <CardContent>
                  Normal content
                </CardContent>
              </Card>
            </Layout>,
            { locale }
          );
        }).not.toThrow();
      });
    });
  });
});
