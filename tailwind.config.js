// === tailwind.config.js (aktifkan dark mode dan extend warna) ===
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#10B981', // emerald-500
          light: '#D1FAE5',   // emerald-100
          dark: '#065F46',    // emerald-900
        }
      },
    },
  },
  plugins: [],
}