export default Page

import React from 'react'
import { Counter } from '../../components/Counter'
import { LocaleText } from '../../locales/LocaleText'
import { locales } from '../../locales/locales'
import { Link } from '../../renderer/Link'

function Page() {
  return (
    <>
      <h1>Welcome to Vike</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
      <ul>
        <li>
          <LocaleText>Localized</LocaleText>. <LocaleText>Change language</LocaleText>:{' '}
          {locales.map((locale) => (
            <Link locale={locale} href="/" key={locale} style={{ marginLeft: 7 }}>
              {locale}
            </Link>
          ))}
        </li>
        <li>
          <LocaleText>Rendered to HTML</LocaleText>
        </li>
        <li>
          <LocaleText>Interactive</LocaleText> <Counter />
        </li>
      </ul>
    </>
  )
}
