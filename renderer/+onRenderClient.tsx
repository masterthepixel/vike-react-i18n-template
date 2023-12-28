// https://vike.dev/onRenderClient
export { onRenderClient }

import './css/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageShell } from './PageShell'
import { getPageTitle } from './getPageTitle'
import type { OnRenderClientAsync } from 'vike/types'
import { sleep } from '../demo-utils/utils'

let root: ReactDOM.Root
const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  const { Page, locale } = pageContext
  const page = (
    <PageShell pageContext={pageContext}>
      <Page />
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

  const container = document.getElementById('root')!
  if (pageContext.isHydration) {
    console.log("is Hydration")
    root = ReactDOM.hydrateRoot(container, page)
  } else {
    console.log("is Rendering")
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
  }
  // ---
  // FOR CLIENT-SIDE ROUTING
  document.title = getPageTitle(pageContext)
  // ---
}
