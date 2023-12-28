import React from "react"
import { LocaleText } from '$/locales/LocaleText'

export default function Page() {
  return (
    <>
      <h1>
        <LocaleText>Hello</LocaleText>
      </h1>
      <p>
        <LocaleText>Another page</LocaleText>.
      </p>
    </>
  )
}
