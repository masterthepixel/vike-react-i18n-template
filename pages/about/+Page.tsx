import React from "react"
import { LocaleText } from '$/locales/LocaleText'

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        <LocaleText>Hello</LocaleText>
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        <LocaleText>Another page</LocaleText>.
      </p>
      
      {/* Example of Tailwind styling */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">
          Tailwind CSS is now configured!
        </h2>
        <p className="text-blue-700">
          This page demonstrates basic Tailwind CSS styling with responsive design,
          modern colors, and spacing utilities.
        </p>
      </div>
    </div>
  )
}
