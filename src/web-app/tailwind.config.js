/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    content: [
        flowbite.content(),],
    theme: {
        extend: {},
    },
    plugins: [flowbite.plugin(),
    ],
}

