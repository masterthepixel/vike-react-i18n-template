import { translations } from "./translations"
import { localeDefault } from "./locales"

export function translate(text: string, locale: LanguageTag) {
  if (locale === localeDefault) {
    return text
  }
  const textTranslations = translations[text as keyof typeof translations]
  if (!textTranslations) {
    throw new Error("No translation found for: `" + text + "`")
  }
  return textTranslations[locale]
}
