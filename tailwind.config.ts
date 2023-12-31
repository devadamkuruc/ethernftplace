module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "ether-grey-1": "rgba(255,255,255, 0.05)",
        "ether-grey-2": "rgba(255,255,255, 0.10)",
        "ether-grey-3": "rgba(255,255,255, 0.15)",
        "ether-grey-4": "rgba(255,255,255, 0.25)",
        "ether-grey-5": "rgba(255,255,255, 0.65)",
        "ether-grey-6": "rgba(255,255,255, 0.75)",
        "ether-grey": "#353945",
        "ether-blue": "#0D37A4",
        "ether-pink-1": "rgba(255,0,153,1)",
        "ether-pink-2": "rgba(255,0,153,0.55)",
        "ether-orange": "rgba(236,150,122,0.55)",
      },
      width: {
        108: "108px",
        148: "148px",
        188: "188px",
        215: "215px",
        324: "324px",
        357: "357px",
        416: "416px",
        488: "488px",
        557: "557px",
      },
      minWidth: {
        155: "155px",
        190: "190px",
        215: "215px",
        240: "240px",
        256: "256px",
        327: "327px",
      },
      height: {
        108: "108px",
        111: "111px",
        128: "128px",
        148: "148px",
        188: "188px",
        228: "228px",
        300: "300px",
        416: "416px",
        488: "488px",
        544: "544px",
        557: "557px",
        576: "576px",
      },
      inset: {
        45: "45%",
        65: "65px",
        164: "164px",
        200: "200px",
        240: "240px",
        290: "290px",
        330: "330px",
        485: "485px",
        620: "620px",
      },
      blur: {
        "4xl": "330px",
      },
      spacing: {
        65: "65px",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
      lineHeight: {
        70: "70px",
      },
      zIndex: {
        "-5": "-5",
        0: "0",
      },
    },
    screens: {
      lg: { max: "1800px" },
      md: { max: "990px" },
      mdsm: { max: "820px" },
      sm: { max: "600px" },
      xs: { max: "400px" },
      minmd: "1700px",
      minlg: "2100px",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
