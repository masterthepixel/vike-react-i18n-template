import React from "react"
import { Hero } from "$/components/Hero"
import { Counter } from "$/components/Counter"
import { LocaleText } from "$/locales/LocaleText"
import { locales } from "$/locales/locales"
import { Link } from "$/components/Link"

export default function Page() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <LocaleText>Welcome</LocaleText> to Vike
          </h2>
          <p className="text-gray-600 mb-6">
            <LocaleText>This page is</LocaleText>:
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              <LocaleText>Localized</LocaleText>.{" "}
              <span className="ml-2">
                <LocaleText>Change language</LocaleText>:{" "}
                {locales.map((locale) => (
                  <Link
                    locale={locale}
                    href="/"
                    key={locale}
                    className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors"
                  >
                    {locale}
                  </Link>
                ))}
              </span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              <LocaleText>Rendered to HTML</LocaleText>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              <LocaleText>Interactive</LocaleText>
              <div className="ml-4">
                <Counter />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
