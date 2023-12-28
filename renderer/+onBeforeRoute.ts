import { OnBeforeRouteSync } from "vike/types"
import { extractLocale } from "../locales"

// https://vike.dev/onBeforeRoute
export const onBeforeRoute: OnBeforeRouteSync = (
  pageContext
): ReturnType<OnBeforeRouteSync> => {
  const { urlWithoutLocale, locale } = extractLocale(pageContext.urlOriginal)
  return {
    pageContext: {
      // We make `locale` available as `pageContext.locale`. We can then use https://vike.dev/pageContext-anywhere to access pageContext.locale in any React/Vue component.
      locale,
      // Tell Vike's router to use the value urlWithoutLocale instead of pageContext.urlOriginal
      urlLogical: urlWithoutLocale,
    },
  }
}
