import { OnPrerenderStartSync, PageContextServer } from "vike/types"
import { locales, localeDefault } from "../locales"

// https://vike.dev/onPrerenderStart
// We only need this for pre-rendered apps https://vike.dev/pre-rendering
export const onPrerenderStart: OnPrerenderStartSync = (
  prerenderContext
): ReturnType<OnPrerenderStartSync> => {
  const pageContexts: PageContextServer[] = []
  prerenderContext.pageContexts.forEach((pageContext) => {
    // Duplicate pageContext for each locale
    locales.forEach((locale) => {
      // Localize URL
      let { urlLogical } = pageContext
      if (locale !== localeDefault) {
        urlLogical = `/${locale}${pageContext.urlLogical}`
      }
      pageContexts.push({
        ...pageContext,
        urlLogical,
        // Set pageContext.locale
        locale,
      })
    })
  })
  return {
    prerenderContext: {
      pageContexts,
    },
  }
}
