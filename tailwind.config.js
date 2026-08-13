/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#400a0c', // Burgundy
        'primary-container': '#5c1f1f',
        'on-primary': '#ffffff',
        'on-primary-container': '#db8481',
        'background': '#F4ECD8', // Aged Parchment
        'on-background': '#1f1c0f', // Iron Gall Ink
        'surface': '#fff9ee',
        'surface-dim': '#e1dac6',
        'surface-container': '#f5edd9',
        'surface-container-low': '#fbf3df',
        'surface-container-high': '#f0e8d4',
        'surface-container-highest': '#eae2ce',
        'on-surface': '#1f1c0f',
        'on-surface-variant': '#544342',
        'secondary': '#516351', // Forest Green
        'secondary-container': '#d4e8d1',
        'on-secondary': '#ffffff',
        'tertiary': '#291c00', // Mustard
        'tertiary-container': '#433000',
        'on-tertiary-container': '#bc9640',
        'outline': '#867271',
        'outline-variant': '#d9c1bf',
        'brass': '#c9a24b',
        'ink': '#2b241c',
        'parchment': '#f4ecd8',
      },
      fontFamily: {
        'display-lg': ['var(--font-garamond)', 'serif'],
        'display-md': ['var(--font-garamond)', 'serif'],
        'playfair': ['var(--font-playfair)', 'serif'],
        'cormorant': ['var(--font-cormorant)', 'serif'],
        'lora': ['var(--font-lora)', 'serif'],
        'body-lg': ['var(--font-literata)', 'serif'],
        'body-md': ['var(--font-literata)', 'serif'],
        'label-sm': ['var(--font-literata)', 'serif'],
        'writing-surface': ['var(--font-caveat)', 'cursive'],
        'kalam': ['var(--font-kalam)', 'cursive'],
        'homemade-apple': ['var(--font-apple)', 'cursive'],
      },
      borderRadius: {
        'DEFAULT': '0.125rem',
        'lg': '0.25rem',
        'xl': '0.5rem',
        'full': '0.75rem',
      },
      spacing: {
        'unit': '8px',
        'margin-page': '40px',
        'gutter-fold': '24px',
        'deckle-edge-offset': '4px',
      },
      boxShadow: {
        'soft-ambient': '0 10px 40px -10px rgba(43, 36, 28, 0.05)',
        'inner-pressed': 'inset 0 2px 4px 0 rgba(43, 36, 28, 0.1)',
        'wax-seal': 'inset -2px -2px 6px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,255,255,0.2), 0 4px 6px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};
