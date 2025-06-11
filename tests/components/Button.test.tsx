import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../components/Button';
import {
  renderWithI18n,
  testAllLanguages,
  testRTLSupport,
  testTypography,
  testAccessibility,
  SUPPORTED_LANGUAGES,
} from '../utils/test-utils';

describe('Button Component', () => {
  const renderButton = (props = {}) => (
    <Button {...props}>Test Button</Button>
  );

  describe('Basic Rendering', () => {
    test('renders with default props', () => {
      render(renderButton());
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    test('renders all variants correctly', () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost'] as const;
      
      variants.forEach(variant => {
        const { container } = render(renderButton({ variant }));
        const button = container.querySelector('button');
        expect(button).toHaveClass(`btn-${variant}`);
      });
    });

    test('renders all sizes correctly', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      
      sizes.forEach(size => {
        const { container } = render(renderButton({ size }));
        const button = container.querySelector('button');
        expect(button).toHaveClass(`btn-${size}`);
      });
    });
  });

  describe('Interactions', () => {
    test('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(renderButton({ onClick: handleClick }));
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('respects disabled state', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(renderButton({ onClick: handleClick, disabled: true }));
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('shows loading state', () => {
      render(renderButton({ loading: true }));
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('loading');
    });
  });

  describe('Multilingual Support', () => {
    testAllLanguages(
      (locale) => (
        <Button>{`Button in ${locale}`}</Button>
      ),
      (locale, container) => {
        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
        expect(button?.textContent).toContain(locale);
      }
    );

    test('supports multilingual content', () => {
      SUPPORTED_LANGUAGES.forEach(locale => {
        const content = `Button ${locale}`;
        const { container } = renderWithI18n(
          <Button>{content}</Button>,
          { locale }
        );
        
        expect(container.querySelector('button')).toHaveTextContent(content);
      });
    });
  });

  // RTL Support Testing
  testRTLSupport(() => (
    <div dir="auto">
      <Button>Test Button</Button>
    </div>
  ));

  // Typography Testing
  testTypography(() => (
    <Button className="font-inherit">Test Button</Button>
  ));

  // Accessibility Testing
  testAccessibility(() => (
    <Button>Test Button</Button>
  ));

  describe('Custom Styling', () => {
    test('accepts custom className', () => {
      const { container } = render(renderButton({ className: 'custom-class' }));
      const button = container.querySelector('button');
      expect(button).toHaveClass('custom-class');
    });

    test('applies fullWidth correctly', () => {
      const { container } = render(renderButton({ fullWidth: true }));
      const button = container.querySelector('button');
      expect(button).toHaveClass('w-full');
    });
  });

  describe('Form Integration', () => {
    test('submits form when type is submit', () => {
      const handleSubmit = jest.fn(e => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      );
      
      screen.getByRole('button').click();
      expect(handleSubmit).toHaveBeenCalled();
    });

    test('works with form validation', () => {
      render(
        <form>
          <input required />
          <Button type="submit">Submit</Button>
        </form>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });
});
