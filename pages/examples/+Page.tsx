import React, { useState } from "react"
import { LocaleText } from '$/locales/LocaleText'
import { Button } from '$/components/Button'
import { Card, CardHeader, CardContent, CardFooter } from '$/components/Card'
import { Input, Textarea } from '$/components/Form'
import { Layout } from '$/components/Layout'
import { LanguageWrapper, LocalizedText } from '$/components/LanguageWrapper'

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <LanguageWrapper>
      <Layout>
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <section className="text-center py-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <LocalizedText>
                <LocaleText>Tailwind CSS Examples</LocaleText>
              </LocalizedText>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <LocalizedText>
                This page demonstrates various Tailwind CSS components and patterns 
                that you can use throughout your Vike React i18n application. Now supporting 
                English, German, French, Chinese, Spanish, and Arabic!
              </LocalizedText>
            </p>
          </section>

          {/* Multilingual Showcase */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              <LocalizedText>
                <LocaleText>Button Components</LocaleText>
              </LocalizedText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Welcome messages in all languages */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">
                    <LocalizedText>Multilingual Welcome</LocalizedText>
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🇺🇸</span>
                      <span>Welcome to our app</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🇩🇪</span>
                      <span>Wilkommen in unserer App</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🇫🇷</span>
                      <span>Bienvenue dans notre application</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🇨🇳</span>
                      <span className="font-chinese">欢迎使用我们的应用</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🇪🇸</span>
                      <span>Bienvenido a nuestra aplicación</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl">
                      <span className="text-2xl">🇸🇦</span>
                      <span className="font-arabic">أهلا وسهلا في تطبيقنا</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Typography showcase */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">
                    <LocalizedText>Typography Samples</LocalizedText>
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Arabic (RTL)</p>
                      <p className="font-arabic text-right" dir="rtl">
                        هذا مثال على النص العربي مع الاتجاه من اليمين إلى اليسار
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Chinese (Simplified)</p>
                      <p className="font-chinese">
                        这是中文文本的示例，展示了中文字体的美观效果
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Spanish</p>
                      <p>
                        Este es un ejemplo de texto en español con acentos y caracteres especiales: ñ, ü, é
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current locale info */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">
                    <LocalizedText>Current Language</LocalizedText>
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">🌍</div>
                    <p className="text-lg font-semibold">
                      <LocalizedText>
                        <LocaleText>Welcome</LocaleText>
                      </LocalizedText>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <LocalizedText>
                        Switch languages using the navigation above to see the interface adapt
                      </LocalizedText>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Button variants */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  <LocalizedText>Button Variants</LocalizedText>
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">
                    <LocalizedText>
                      <LocaleText>Welcome</LocaleText>
                    </LocalizedText>
                  </Button>
                  <Button variant="secondary">
                    <LocalizedText>
                      <LocaleText>Hello</LocaleText>
                    </LocalizedText>
                  </Button>
                  <Button variant="outline">
                    <LocalizedText>
                      <LocaleText>Interactive</LocaleText>
                    </LocalizedText>
                  </Button>
                  <Button variant="ghost">
                    <LocalizedText>
                      <LocaleText>Counter</LocaleText>
                    </LocalizedText>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Form Section with multilingual labels */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              <LocalizedText>
                <LocaleText>Form Components</LocaleText>
              </LocalizedText>
            </h2>
            <div className="max-w-2xl">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">
                    <LocalizedText>Contact Form Example</LocalizedText>
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <LocalizedText>
                      Demonstrating form inputs with localized labels and multilingual support.
                    </LocalizedText>
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <Input
                      label="Full Name / الاسم الكامل / 全名 / Nombre completo"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                    
                    <Input
                      label="Email Address / البريد الإلكتروني / 电子邮件 / Correo electrónico"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      error={formData.email && !formData.email.includes('@') ? 'Please enter a valid email address' : undefined}
                    />
                    
                    <Textarea
                      label="Message / الرسالة / 消息 / Mensaje"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows={4}
                    />
                  </form>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-3">
                    <Button>
                      <LocalizedText>Send Message</LocalizedText>
                    </Button>
                    <Button variant="outline">
                      <LocalizedText>Save Draft</LocalizedText>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Language Direction Demo */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              <LocalizedText>Language Direction Support</LocalizedText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Left-to-Right (LTR)</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-2">English</p>
                      <p>This text flows from left to right, which is the standard direction for most Latin-based languages.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-900 mb-2">中文 (Chinese)</p>
                      <p className="font-chinese">中文文本也是从左到右阅读，现代中文排版通常采用这种方式。</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Right-to-Left (RTL)</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-900 mb-2 text-right">العربية (Arabic)</p>
                      <p className="font-arabic text-right" dir="rtl">
                        هذا النص يتدفق من اليمين إلى اليسار، وهو الاتجاه الطبيعي للغة العربية. 
                        يتم تطبيق التصميم المناسب تلقائياً باستخدام CSS وخصائص الاتجاه.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Color Palette with cultural considerations */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              <LocalizedText>Culturally Aware Design</LocalizedText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏮</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Chinese Design</h4>
                    <p className="text-sm text-gray-600">
                      Red symbolizes good fortune and joy in Chinese culture
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🕌</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Arabic Design</h4>
                    <p className="text-sm text-gray-600">
                      Green is often associated with Islamic culture and nature
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏖️</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Spanish Design</h4>
                    <p className="text-sm text-gray-600">
                      Warm colors reflect the vibrant Spanish and Latin American cultures
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </Layout>
    </LanguageWrapper>
  )
}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Card Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="Simple Card"
              description="A basic card with title and description. Perfect for displaying content in a clean, organized way."
            >
              <Button size="sm">Learn More</Button>
            </Card>
            
            <Card
              variant="elevated"
              title="Elevated Card"
              description="An elevated card with more prominent shadow. Great for highlighting important content."
            >
              <div className="flex space-x-2">
                <Button size="sm" variant="primary">Primary</Button>
                <Button size="sm" variant="outline">Secondary</Button>
              </div>
            </Card>
            
            <Card variant="outlined">
              <CardHeader>
                <h3 className="text-lg font-semibold">Custom Card Structure</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This card uses the modular CardHeader, CardContent, and CardFooter components.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost">Action</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Form Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Form Components</h2>
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Contact Form Example</h3>
                <p className="text-gray-600 mt-2">
                  Demonstrating form inputs with validation states and styling.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    helpText="We'll use this to personalize your experience"
                  />
                  
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    error={formData.email && !formData.email.includes('@') ? 'Please enter a valid email address' : undefined}
                  />
                  
                  <Textarea
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={4}
                    helpText="Be as detailed as you'd like"
                  />
                </form>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-3">
                  <Button>Send Message</Button>
                  <Button variant="outline">Save Draft</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Grid Layouts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Grid Layouts</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Responsive Grid</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <div 
                    key={num}
                    className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center"
                  >
                    <h4 className="text-lg font-semibold">Item {num}</h4>
                    <p className="text-blue-100 mt-2">Grid item content</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Feature Grid</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Fast Performance</h4>
                  <p className="text-gray-600">
                    Optimized for speed with Vite and modern build tools.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Global Ready</h4>
                  <p className="text-gray-600">
                    Built-in internationalization support for multiple languages.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Modern Design</h4>
                  <p className="text-gray-600">
                    Beautiful, responsive design with Tailwind CSS utilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Typography</h2>
          <div className="prose prose-lg max-w-none">
            <h1>Heading 1 - The largest heading</h1>
            <h2>Heading 2 - Secondary heading</h2>
            <h3>Heading 3 - Tertiary heading</h3>
            <h4>Heading 4 - Quaternary heading</h4>
            
            <p className="lead text-xl text-gray-600 leading-relaxed">
              This is a lead paragraph with larger text and relaxed line spacing. 
              Perfect for introductions and important content.
            </p>
            
            <p>
              This is a regular paragraph with normal text sizing. It demonstrates 
              how text flows naturally with proper spacing and readability in mind.
              <strong> This text is bold</strong> and <em>this text is italic</em>.
            </p>
            
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
              "Tailwind CSS is a utility-first CSS framework that makes it easy to build 
              beautiful, responsive designs without writing custom CSS."
            </blockquote>
          </div>
        </section>

        {/* Color Palette */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Blue', colors: ['bg-blue-100', 'bg-blue-300', 'bg-blue-500', 'bg-blue-700', 'bg-blue-900'] },
              { name: 'Green', colors: ['bg-green-100', 'bg-green-300', 'bg-green-500', 'bg-green-700', 'bg-green-900'] },
              { name: 'Purple', colors: ['bg-purple-100', 'bg-purple-300', 'bg-purple-500', 'bg-purple-700', 'bg-purple-900'] },
              { name: 'Red', colors: ['bg-red-100', 'bg-red-300', 'bg-red-500', 'bg-red-700', 'bg-red-900'] },
              { name: 'Yellow', colors: ['bg-yellow-100', 'bg-yellow-300', 'bg-yellow-500', 'bg-yellow-700', 'bg-yellow-900'] },
              { name: 'Gray', colors: ['bg-gray-100', 'bg-gray-300', 'bg-gray-500', 'bg-gray-700', 'bg-gray-900'] },
            ].map(palette => (
              <div key={palette.name}>
                <h4 className="text-sm font-medium text-gray-700 mb-2">{palette.name}</h4>
                <div className="space-y-1">
                  {palette.colors.map((color, index) => (
                    <div
                      key={color}
                      className={`h-8 rounded ${color} border border-gray-200`}
                      title={`${palette.name} ${(index + 1) * 200 - 100}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
