import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#050507",
          2: "#09090f",
          3: "#0e0f18",
          4: "#141524",
          5: "#1b1c30",
        },
        mint: {
          DEFAULT: "#00ffaa",
          dim: "#00d48e",
        },
        gold: {
          DEFAULT: "#ffd700",
          dim: "#ccac00",
        },
        accent: {
          blue: "#5b8cff",
          purple: "#b06cff",
          coral: "#ff6b6b",
          cyan: "#00e5ff",
        },
      },
      fontFamily: {
        heading: ["var(--ff-h)"],
        body: ["var(--ff-b)"],
        mono: ["var(--ff-m)"],
      },
    },
  },
  plugins: [],
};

export default config;
