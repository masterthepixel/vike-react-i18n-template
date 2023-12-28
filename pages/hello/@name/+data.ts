// https://vike.dev/data
export { data }
export type Data = ReturnType<typeof data>

import type { PageContextServer } from "vike/types"
import { known_names } from "../names"
// import { render } from 'vike/abort'

function data(pageContext: PageContextServer) {
  const { name } = pageContext.routeParams
  if (name !== "Visiter" && !known_names.includes(name)) {
    return { name: name ? name : "Visiter", isStranger: true }
    // throw render(404, `Unknown name: ${name}.`)
  }
  return { name, isStranger: !name || name === "Visiter" }
}
