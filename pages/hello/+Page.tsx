export default Page

import React from "react"
import { useData } from "../../renderer/useData"
import type { Data } from "./+data"
import { Link } from "../../renderer/Link"

function Page() {
  const { name } = useData<Data>()
  return (
    <>
      <h1>Hello</h1>
      <p>
        Hi <b>{name}</b>.
      </p>
      <ul>
        <li>
          <Link href="/hello/sebastien">/hello/sebastien</Link>
        </li>
        <li>
          <Link href="/hello/clement">/hello/clement</Link>
        </li>
        <li>
          <Link href="/hello/andy">/hello/andy</Link>
        </li>
      </ul>
      <p>
        Parameterized routes can be defined by exporting a route string in{" "}
        <code>+route.ts</code>.
      </p>
    </>
  )
}
