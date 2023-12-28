export const locales: LanguageTag[] = ["en", "de", "fr"]
export const localeDefault: LanguageTag = locales[0]

export const renderLocales = ({
  domain = 'www.example.com',
  currentLocale,
  path,
}: {
  domain?: string
  currentLocale: LanguageTag
  path: string
}) => {
  const _locales = locales.map((tag) => {
    return `<link rel="alternate" hreflang="${tag}" href="${`${domain}${
      tag === localeDefault ? "" : "/" + tag
    }${path.replace(`/${currentLocale}`, "").replace(/\/$/, "")}`}" />`
  })
  return _locales
}
