import type { Config } from 'tailwindcss';

// Plugins:
import plugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';
import twTypography from '@tailwindcss/typography';
import twAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Geist', ...defaultTheme.fontFamily.sans],
        mono: ['GeistMono', ...defaultTheme.fontFamily.mono],
        gambarino: ['Gambarino', ...defaultTheme.fontFamily.sans]
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            'h1 a': {
              'text-decoration': 'none'
            },
            'h2 a': {
              'text-decoration': 'none'
            },
            blockquote: {
              'font-style': 'normal'
            }
          }
        },
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' }
          }
        }
      },
      animation: {
        shine: 'shine 2s linear infinite',
        gradient: 'gradient 8s linear infinite'
      },
      keyframes: {
        gradient: {
          to: {
            backgroundPosition: 'var(--bg-size) 0'
          }
        },
        shine: {
          from: {
            backgroundPosition: '0 0'
          },
          to: {
            backgroundPosition: '-200% 0'
          }
        }
      }
    }
  },
  plugins: [
    twTypography,
    twAnimate,
    plugin(function ({ addVariant }) {
      addVariant(
        'prose-inline-code',
        '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))'
      );
    })
  ]
};

export default config;
