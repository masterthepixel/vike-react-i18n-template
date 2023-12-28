import "./css/index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { PageShell } from "./PageShell"
import { getPageTitle } from "./getPageTitle"
import type { OnRenderClientAsync } from "vike/types"
import { sleep } from "../demo-utils/utils"
import { localeDefault } from "$/locales"

let root: ReactDOM.Root
// https://vike.dev/onRenderClient
export const onRenderClient: OnRenderClientAsync = async (
  pageContext
): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps = {}, locale = localeDefault } = pageContext
  const page = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )

  // ---
  // FOR CLIENT-SIDE ROUTING
  document.documentElement.lang = locale
  // ---

  // ---
  // FOR DEMO PURPOSES - ADD ARTIFICIAL DELAY
  await sleep(500)
  // ---

  const container = document.getElementById("root")!
  const timestamp = performance.now()
  window.hydration_started_at = timestamp
  if (!pageContext.isHydration) {
    // CSR SPA
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
    console.log(
      `Browser finished rendering in ${(performance.now() - timestamp).toFixed(
        2
      )}ms`
    )
  } else {
    // SSR
    root = ReactDOM.hydrateRoot(container, page)
  }
  // ---
  // FOR CLIENT-SIDE ROUTING
  document.title = getPageTitle(pageContext)
  // ---
}
