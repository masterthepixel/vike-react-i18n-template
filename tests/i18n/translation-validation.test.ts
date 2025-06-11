import {
  validateTranslations,
  validateTranslationPatterns,
  findUntranslatedStrings,
  validateTextLength,
  generateCoverageReport,
  COMMON_PATTERNS,
} from '../utils/translation-validator';

describe('Translation Validation', () => {
  const requiredKeys = [
    'title',
    'description',
    'welcome',
    'button.save',
    'button.cancel',
    'button.submit',
    'navigation.home',
    'navigation.about',
    'navigation.examples',
    'counter.title',
    'counter.description',
    'counter.count',
    'counter.increment',
    'counter.decrement',
    'examples.title',
    'examples.description',
    'about.title',
    'about.description',
  ];

  describe('Translation Completeness', () => {
    test('all required keys are present in all languages', () => {
      const validation = validateTranslations(requiredKeys);
      
      if (!validation.isValid) {
        console.log('Missing translations:', validation.missing);
        console.log('Empty translations:', validation.empty);
        console.log('Coverage:', validation.coverage);
      }
      
      expect(validation.isValid).toBe(true);
      expect(validation.missing).toHaveLength(0);
      expect(validation.empty).toHaveLength(0);
    });

    test('all languages have high coverage', () => {
      const validation = validateTranslations(requiredKeys);
      
      Object.entries(validation.coverage).forEach(([locale, coverage]) => {
        expect(coverage).toBeGreaterThanOrEqual(90);
      });
    });
  });

  describe('Translation Quality', () => {
    test('translations follow common patterns', () => {
      const patternIssues = validateTranslationPatterns(COMMON_PATTERNS);
      
      Object.entries(patternIssues).forEach(([locale, issues]) => {
        if (issues.length > 0) {
          console.log(`Pattern issues in ${locale}:`, issues);
        }
        expect(issues).toHaveLength(0);
      });
    });

    test('no translations are identical to English (except English)', () => {
      const untranslated = findUntranslatedStrings();
      
      Object.entries(untranslated).forEach(([locale, keys]) => {
        // Allow some technical terms to remain the same
        const allowedSameAsEnglish = ['OK', 'Email', 'URL'];
        const problematicKeys = keys.filter(key => 
          !allowedSameAsEnglish.some(allowed => 
            key.toLowerCase().includes(allowed.toLowerCase())
          )
        );
        
        if (problematicKeys.length > 0) {
          console.log(`Potentially untranslated in ${locale}:`, problematicKeys);
        }
        
        // Allow up to 10% of keys to be the same as English for technical terms
        expect(problematicKeys.length).toBeLessThanOrEqual(requiredKeys.length * 0.1);
      });
    });
  });

  describe('Text Length Constraints', () => {
    test('button texts are reasonably short', () => {
      const buttonLengthConstraints = {
        'button.save': 20,
        'button.cancel': 20,
        'button.submit': 20,
        'counter.increment': 15,
        'counter.decrement': 15,
      };
      
      const violations = validateTextLength(buttonLengthConstraints);
      
      Object.entries(violations).forEach(([locale, issues]) => {
        if (issues.length > 0) {
          console.log(`Length violations in ${locale}:`, issues);
        }
        expect(issues).toHaveLength(0);
      });
    });

    test('navigation texts fit in typical menu widths', () => {
      const navLengthConstraints = {
        'navigation.home': 30,
        'navigation.about': 30,
        'navigation.examples': 30,
      };
      
      const violations = validateTextLength(navLengthConstraints);
      
      Object.entries(violations).forEach(([locale, issues]) => {
        // Allow some flexibility for longer language names
        expect(issues.length).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('Coverage Report', () => {
    test('generates accurate coverage statistics', () => {
      const report = generateCoverageReport();
      
      expect(report.overall).toBeGreaterThanOrEqual(90);
      expect(Object.keys(report.byLanguage)).toHaveLength(6);
      expect(report.summary).toContain('Overall Translation Coverage');
      
      console.log('\n' + report.summary);
    });
  });
});
