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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0B3D91",
          hover: "#082e6d",
          light: "#ebf2fc",
          dark: "#062252",
        },
        accent: {
          DEFAULT: "#00B8A9",
          hover: "#009c8f",
          light: "#e6f8f6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
