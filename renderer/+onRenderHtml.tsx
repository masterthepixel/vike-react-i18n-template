// https://vike.dev/onRenderHtml
export { onRenderHtml }

import { renderToStream } from "react-streaming/server"
import React from "react"
import { dangerouslySkipEscape, escapeInject } from "vike/server"
import { PageShell } from "./PageShell"
import { getPageTitle } from "./getPageTitle"
import { getPageDescription } from "./getPageDescription"
import logoUrl from "./logo.svg"
import type { OnRenderHtmlAsync } from "vike/types"
import { renderLocales, localeDefault } from "../locales/locales"

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
  const { Page, locale = localeDefault, urlPathname, urlLogical } = pageContext

  const stream = await renderToStream(
    <PageShell pageContext={pageContext}>
      <Page />
    </PageShell>,
    // We don't need react-streaming for this app. (We use it merely to showcase that Vike can handle react-streaming with a pre-rendered app. Note that using react-streaming with pre-rendering can make sense if we want to be able to use React's latest <Suspsense> techniques.)
    { disable: true }
  )

  const title = getPageTitle(pageContext)
  const description = getPageDescription(pageContext)

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${locale}">
      <head>
      <title>${title}</title>
      <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
        ${dangerouslySkipEscape(
          renderLocales({
            currentLocale: locale,
            domain: import.meta.env.DOMAIN,
            path: urlPathname,
          }).join("")
        )}
        <link rel="canonical" href="${`${import.meta.env.DOMAIN}${
          urlLogical === "/" ? "" : urlLogical
        }`}" />
      </head>
      <body>
        <div id="root">${stream}</div>
      </body>
    </html>`

  return {
    documentHtml,
    // See https://vike.dev/stream#initial-data-after-stream-end
    pageContext: async () => {
      return {
        someAsyncProps: 42,
      }
    },
  }
}
