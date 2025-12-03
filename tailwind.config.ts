import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                brand: {
                    white: "#FFFFFF",
                    dark: "#00171F",
                    primary: "#003459",
                    secondary: "#007EA7",
                    accent: "#00A8E8",
                },
            },
        },
    },
    plugins: [],
};
export default config;
