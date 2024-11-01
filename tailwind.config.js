/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    // 必须指向以下路径才能将本项目、nextui、tailwindcss进行关联
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwindcss/**/*.js",
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
      // defaultTheme: "dark", // default theme from the themes object
      // defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: { // common layout tokens (applied to all themes)
        dividerWeight: "1px", // h-divider the default height applied to the divider component
        disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "1rem", // text-medium
          large: "1.125rem", // text-large
        },
        lineHeight: {
          tiny: "1rem", // text-tiny
          small: "1.25rem", // text-small
          medium: "1.5rem", // text-medium
          large: "1.75rem", // text-large
        },
        radius: {
          small: "8px", // rounded-small
          medium: "12px", // rounded-medium
          large: "14px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "2px", // border-medium (default)
          large: "3px", // border-large
        },
      },
      themes: {
        // light: {
        //   layout: {}, // light theme layout tokens
        //   colors: {}, // light theme colors
        // },
        // dark: {
        //   layout: {}, // dark theme layout tokens
        //   colors: {
        //     primary: {
        //       DEFAULT: "#71717A",
        //       // foreground: "#000000",
        //     },
        //     // focus: "#BEF264",
        //   }, // dark theme colors
        // },
        // ... custom themes
        "common-dark": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#27272A",
            foreground: "#ffffff",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#DD62ED",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#DD62ED",
              foreground: "#ffffff",
            },
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            fontSize: {
              tiny: "0.75rem", // text-tiny
              small: "0.875rem", // text-small
              medium: "1rem", // text-medium
              large: "1.125rem", // text-large
              xlarge: "1.25rem", // text-xlarge
              xxlarge: "1.5rem", // text-xxlarge
            },
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }
  )],
}

