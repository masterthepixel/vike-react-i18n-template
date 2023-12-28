import React from "react"
import clsx from "clsx"
import { extractLocale, localeDefault } from "../locales"
import { usePageContext } from "../renderer/usePageContext"

type LinkProps = JSX.IntrinsicElements["a"] & {
  locale?: LanguageTag
  highlightThreshold?: number
}

export function Link({
  href = "/",
  highlightThreshold = 1,
  locale,
  children,
  className,
  target,
  ...props
}: LinkProps) {
  const { locale: currentLocale, urlPathname } = usePageContext()
  const { urlWithoutLocale: currentUrlLogical } = extractLocale(urlPathname)
  locale = locale || currentLocale
  if (locale !== localeDefault) {
    href = `/${locale}${href === "/" ? "" : href}`
  }
  if (!href.startsWith("/")) {
    target = "_blank"
  }
  let relative_degree = 0
  const current_segments = currentUrlLogical.split("/")
  const { urlWithoutLocale: targetUrlLogical } = extractLocale(href)
  const target_segments = targetUrlLogical.split("/")
  for (
    let i = 0;
    i < Math.min(current_segments.length, target_segments.length);
    i++
  ) {
    if (current_segments[i] === target_segments[i]) {
      relative_degree++
    }
  }

  return (
    <a
      {...props}
      href={href}
      className={clsx(className, {
        "is-active": currentUrlLogical === targetUrlLogical,
        "is-related": relative_degree > highlightThreshold,
      })}
    >
      {children}
    </a>
  )
}
