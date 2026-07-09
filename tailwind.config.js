/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0c0e',        // near-black base
        paper: '#e9e7e0',      // warm off-white for text
        signal: '#ff5a1f',     // hot film-leader orange — used sparingly
        celluloid: '#1a1c1f',  // panel background, one step up from ink
        wire: '#2b2e33',       // hairlines / borders
        phosphor: '#7de89a',   // terminal-green accent for code bits
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Oswald"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
}
