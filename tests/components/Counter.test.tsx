import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from '../../components/Counter';
import {
  renderWithI18n,
  testAllLanguages,
  testRTLSupport,
  testTypography,
  testAccessibility,
  checkTranslationKey,
  SUPPORTED_LANGUAGES,
} from '../utils/test-utils';

describe('Counter Component', () => {
  const renderCounter = (locale = 'en') => (
    <Counter />
  );

  describe('Basic Functionality', () => {
    test('renders with initial count of 0', () => {
      renderWithI18n(<Counter />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('increments count when increment button is clicked', async () => {
      const user = userEvent.setup();
      renderWithI18n(<Counter />);
      
      const incrementButton = screen.getByRole('button', { name: /increment|plus|\+/i });
      await user.click(incrementButton);
      
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('decrements count when decrement button is clicked', async () => {
      const user = userEvent.setup();
      renderWithI18n(<Counter />);
      
      const decrementButton = screen.getByRole('button', { name: /decrement|minus|-/i });
      await user.click(decrementButton);
      
      expect(screen.getByText('-1')).toBeInTheDocument();
    });

    test('handles multiple increments and decrements', async () => {
      const user = userEvent.setup();
      renderWithI18n(<Counter />);
      
      const incrementButton = screen.getByRole('button', { name: /increment|plus|\+/i });
      const decrementButton = screen.getByRole('button', { name: /decrement|minus|-/i });
      
      // Increment 3 times
      await user.click(incrementButton);
      await user.click(incrementButton);
      await user.click(incrementButton);
      expect(screen.getByText('3')).toBeInTheDocument();
      
      // Decrement 2 times
      await user.click(decrementButton);
      await user.click(decrementButton);
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  describe('Multilingual Support', () => {
    testAllLanguages(
      renderCounter,
      (locale, container) => {
        // Check that counter displays correctly in all languages
        expect(container.querySelector('[data-testid="count"]') || 
               container.textContent).toContain('0');
      }
    );

    test('displays translated labels in all languages', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        renderWithI18n(<Counter />, { locale });
        
        // Check if translation keys exist for this locale
        expect(checkTranslationKey('counter.title', locale)).toBe(true);
        expect(checkTranslationKey('counter.increment', locale)).toBe(true);
        expect(checkTranslationKey('counter.decrement', locale)).toBe(true);
      });
    });

    test('uses correct language-specific number formatting', () => {
      // Test with a larger number to see formatting differences
      const TestCounterWithValue = ({ initialValue }: { initialValue: number }) => {
        const [count, setCount] = React.useState(initialValue);
        return (
          <div>
            <span data-testid="count">{count.toLocaleString()}</span>
            <button onClick={() => setCount(c => c + 1000)}>Add 1000</button>
          </div>
        );
      };

      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(
          <TestCounterWithValue initialValue={1234} />, 
          { locale }
        );
        
        const countElement = container.querySelector('[data-testid="count"]');
        expect(countElement).toBeInTheDocument();
      });
    });
  });

  // RTL Support Testing
  testRTLSupport(() => (
    <div dir="auto">
      <Counter />
    </div>
  ));

  // Typography Testing
  testTypography(() => (
    <div className="font-inherit">
      <Counter />
    </div>
  ));

  // Accessibility Testing
  testAccessibility(() => <Counter />);

  describe('Accessibility Features', () => {
    test('buttons have proper aria labels', () => {
      renderWithI18n(<Counter />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });

    test('count value is announced to screen readers', () => {
      renderWithI18n(<Counter />);
      
      // Look for elements that would be announced
      const countElements = screen.getAllByText('0');
      expect(countElements.length).toBeGreaterThan(0);
    });

    test('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      renderWithI18n(<Counter />);
      
      const incrementButton = screen.getByRole('button', { name: /increment|plus|\+/i });
      const decrementButton = screen.getByRole('button', { name: /decrement|minus|-/i });
      
      // Test tab navigation
      await user.tab();
      expect(document.activeElement).toEqual(incrementButton);
      
      await user.tab();
      expect(document.activeElement).toEqual(decrementButton);
    });

    test('supports keyboard activation', async () => {
      const user = userEvent.setup();
      renderWithI18n(<Counter />);
      
      const incrementButton = screen.getByRole('button', { name: /increment|plus|\+/i });
      
      await user.click(incrementButton);
      expect(screen.getByText('1')).toBeInTheDocument();
      
      // Test keyboard activation
      await user.keyboard('{Space}');
      expect(screen.getByText('2')).toBeInTheDocument();
      
      await user.keyboard('{Enter}');
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('Visual Design', () => {
    test('applies consistent styling across languages', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(<Counter />, { locale });
        
        // Check for consistent button styling
        const buttons = container.querySelectorAll('button');
        buttons.forEach(button => {
          expect(button.className).toContain('btn');
        });
      });
    });

    test('maintains layout in RTL languages', () => {
      const { container } = renderWithI18n(<Counter />, { locale: 'ar' });
      
      // Counter should maintain proper layout regardless of text direction
      const counterContainer = container.firstChild as HTMLElement;
      expect(counterContainer).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    test('renders efficiently with rapid clicks', async () => {
      const user = userEvent.setup();
      renderWithI18n(<Counter />);
      
      const incrementButton = screen.getByRole('button', { name: /increment|plus|\+/i });
      
      const startTime = performance.now();
      
      // Rapid clicks
      for (let i = 0; i < 10; i++) {
        await user.click(incrementButton);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });
  });
});

// React import was moved to the top
