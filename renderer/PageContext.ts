// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface PageContext {
      Page: Page
      data?: {
        // Needed by getPageTitle() and onBeforePrerenderStart()
        title?: string
        description?: string
      }
      config: {
        /** Title defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js) */
        title?: string
        description?: string
      }
      abortReason?: string
      someAsyncProps?: number

      // internationalization
      locale: LanguageTag
      urlLogical: string
      urlPathname: string
    }
  }
}

type Page = () => React.ReactElement

// Tell TypeScript that this file isn't an ambient module
export {}
