/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{js,jsx,ts,tsx}", // ← مهم علشان يشتغل جوه React

  ],
    darkMode: 'class', 
  theme: {
    extend: {
        fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
         colors: {
        primaryDark: '#0D1117',         // خلفية رئيسية داكنة
        secondaryDark: '#161B22',       // كروت أو عناصر فرعية
        primaryLight: '#ffffff',        // خلفية الوضع النهاري
        secondaryLight: '#f5f5f5',      // كروت أو عناصر فرعية في Light
        primaryGreen: '#00FF7F',        // أخضر ساطع - للعناوين أو الزر
        darkNavbar: '#12161C',          // خلفية الـ Navbar الداكن
        lightNavbar: '#ffffff',         // Navbar في الوضع النهاري
      }
    },
  },
  plugins: [],
}

