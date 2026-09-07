import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#dbe4fd',
          300: '#bdcdfb',
          400: '#93acf7',
          500: '#6384f1',
          600: '#4361ee',
          700: '#344bc7',
          800: '#2b3ca0',
          900: '#26347f',
          950: '#161d49',
        },
        surface: {
          canvas: '#090a0f',
          card: '#0f121a',
          'card-hover': '#141824',
          subtle: '#181d2c',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-strong': 'rgba(255, 255, 255, 0.15)',
        },
        slate: {
          850: '#121622',
          900: '#0c0f17',
          950: '#07090e',
        }
      },
      boxShadow: {
        'saas-card': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.4), 0 8px 24px -4px rgba(0, 0, 0, 0.3)',
        'saas-hover': '0 0 0 1px rgba(255, 255, 255, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.5), 0 12px 32px -4px rgba(0, 0, 0, 0.4)',
        'saas-sm': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'saas': '14px',
      }
    },
  },
  plugins: [],
};
export default config;
