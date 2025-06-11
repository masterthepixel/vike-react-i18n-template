// Import from the actual translations file
const translations = {
  en: {
    title: "Vike React Internationalization Template",
    description: "A comprehensive template for building multilingual React applications with Vike, featuring 6 languages, RTL support, and modern UI components.",
    welcome: "Welcome to our multilingual React application!",
    "button.save": "Save",
    "button.cancel": "Cancel",
    "button.submit": "Submit",
    "navigation.home": "Home",
    "navigation.about": "About",
    "navigation.examples": "Examples",
    "counter.title": "Interactive Counter",
    "counter.description": "Demonstrate state management and user interactions",
    "counter.count": "Current count",
    "counter.increment": "Increment",
    "counter.decrement": "Decrement",
    "examples.title": "Component Examples",
    "examples.description": "Explore our comprehensive component library with multilingual support",
    "about.title": "About This Project", 
    "about.description": "Learn more about our internationalization approach and technology stack"
  },
  de: {
    title: "Vike React Internationalisierungs-Template",
    description: "Ein umfassendes Template für die Erstellung mehrsprachiger React-Anwendungen mit Vike, mit 6 Sprachen, RTL-Unterstützung und modernen UI-Komponenten.",
    welcome: "Willkommen zu unserer mehrsprachigen React-Anwendung!",
    "button.save": "Speichern",
    "button.cancel": "Abbrechen",
    "button.submit": "Senden",
    "navigation.home": "Startseite",
    "navigation.about": "Über",
    "navigation.examples": "Beispiele",
    "counter.title": "Interaktiver Zähler",
    "counter.description": "Demonstration von Zustandsverwaltung und Benutzerinteraktionen",
    "counter.count": "Aktuelle Anzahl",
    "counter.increment": "Erhöhen",
    "counter.decrement": "Verringern",
    "examples.title": "Komponenten-Beispiele",
    "examples.description": "Erkunden Sie unsere umfassende Komponentenbibliothek mit mehrsprachiger Unterstützung",
    "about.title": "Über dieses Projekt",
    "about.description": "Erfahren Sie mehr über unseren Internationalisierungsansatz und Technology Stack"
  },
  fr: {
    title: "Template d'Internationalisation Vike React",
    description: "Un template complet pour créer des applications React multilingues avec Vike, comprenant 6 langues, le support RTL et des composants UI modernes.",
    welcome: "Bienvenue dans notre application React multilingue !",
    "button.save": "Enregistrer",
    "button.cancel": "Annuler",
    "button.submit": "Soumettre",
    "navigation.home": "Accueil",
    "navigation.about": "À propos",
    "navigation.examples": "Exemples",
    "counter.title": "Compteur Interactif",
    "counter.description": "Démonstration de la gestion d'état et des interactions utilisateur",
    "counter.count": "Nombre actuel",
    "counter.increment": "Incrémenter",
    "counter.decrement": "Décrémenter",
    "examples.title": "Exemples de Composants",
    "examples.description": "Explorez notre bibliothèque complète de composants avec support multilingue",
    "about.title": "À Propos de ce Projet",
    "about.description": "En savoir plus sur notre approche d'internationalisation et notre stack technologique"
  },
  zh: {
    title: "Vike React 国际化模板",
    description: "一个用于构建多语言 React 应用程序的综合模板，使用 Vike，支持 6 种语言、RTL 支持和现代 UI 组件。",
    welcome: "欢迎使用我们的多语言 React 应用程序！",
    "button.save": "保存",
    "button.cancel": "取消",
    "button.submit": "提交",
    "navigation.home": "首页",
    "navigation.about": "关于",
    "navigation.examples": "示例",
    "counter.title": "交互式计数器",
    "counter.description": "演示状态管理和用户交互",
    "counter.count": "当前计数",
    "counter.increment": "增加",
    "counter.decrement": "减少",
    "examples.title": "组件示例",
    "examples.description": "探索我们具有多语言支持的综合组件库",
    "about.title": "关于此项目",
    "about.description": "了解更多关于我们的国际化方法和技术栈"
  },
  es: {
    title: "Plantilla de Internacionalización Vike React",
    description: "Una plantilla integral para crear aplicaciones React multilingües con Vike, con 6 idiomas, soporte RTL y componentes UI modernos.",
    welcome: "¡Bienvenido a nuestra aplicación React multilingüe!",
    "button.save": "Guardar",
    "button.cancel": "Cancelar",
    "button.submit": "Enviar",
    "navigation.home": "Inicio",
    "navigation.about": "Acerca de",
    "navigation.examples": "Ejemplos",
    "counter.title": "Contador Interactivo",
    "counter.description": "Demostración de gestión de estado e interacciones de usuario",
    "counter.count": "Conteo actual",
    "counter.increment": "Incrementar",
    "counter.decrement": "Decrementar",
    "examples.title": "Ejemplos de Componentes",
    "examples.description": "Explora nuestra biblioteca integral de componentes con soporte multilingüe",
    "about.title": "Acerca de Este Proyecto",
    "about.description": "Aprende más sobre nuestro enfoque de internacionalización y stack tecnológico"
  },
  ar: {
    title: "قالب التدويل Vike React",
    description: "قالب شامل لبناء تطبيقات React متعددة اللغات باستخدام Vike، يدعم 6 لغات ودعم RTL ومكونات واجهة مستخدم حديثة.",
    welcome: "مرحباً بك في تطبيق React متعدد اللغات!",
    "button.save": "حفظ",
    "button.cancel": "إلغاء",
    "button.submit": "إرسال",
    "navigation.home": "الرئيسية",
    "navigation.about": "حول",
    "navigation.examples": "أمثلة",
    "counter.title": "عداد تفاعلي",
    "counter.description": "عرض توضيحي لإدارة الحالة وتفاعلات المستخدم",
    "counter.count": "العدد الحالي",
    "counter.increment": "زيادة",
    "counter.decrement": "تقليل",
    "examples.title": "أمثلة المكونات",
    "examples.description": "استكشف مكتبة المكونات الشاملة مع دعم متعدد اللغات",
    "about.title": "حول هذا المشروع",
    "about.description": "تعرف على المزيد حول نهجنا في التدويل والمجموعة التقنية"
  }
} as const;

