/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            keyframes: {
                fadeDropIn: {
                    from: {
                        opacity: "0",
                        transform: "translateY(-3rem)"
                    },
                    to: {
                        opacity: "1"
                    }
                }
            },
            animation: {
                fadeDropIn: "fadeDropIn 0.5s forwards"
            }
        }
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "animate-delay": (value) => ({
                        animationDelay: value
                    })
                },
                { values: theme("transitionDelay") }
            );
        })
    ]
};
