/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./renderer/**/*.{js,ts,jsx,tsx,mdx}",
    "./locales/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Add support for RTL languages
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'Arial', 'sans-serif'],
        'chinese': ['Noto Sans SC', 'SimSun', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Add RTL support plugin
    function({ addUtilities }) {
      addUtilities({
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
      })
    }
  ],
}
