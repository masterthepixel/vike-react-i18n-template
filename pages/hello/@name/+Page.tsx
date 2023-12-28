export default Page

import React from "react"
import { useData } from "$/renderer/useData"
import type { Data } from "./+data"
import { Link } from "$/renderer/Link"
import { LocaleText } from "$/locales/LocaleText"
import { navigate } from "vike/client/router"
import { unknown_names } from "../names"

function Page() {
  const { name, isStranger } = useData<Data>()
  return (
    <>
      <h1>
        <LocaleText>Hello</LocaleText>
      </h1>
      <p>
        <LocaleText>Hi</LocaleText> <b>{name}</b>.
      </p>
      {isStranger ? (
        <p>
          <LocaleText>You are a stranger</LocaleText>,{" "}
          <LocaleText>nice to meet you</LocaleText>.
        </p>
      ) : (
        <></>
      )}
      <ul>
        <li>
          <Link href="/hello/rom">/hello/rom</Link>
        </li>
        <li>
          <Link href="/hello/sebastien">/hello/sebastien</Link>
        </li>
        <li>
          <Link href="/hello/clement">/hello/clement</Link>
        </li>
        <li>
          <Link href="/hello/andy">/hello/andy</Link>
        </li>
        <li>
          <Link href="/hello/forbidden">/hello/forbidden</Link>
        </li>
      </ul>
      <p>
        <button
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * unknown_names.length)
            navigate(`/hello/${unknown_names[randomIndex]}`)
          }}
        >
          Random
        </button>
      </p>
    </>
  )
}
