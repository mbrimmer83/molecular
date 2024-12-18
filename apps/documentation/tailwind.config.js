/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}', // Scan Remix `app` directory
    './components/**/*.{js,jsx,ts,tsx}', // Optional: Shared components folder
    './routes/**/*.{js,jsx,ts,tsx}' // Include routes if used
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
