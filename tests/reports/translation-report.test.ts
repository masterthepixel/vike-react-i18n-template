import {
  generateCoverageReport,
  validateTranslations,
  validateTextLength,
  findUntranslatedStrings,
} from '../utils/translation-validator';

describe('Translation Coverage and Quality Report', () => {
  test('generates comprehensive translation report', () => {
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

    // Generate coverage report
    const coverageReport = generateCoverageReport();
    console.log('\n=== TRANSLATION COVERAGE REPORT ===\n');
    console.log(coverageReport.summary);

    // Validate translations
    const validation = validateTranslations(requiredKeys);
    console.log('\n=== TRANSLATION VALIDATION ===\n');
    
    if (validation.isValid) {
      console.log('✅ All required translations are present and valid');
    } else {
      console.log('❌ Translation issues found:');
      if (validation.missing.length > 0) {
        console.log('Missing translations:', validation.missing);
      }
      if (validation.empty.length > 0) {
        console.log('Empty translations:', validation.empty);
      }
    }

    console.log('\nCoverage by language:');
    Object.entries(validation.coverage).forEach(([locale, coverage]) => {
      const status = coverage >= 95 ? '✅' : coverage >= 85 ? '⚠️' : '❌';
      console.log(`${status} ${locale}: ${coverage.toFixed(1)}%`);
    });

    // Check for untranslated strings
    const untranslated = findUntranslatedStrings();
    console.log('\n=== UNTRANSLATED STRINGS ===\n');
    
    let hasUntranslated = false;
    Object.entries(untranslated).forEach(([locale, keys]) => {
      if (keys.length > 0) {
        hasUntranslated = true;
        console.log(`${locale}: ${keys.length} potentially untranslated keys`);
        if (keys.length <= 5) {
          console.log(`  - ${keys.join(', ')}`);
        } else {
          console.log(`  - ${keys.slice(0, 5).join(', ')} and ${keys.length - 5} more...`);
        }
      }
    });

    if (!hasUntranslated) {
      console.log('✅ No untranslated strings detected');
    }

    // Text length validation
    const lengthConstraints = {
      'button.save': 20,
      'button.cancel': 20,
      'button.submit': 20,
      'navigation.home': 30,
      'navigation.about': 30,
      'navigation.examples': 30,
    };

    const lengthViolations = validateTextLength(lengthConstraints);
    console.log('\n=== TEXT LENGTH VALIDATION ===\n');
    
    let hasLengthIssues = false;
    Object.entries(lengthViolations).forEach(([locale, violations]) => {
      if (violations.length > 0) {
        hasLengthIssues = true;
        console.log(`${locale}: ${violations.length} length violations`);
        violations.forEach(({ key, length, max }) => {
          console.log(`  - ${key}: ${length} chars (max: ${max})`);
        });
      }
    });

    if (!hasLengthIssues) {
      console.log('✅ All translations meet length requirements');
    }

    // Quality metrics
    console.log('\n=== QUALITY METRICS ===\n');
    console.log(`Overall Coverage: ${coverageReport.overall.toFixed(1)}%`);
    console.log(`Languages Supported: ${Object.keys(coverageReport.byLanguage).length}`);
    console.log(`Translation Keys: ${requiredKeys.length}`);
    
    const avgCoverage = Object.values(coverageReport.byLanguage)
      .reduce((sum, { percentage }) => sum + percentage, 0) / 
      Object.keys(coverageReport.byLanguage).length;
    console.log(`Average Language Coverage: ${avgCoverage.toFixed(1)}%`);

    // Test assertions
    expect(coverageReport.overall).toBeGreaterThanOrEqual(90);
    expect(validation.isValid).toBe(true);
    expect(avgCoverage).toBeGreaterThanOrEqual(85);
  });

  test('validates translation quality standards', () => {
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
    
    // Quality standards
    expect(validation.isValid).toBe(true);
    expect(validation.missing).toHaveLength(0);
    expect(validation.empty).toHaveLength(0);
    
    // Coverage standards
    Object.entries(validation.coverage).forEach(([locale, coverage]) => {
      expect(coverage).toBeGreaterThanOrEqual(90);
    });
  });

  test('meets internationalization best practices', () => {
    const report = generateCoverageReport();
    
    // Best practice: Support at least 5 languages
    expect(Object.keys(report.byLanguage).length).toBeGreaterThanOrEqual(5);
    
    // Best practice: Overall coverage should be very high
    expect(report.overall).toBeGreaterThanOrEqual(95);
    
    // Best practice: No language should be significantly behind
    const coverageValues = Object.values(report.byLanguage).map(({ percentage }) => percentage);
    const minCoverage = Math.min(...coverageValues);
    const maxCoverage = Math.max(...coverageValues);
    const coverageSpread = maxCoverage - minCoverage;
    
    expect(coverageSpread).toBeLessThan(20); // Max 20% difference between languages
    expect(minCoverage).toBeGreaterThanOrEqual(85); // All languages at least 85%
  });
});
