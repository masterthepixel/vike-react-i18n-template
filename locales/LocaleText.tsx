import React from "react"
import { usePageContext } from "../renderer/usePageContext"
import { translate } from "."

export function LocaleText({ children }: { children: string }) {
  const pageContext = usePageContext()
  const { locale = "en" } = pageContext
  const text = children
  const textLocalized = translate(text, locale)
  return <>{textLocalized}</>
}
