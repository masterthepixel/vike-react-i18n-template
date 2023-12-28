import type { PageContextServer } from "vike/types"
import { known_names } from "./names"
// import { render } from 'vike/abort'
export type Data = ReturnType<typeof data>

// https://vike.dev/data
export function data(pageContext: PageContextServer) {
  const { name } = pageContext.routeParams
  if (name !== "visiter" && !known_names.includes(name)) {
    return { name: name ? name : "visiter", isStranger: true }
    // throw render(404, `Unknown name: ${name}.`)
  }
  return { name, isStranger: !name || name === "visiter" }
}