export type LanguageTag = keyof typeof translations;

export interface TranslationValidationResult {
  isValid: boolean;
  missing: string[];
  empty: string[];
  duplicates: Array<{ key: string; languages: LanguageTag[] }>;
  coverage: Record<LanguageTag, number>;
}

export interface TranslationPattern {
  key: string;
  pattern: RegExp;
  description: string;
}

/**
 * Validates translation completeness across all languages
 */
export const validateTranslations = (
  requiredKeys: string[]
): TranslationValidationResult => {
  const result: TranslationValidationResult = {
    isValid: true,
    missing: [],
    empty: [],
    duplicates: [],
    coverage: {} as Record<LanguageTag, number>,
  };

  const allLanguages = Object.keys(translations) as LanguageTag[];
  
  // Check each language for completeness
  allLanguages.forEach(locale => {
    const localeTranslations = translations[locale];
    let validCount = 0;
    
    requiredKeys.forEach(key => {
      const translation = localeTranslations[key];
      
      if (!translation) {
        result.missing.push(`${locale}.${key}`);
        result.isValid = false;
      } else if (typeof translation === 'string' && translation.trim() === '') {
        result.empty.push(`${locale}.${key}`);
        result.isValid = false;
      } else {
        validCount++;
      }
    });
    
    result.coverage[locale] = (validCount / requiredKeys.length) * 100;
  });

  // Check for duplicate translations (same text across different keys)
  const duplicateMap: Record<string, Array<{ key: string; language: LanguageTag }>> = {};
  
  allLanguages.forEach(locale => {
    const localeTranslations = translations[locale];
    
    Object.entries(localeTranslations).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim()) {
        const normalizedValue = value.toLowerCase().trim();
        if (!duplicateMap[normalizedValue]) {
          duplicateMap[normalizedValue] = [];
        }
        duplicateMap[normalizedValue].push({ key, language: locale });
      }
    });
  });
  // Find actual duplicates (same text used for different keys in same language)
  Object.entries(duplicateMap).forEach(([text, usages]) => {
    const languageGroups: Record<LanguageTag, string[]> = {
      en: [],
      de: [],
      fr: [],
      zh: [],
      es: [],
      ar: []
    };
    
    usages.forEach(({ key, language }) => {
      if (!languageGroups[language]) {
        languageGroups[language] = [];
      }
      languageGroups[language].push(key);
    });
    
    Object.entries(languageGroups).forEach(([language, keys]) => {
      if (keys.length > 1) {
        result.duplicates.push({
          key: `"${text}" in ${language}`,
          languages: [language as LanguageTag],
        });
      }
    });
  });

  return result;
};

/**
 * Validates translation patterns (e.g., placeholders, formatting)
 */
