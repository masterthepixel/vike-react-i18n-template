export { getPageDescription }

import type { PageContext } from "vike/types"

function getPageDescription(pageContext: PageContext): string {
  const description =
    // Title defined dynamically by data()
    pageContext.data?.description ||
    // Title defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js)
    // The config 'pageContext.config.title' is a custom config we defined at ./+config.ts
    pageContext.config.description ||
    "Description"
  return description
}
