import React from 'react'
import { languageConfig } from './LanguageWrapper'
import { LocalizedText } from './LanguageWrapper'
import { LocaleText } from '$/locales/LocaleText'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Vike i18n Template
              </h1>
            </div>            <div className="hidden md:flex space-x-6">
              <a 
                href="/" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <LocalizedText>
                  <LocaleText>Home</LocaleText>
                </LocalizedText>
              </a>
              <a 
                href="/about" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <LocalizedText>
                  <LocaleText>About</LocaleText>
                </LocalizedText>
              </a>
              <a 
                href="/examples" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <LocalizedText>
                  <LocaleText>Examples</LocaleText>
                </LocalizedText>
              </a>
              <a 
                href="/hello" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Hello
              </a>
              <a 
                href="/star-wars" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <LocalizedText>
                  <LocaleText>Movies</LocaleText>
                </LocalizedText>
              </a>
            </div>
          </div>          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Language:</span>
            <div className="flex flex-wrap gap-1">
              {Object.entries(languageConfig).map(([code, config]) => {
                const href = code === 'en' ? '/' : `/${code}`
                return (
                  <a 
                    key={code}
                    href={href} 
                    className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded flex items-center space-x-1"
                    title={config.name}
                    dir={config.direction}
                  >
                    <span>{config.flag}</span>
                    <span className={config.fontClass}>
                      {code === 'zh' ? '中文' : 
                       code === 'ar' ? 'عربي' : 
                       code.toUpperCase()}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Vike i18n Template</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A modern React application template with internationalization, 
              multiple render modes, and Tailwind CSS.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Internationalization (i18n)</li>
              <li>• Server-side Rendering</li>
              <li>• Static Site Generation</li>
              <li>• Tailwind CSS</li>
              <li>• TypeScript</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Technologies</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Vike (Vite-plugin-ssr)</li>
              <li>• React 18</li>
              <li>• Vite</li>
              <li>• pnpm</li>
              <li>• PostCSS</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Vike React i18n Template. Built with ❤️ and modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  )
}
