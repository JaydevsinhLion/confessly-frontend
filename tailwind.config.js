/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // ================================
      // 🎨 CONFESSLY — BRAND THEME
      // ================================
      colors: {
        // 🌑 Core Shades
        dark: "#0A0A0A", // Deep black base
        midnight: "#0F172A", // Header/nav dark blue
        slate: "#1E293B", // Neutral gray-blue
        surface: "#151A22", // Card & container background

        // ✨ Brand Accents
        gold: "#FFD700",
        rose: "#F43F5E",
        emerald: "#10B981",
        violet: "#7C3AED",
        cyan: "#06B6D4",

        // ⚙️ Neutrals & Text
        textPrimary: "#F8FAFC",
        textSecondary: "#94A3B8",

        // 🪶 Utility Backgrounds
        background: "#0A0A0A",
        card: "#151A22",
      },

      // ================================
      // 🖋️ Typography
      // ================================
      fontFamily: {
        display: ['"Cinzel"', "serif"], // Titles
        body: ['"Inter"', "sans-serif"], // Paragraphs
      },

      // ================================
      // 💫 Shadows
      // ================================
      boxShadow: {
        glow: "0 0 20px rgba(255, 215, 0, 0.3)",
        soft: "0 4px 24px rgba(0, 0, 0, 0.25)",
        gold: "0 0 25px rgba(212, 175, 55, 0.4)",
      },

      // ================================
      // 🌈 Backgrounds
      // ================================
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "gradient-confessly":
          "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(10,10,10,1) 100%)",
      },

      // ================================
      // 🎞️ Keyframes & Animations
      // ================================
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        shimmer: "shimmer 3s ease-in-out infinite alternate",
        fadeInUp: "fadeInUp 0.8s ease-out both",
      },

      // ================================
      // 🕊️ Transitions
      // ================================
      transitionTimingFunction: {
        "in-out-soft": "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      // ================================
      // 📏 Container Layouts
      // ================================
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
        },
      },
    },
  },

  // ================================
  // 🧩 Plugins
  // ================================
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
