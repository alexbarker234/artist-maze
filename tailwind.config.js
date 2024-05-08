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
                },
                "loader-bounce": {
                    "0%, 100%": { height: "50%", top: "50%" },
                    "50%": { height: "100%", top: "0%" }
                }
            },
            animation: {
                fadeDropIn: "fadeDropIn 0.3s forwards",
                wiggle: "wiggle 1s ease-in-out",
                "loader-bounce": "loader-bounce 1s ease-in-out infinite"
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