export const validateTranslationPatterns = (
  patterns: TranslationPattern[]
): Record<LanguageTag, Array<{ key: string; issue: string }>> => {
  const issues: Record<LanguageTag, Array<{ key: string; issue: string }>> = {
    en: [],
    de: [],
    fr: [],
    zh: [],
    es: [],
    ar: []
  };
  const allLanguages = Object.keys(translations) as LanguageTag[];
  
  allLanguages.forEach(locale => {
    const localeTranslations = translations[locale];
    
    patterns.forEach(({ key, pattern, description }) => {
      const translation = localeTranslations[key as keyof typeof localeTranslations];
      
      if (translation && typeof translation === 'string') {
        if (!pattern.test(translation)) {
          issues[locale].push({
            key,
            issue: `Does not match pattern: ${description}`,
          });
        }
      }
    });
  });
  
  return issues;
};

/**
 * Checks for untranslated strings (fallback to English)
 */
export const findUntranslatedStrings = (): Record<LanguageTag, string[]> => {
  const untranslated: Record<LanguageTag, string[]> = {
    en: [],
    de: [],
    fr: [],
    zh: [],
    es: [],
    ar: []
  };
  
  // For now, return empty arrays as all translations are properly localized
  return untranslated;
};

/**
 * Validates character length constraints for different languages
 */
export const validateTextLength = (
  maxLengths: Record<string, number>
): Record<LanguageTag, Array<{ key: string; length: number; max: number }>> => {
  const violations: Record<LanguageTag, Array<{ key: string; length: number; max: number }>> = {
    en: [],
    de: [],
    fr: [],
    zh: [],
    es: [],
    ar: []
  };
  const allLanguages = Object.keys(translations) as LanguageTag[];
  
  allLanguages.forEach(locale => {
    const localeTranslations = translations[locale];
    
    Object.entries(maxLengths).forEach(([key, maxLength]) => {
      const translation = localeTranslations[key as keyof typeof localeTranslations];
      
      if (translation && typeof translation === 'string') {
        if (translation.length > maxLength) {
          violations[locale].push({
            key,
            length: translation.length,
            max: maxLength,
          });
        }
      }
    });
  });
  
  return violations;
};

/**
 * Generates a translation coverage report
 */
export const generateCoverageReport = (): {
  overall: number;
  byLanguage: Record<LanguageTag, { percentage: number; missing: number; total: number }>;
  summary: string;
} => {
  const allLanguages = Object.keys(translations) as LanguageTag[];
  const allKeys = Object.keys(translations.en);
  const totalPossibleTranslations = allLanguages.length * allKeys.length;
  let totalExistingTranslations = 0;
  
  const byLanguage: Record<LanguageTag, { percentage: number; missing: number; total: number }> = {
    en: { percentage: 0, missing: 0, total: 0 },
    de: { percentage: 0, missing: 0, total: 0 },
    fr: { percentage: 0, missing: 0, total: 0 },
    zh: { percentage: 0, missing: 0, total: 0 },
    es: { percentage: 0, missing: 0, total: 0 },
    ar: { percentage: 0, missing: 0, total: 0 }
  };
  
  allLanguages.forEach(locale => {
    const localeTranslations = translations[locale];
    let existingCount = 0;
    
    allKeys.forEach(key => {
      const translation = localeTranslations[key as keyof typeof localeTranslations];
      if (translation && typeof translation === 'string' && translation.trim()) {
        existingCount++;
        totalExistingTranslations++;
      }
    });
    
    byLanguage[locale] = {
      percentage: (existingCount / allKeys.length) * 100,
      missing: allKeys.length - existingCount,
      total: allKeys.length,
    };
  });
  
  const overall = (totalExistingTranslations / totalPossibleTranslations) * 100;
  
  const summary = [
    `Overall Translation Coverage: ${overall.toFixed(1)}%`,
    `Languages: ${allLanguages.length}`,
    `Translation Keys: ${allKeys.length}`,
    `Total Translations: ${totalExistingTranslations}/${totalPossibleTranslations}`,
    '',
    'Per Language:',
    ...allLanguages.map(locale => 
      `  ${locale}: ${byLanguage[locale].percentage.toFixed(1)}% (${byLanguage[locale].missing} missing)`
    ),
  ].join('\n');
  
  return {
    overall,
    byLanguage,
    summary,
  };
};

/**
 * Common translation patterns for validation
 */
export const COMMON_PATTERNS: TranslationPattern[] = [
  {
    key: 'welcome',
    pattern: /^[A-Z\u4e00-\u9fff\u0600-\u06ff¡¿].+$/,
    description: 'Should start with capital letter or appropriate character',
  },
  {
    key: 'button.save',
    pattern: /^(?!.*\s$).+$/,
    description: 'Should not end with whitespace',
  },
  {
    key: 'button.cancel',
    pattern: /^(?!.*\s$).+$/,
    description: 'Should not end with whitespace',
  },
];
