import React from 'react'
import { usePageContext } from '$/renderer/usePageContext'

interface LanguageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function LanguageWrapper({ children, className = '' }: LanguageWrapperProps) {
  const { locale } = usePageContext()
  
  // Determine text direction and font family based on locale
  const getLanguageClasses = (locale: string) => {
    switch (locale) {
      case 'ar':
        return 'rtl font-arabic text-right'
      case 'zh':
        return 'ltr font-chinese'
      case 'en':
      case 'de':
      case 'fr':
      case 'es':
      default:
        return 'ltr'
    }
  }
  
  const languageClasses = getLanguageClasses(locale)
  
  return (
    <div className={`${languageClasses} ${className}`}>
      {children}
    </div>
  )
}

interface LocalizedTextProps {
  children: React.ReactNode
  className?: string
}

export function LocalizedText({ children, className = '' }: LocalizedTextProps) {
  const { locale } = usePageContext()
  
  // Apply locale-specific styling for better typography
  const getTextClasses = (locale: string) => {
    switch (locale) {
      case 'ar':
        return 'font-arabic text-right leading-relaxed'
      case 'zh':
        return 'font-chinese leading-relaxed'
      case 'en':
      case 'de':
      case 'fr':
      case 'es':
      default:
        return 'leading-relaxed'
    }
  }
  
  const textClasses = getTextClasses(locale)
  
  return (
    <span className={`${textClasses} ${className}`}>
      {children}
    </span>
  )
}

// Language-specific configuration
export const languageConfig = {
  en: {
    name: 'English',
    direction: 'ltr' as const,
    fontClass: '',
    flag: '🇺🇸'
  },
  de: {
    name: 'Deutsch',
    direction: 'ltr' as const,
    fontClass: '',
    flag: '🇩🇪'
  },
  fr: {
    name: 'Français',
    direction: 'ltr' as const,
    fontClass: '',
    flag: '🇫🇷'
  },
  zh: {
    name: '中文',
    direction: 'ltr' as const,
    fontClass: 'font-chinese',
    flag: '🇨🇳'
  },
  es: {
    name: 'Español',
    direction: 'ltr' as const,
    fontClass: '',
    flag: '🇪🇸'
  },
  ar: {
    name: 'العربية',
    direction: 'rtl' as const,
    fontClass: 'font-arabic',
    flag: '🇸🇦'
  }
} as const
