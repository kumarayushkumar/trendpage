/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      logo: ['Galano', ...defaultTheme.fontFamily.serif],
      sans: ['Helvetica', ...defaultTheme.fontFamily.sans],
      highlight: ['Georgia', ...defaultTheme.fontFamily.serif]
    },
    extend: {
      colors: {
        green: 'hsl(var(--green))',
        white: 'hsl(var(--white))',
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
