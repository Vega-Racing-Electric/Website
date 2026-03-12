/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0A0A0A",
                surface: "#141414",
                primary: "#E63946",
                secondary: "#FFFFFF",
                muted: "#888888",
            },
            fontFamily: {
                orbitron: ["Orbitron", "sans-serif"],
                sans: ["IBM Plex Sans", "sans-serif"],
                mono: ["IBM Plex Mono", "monospace"],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
