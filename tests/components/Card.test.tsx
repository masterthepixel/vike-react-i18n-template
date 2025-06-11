import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/Card';
import {
  renderWithI18n,
  testAllLanguages,
  testRTLSupport,
  testTypography,
  testAccessibility,
  SUPPORTED_LANGUAGES,
} from '../utils/test-utils';

describe('Card Components', () => {
  describe('Card Base Component', () => {
    test('renders with default styling', () => {
      const { container } = render(
        <Card>
          <div>Card content</div>
        </Card>
      );
      
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('card');
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    test('accepts custom className', () => {
      const { container } = render(
        <Card className="custom-card">
          <div>Card content</div>
        </Card>
      );
      
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('card', 'custom-card');
    });    test('forwards additional props', () => {
      const { container } = render(
        <Card data-testid="test-card">
          <div>Card content</div>
        </Card>
      );
      
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('data-testid', 'test-card');
    });
  });

  describe('CardHeader Component', () => {
    test('renders header content', () => {
      render(
        <Card>
          <CardHeader>
            <h2>Card Title</h2>
          </CardHeader>
        </Card>
      );
      
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    test('applies header styling', () => {
      const { container } = render(
        <Card>
          <CardHeader>Header content</CardHeader>
        </Card>
      );
      
      const header = container.querySelector('.card-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Header content');
    });
  });

  describe('CardContent Component', () => {
    test('renders content with proper styling', () => {
      const { container } = render(
        <Card>
          <CardContent>
            <p>This is card content</p>
          </CardContent>
        </Card>
      );
      
      const content = container.querySelector('.card-content');
      expect(content).toBeInTheDocument();
      expect(screen.getByText('This is card content')).toBeInTheDocument();
    });

    test('handles complex content', () => {
      render(
        <Card>
          <CardContent>
            <div>
              <h3>Subtitle</h3>
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      );
      
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  describe('CardFooter Component', () => {
    test('renders footer content', () => {
      const { container } = render(
        <Card>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );
      
      const footer = container.querySelector('.card-footer');
      expect(footer).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    test('handles multiple footer elements', () => {
      render(
        <Card>
          <CardFooter>
            <button>Cancel</button>
            <button>Submit</button>
          </CardFooter>
        </Card>
      );
      
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
  });

  describe('Complete Card Structure', () => {
    test('renders full card with all components', () => {
      render(
        <Card>
          <CardHeader>
            <h2>Card Title</h2>
            <p>Subtitle</p>
          </CardHeader>
          <CardContent>
            <p>This is the main content of the card.</p>
          </CardContent>
          <CardFooter>
            <button>Action 1</button>
            <button>Action 2</button>
          </CardFooter>
        </Card>
      );
      
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
      expect(screen.getByText('This is the main content of the card.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action 2' })).toBeInTheDocument();
    });

    test('maintains proper structure and hierarchy', () => {
      const { container } = render(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      
      const card = container.querySelector('.card');
      const header = card?.querySelector('.card-header');
      const content = card?.querySelector('.card-content');
      const footer = card?.querySelector('.card-footer');
      
      expect(card).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
      
      // Check order
      const children = Array.from(card?.children || []);
      const headerIndex = children.indexOf(header!);
      const contentIndex = children.indexOf(content!);
      const footerIndex = children.indexOf(footer!);
      
      expect(headerIndex).toBeLessThan(contentIndex);
      expect(contentIndex).toBeLessThan(footerIndex);
    });
  });

  describe('Multilingual Support', () => {
    const renderMultilingualCard = (locale: string) => (
      <Card>
        <CardHeader>
          <h2>{`Title in ${locale}`}</h2>
        </CardHeader>
        <CardContent>
          <p>{`Content in ${locale}`}</p>
        </CardContent>
        <CardFooter>
          <button>{`Action in ${locale}`}</button>
        </CardFooter>
      </Card>
    );

    testAllLanguages(
      (locale) => renderMultilingualCard(locale),
      (locale, container) => {
        expect(container.textContent).toContain(`Title in ${locale}`);
        expect(container.textContent).toContain(`Content in ${locale}`);
        expect(container.textContent).toContain(`Action in ${locale}`);
      }
    );

    test('handles long text in different languages', () => {
      const longTexts = {
        en: 'This is a very long text in English that should wrap properly within the card component.',
        de: 'Dies ist ein sehr langer Text auf Deutsch, der ordnungsgemäß innerhalb der Kartenkomponente umgebrochen werden sollte.',
        fr: 'Il s\'agit d\'un texte très long en français qui devrait s\'enrouler correctement dans le composant de carte.',
        zh: '这是一个非常长的中文文本，应该在卡片组件内正确换行。',
        es: 'Este es un texto muy largo en español que debería ajustarse correctamente dentro del componente de tarjeta.',
        ar: 'هذا نص طويل جداً باللغة العربية يجب أن يلتف بشكل صحيح داخل مكون البطاقة.',
      };

      SUPPORTED_LANGUAGES.forEach(locale => {
        const { container } = renderWithI18n(
          <Card>
            <CardContent>
              <p>{longTexts[locale as keyof typeof longTexts]}</p>
            </CardContent>
          </Card>,
          { locale }
        );
        
        expect(container.textContent).toContain(longTexts[locale as keyof typeof longTexts]);
      });
    });
  });

  // RTL Support Testing
  testRTLSupport(() => (
    <div dir="auto">
      <Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    </div>
  ));

  // Typography Testing
  testTypography(() => (
    <Card className="font-inherit">
      <CardHeader>Header</CardHeader>
      <CardContent>Content</CardContent>
    </Card>
  ));

  // Accessibility Testing
  testAccessibility(() => (
    <Card>
      <CardHeader>
        <h2>Accessible Card</h2>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <button>Action</button>
      </CardFooter>
    </Card>
  ));

  describe('Visual Design', () => {
    test('applies consistent spacing', () => {
      const { container } = render(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      
      const header = container.querySelector('.card-header');
      const content = container.querySelector('.card-content');
      const footer = container.querySelector('.card-footer');
      
      // Each section should have appropriate spacing classes
      expect(header?.className).toMatch(/p-|padding|space/);
      expect(content?.className).toMatch(/p-|padding|space/);
      expect(footer?.className).toMatch(/p-|padding|space/);
    });

    test('maintains visual hierarchy', () => {
      render(
        <Card>
          <CardHeader>
            <h1>Main Title</h1>
            <h2>Subtitle</h2>
          </CardHeader>
          <CardContent>
            <h3>Section Title</h3>
            <p>Content paragraph</p>
          </CardContent>
        </Card>
      );
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    test('adapts to container width', () => {
      const { container } = render(
        <div style={{ width: '300px' }}>
          <Card>
            <CardContent>
              <p>Responsive content</p>
            </CardContent>
          </Card>
        </div>
      );
      
      const card = container.querySelector('.card');
      expect(card).toBeInTheDocument();
      
      // Card should be responsive
      expect(card?.className).toMatch(/w-full|width|responsive/);
    });
  });
});
