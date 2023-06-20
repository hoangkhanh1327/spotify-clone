/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // important: true,
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px'
    },
    container: {
      center: true,
      padding: '12px',
      maxWidth: {
        DEFAULT: '576px',
        sm: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
      }
    },
    keyframes: {
      'zoomIn': {
        '0%': {
          opacity: 0,
          transform: 'scale3d(.3, .3, .3)'
        },
        '50%': {
          opacity: 1
        }
      },
      'fadeInUp': {
        '0%': {
          opacity: 0,
          transform: 'translate3d(0, 100%, 0)'
        },
        '100%': {
          opacity: 1,
          transform: 'none'
        }
      },
      'fadeInDown': {
        '0%': {
          opacity: 0,
          transform: 'translate3d(0, -100%, 0)'
        },
        '100%': {
          opacity: 1,
          transform: 'translateZ(0)'
        }
      }
    },
    extend: {
      animation: {
        'zoomIn': 'zoomIn 0.7s 0.3s',
        'fadeInUp': 'fadeInUp 1.2s 0.5s forwards',
        'fadeInDown': 'fadeInDown 0.9s cubic-bezier(0.2, 1, 0.22, 1)'
      },
      backgroundImage: {
        'nav-item': 'linear-gradient(0deg,hsla(140,3%,77%,.08),hsla(140,3%,77%,.08))',
        'nav-item-active': 'linear-gradient(0deg,rgba(0, 74, 119, .07), rgba(0, 74, 119, .7))'
      },
      boxShadow: {
        'accountDropdown': '0 0 5px rgb(0 0 0 / 20%);',
        'productDropdown': '0 0 20px 5px rgb(0 0 0 / 10%);'
      },

      boxShadow: {
        stickyHeader: '0 1px 3px rgba(0, 0, 0, 0.11)'
      },
      colors: {
        'blue-1': '#c2e7ff',
        'blue-2': '#004a77',
        // primary: '#2d2f31',#c2e7ff
        background: '#1f1f1f',
        'gray-1': '#28292a',
        'gray-2': '#2d2f31',
        'gray-3': '#333438',
        'secondary': '#c4c7c5',
        'gradient-1': ''
      }
    },
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 12px',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
          '@screen 2xl': {
            maxWidth: '1320px'
          }
        },
        '.container-fluid': {
          display: 'block',
          width: '100%',
          padding: '0 12px',
          margin: '0 auto'
        }
      })
    },
  ],
}
