import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        basil: {
          50: "#f0f7f0",
          100: "#dceddd",
          200: "#b8dab9",
          300: "#8bc08d",
          400: "#5fa563",
          500: "#3f8a44",
          600: "#2f6f34",
          700: "#28572b",
          800: "#234626",
          900: "#1e3a20",
        },
        honey: {
          50: "#fdf8ec",
          100: "#faedc9",
          200: "#f5d78e",
          300: "#efbd53",
          400: "#eaa62b",
          500: "#d4881a",
          600: "#b06814",
          700: "#8c4e14",
          800: "#733f16",
          900: "#623517",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;
