import { locales, localeDefault } from "./locales"

export function extractLocale(url: string) {
  if (url === "/") {
    return { locale: localeDefault, urlWithoutLocale: "/" }
  }
  const urlPaths = url.split("/")

  let locale
  let urlWithoutLocale
  // We remove the URL locale, for example `/de-DE/about` => `/about`
  const firstPath = urlPaths[1]
  if (firstPath === "undefined") {
    locale = localeDefault
    if (url.includes("undefined/")) {
      urlWithoutLocale = url.replace("undefined/", "")
    } else if (url.includes("undefined")) {
      urlWithoutLocale = url.replace("undefined", "")
    }
  } else if (
    (locales as string[])
      .filter((locale) => locale !== localeDefault)
      .includes(firstPath)
  ) {
    locale = firstPath
    urlWithoutLocale = "/" + urlPaths.slice(2).join("/")
  } else {
    locale = localeDefault
    urlWithoutLocale = url
  }

  return { locale, urlWithoutLocale }
}
