/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: { // addCommonColors需开启为true
      //   black: "#A1A1AA",
      //   // .. rest of the colors
      // },
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  // variants: {
  //   extend: {},
  // },
  plugins: [nextui(
    {
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            primary: {
              DEFAULT: "#71717A",
              // foreground: "#000000",
            },
            // focus: "#BEF264",
          }, // dark theme colors
        },
        // ... custom themes
      },
    }
  )],
}

