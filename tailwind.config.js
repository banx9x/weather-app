/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                overlay: {
                    "0%": { background: "rgba(0 0 0 / 0%)" },
                    "100%": { background: "rgba(0 0 0 / 30%)" },
                },
            },
            animation: {
                overlay: "overlay 0.3s ease-in-out forwards",
                overlay_exit: "overlay 0.3s ease-in-out backwards",
            },
            gridTemplateColumns: {
                forcecast: "repeat(6, 150px)",
            },
            gridTemplateRows: {
                forcecast: "40px repeat(5, 150px)",
            },
            gridColumn: {
                search: "1 / span 6",
                current: "1 / span 6",
                hourly: "1 / span 4",
                windy: "5 / span 2",
                daily: "1 / span 2",
                sunrise: "3",
                sunset: "4",
                uv: "3",
                wind: "4",
                precipition: "5",
                feels_like: "6",
                humidity: "3",
                visibility: "4",
                pressure: "5",
                average: "6",
            },
            gridRow: {
                search: "1",
                current: "2",
                hourly: "3",
                windy: "3 / span 2",
                daily: "4 / span 3",
                sunrise: "4",
                sunset: "4",
                uv: "5",
                wind: "5",
                precipitation: "5",
                feels_like: "5",
                humidity: "6",
                visibility: "6",
                pressure: "6",
                average: "6",
            },
        },
    },
    plugins: [],
};
