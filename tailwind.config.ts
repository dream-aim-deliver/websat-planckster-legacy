import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx", "./src/lib/**/*.ts", "./src/lib/**/*.tsx"],
  theme: {
    screens: {
      sm: "380px",
      md: "440px",
      lg: "640px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        gluten: "Gluten",
        varela: "Varela Round",
      },
      // Font Size Reference: https://tailwindcss.com/docs/font-size
      animation: {
        "slide-down": "slide-down 0.5s ease-out",
        fadeout: "fadeout 3s ease-in-out",
      },
      keyframes: {
        "slide-down": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeout: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      colors: {
        "base-colors/neutral": {
          50: "#FBF7F3",
          100: "#F6E6DC",
          200: "#E3CABA",
          400: "#D1AC98",
          600: "#8E5A45",
          900: "#3D1F14",
        },
        "base-colors/brand": {
          400: "#05B86D",
          600: "#009F55",
          700: "#008F3B",
        },
        text: {
          primary: "#3D1F16",
          secondary: "#8E5A45",
          inverted: "#FBF7F3",
          success: "#009F55",
          error: "#b42245",
          warning: "#D48C00",
          action: "#009F55",
          actionHover: "#05B86D",
          actionPressed: "#008F3B",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
