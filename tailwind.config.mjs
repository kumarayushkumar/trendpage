/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Helvetica', ...defaultTheme.fontFamily.sans],
      heading: ['Georgia', ...defaultTheme.fontFamily.serif]
    },
    extend: {
      colors: {
        primary: '#fefefa',
        secondary: '#001219',
        accent: '#bb1102'
      }
    }
  },
  plugins: []
}
