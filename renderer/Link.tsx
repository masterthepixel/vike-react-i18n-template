export { Link }

import { localeDefault } from "../locales"
import { usePageContext } from "./usePageContext"
import React from "react"

type LinkProps = JSX.IntrinsicElements["a"] & { locale?: LanguageTag }

function Link({
  href = "/",
  locale,
  children,
  className,
  ...props
}: LinkProps) {
  const { locale: currentLocale, urlLogical } = usePageContext()
  const isActive =
    href === "/" ? urlLogical === href : urlLogical.startsWith(href)
  locale = locale || currentLocale
  if (locale !== localeDefault) {
    href = "/" + locale + href
  }
  return (
    <a
      {...props}
      href={href}
      className={`${className ?? ""} ${isActive ? "is-active" : ""}`}
    >
      {children}
    </a>
  )
}
