import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Institutional accent palette
        navy: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        institutional: {
          navy: '#1d4ed8',
          'navy-hover': '#1e40af',
          green: '#047857',
          'green-hover': '#065f46',
          canvas: '#f8fafc',
          card: '#ffffff',
          'border-subtle': '#e2e8f0',
          'border-prominent': '#cbd5e1',
        },
        // Canvas & surface tokens
        surface: {
          canvas: '#f8fafc',
          card: '#ffffff',
          hover: '#f1f5f9',
          subtle: '#f8fafc',
        },
      },
      boxShadow: {
        'enterprise-card': '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
        'enterprise-hover': '0 4px 12px rgba(15, 23, 42, 0.08)',
        'enterprise-modal': '0 20px 60px rgba(15, 23, 42, 0.16)',
      },
      borderRadius: {
        'enterprise': '12px',
      },
    },
  },
  plugins: [],
};
export default config;
