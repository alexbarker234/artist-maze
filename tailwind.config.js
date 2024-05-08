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
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(0deg)" },
                    "20%, 60%": { transform: "rotate(20deg)" },
                    "40%, 80%": { transform: "rotate(-20deg)" }
                }
            },
            animation: {
                fadeDropIn: "fadeDropIn 0.3s forwards",
                wiggle: "wiggle 1s ease-in-out"
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
