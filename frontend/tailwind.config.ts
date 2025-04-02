import type { Config } from 'tailwindcss'
import {content, plugin} from "flowbite-react/tailwind"


const config: Config = {
  content: [
    content(),
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
          'gh-mesa': {
              100: '#F8E3C5', // Light sand
              200: '#F6AD55', // Light-Medium
              300: '#E67E22', // Medium terracotta
              400: '#BA4A00', // Dark red clay
              500: '#7D3C0A', // Extra dark adobe
          },
          'gh-teal': {
              100: '#B2F5EA', // Pale turquoise
              200: '#4FD1C5', // NM jewelry turquoise
              300: '#319795', // Mountain waters
              400: '#2C7A7B', // Deep turquoise
              500: '#1D4B4A', // Shadowed teal
          },
          'gh-desert' : {
              100: '#FEFCBF', // Pale sunrise
              200: '#F6E05E', // Desert bloom
              300: '#ECC94B', // Golden hour
              400: '#D69E2E', // Amber
              500: '#975A16', // Aged game pieces
          },
          'gh-red' : {
              100: '#FED7D7', // Desert bloom
              200: '#FC8181', // NM ristras
              300: '#E53E3E', // Chili red
              400: '#B91C1C', // Rich burgundy
              500: '#742A2A', // Clay pots
              600: '#471C1C' // reddish brown
          },
          // i.e. accent-purple
          'accent': {
              'purple': '#6B46C1', // Evening skies
              'green': '#276749',  // Pinon trees
              'neutral': '#E2E8F0', // Game paper/cards
          },

          //90% White
          'white-95': '#F2F2F2',

          //Warm Saturated
          'wasa': {
              100: '#FCDB90',
              200: '#FFB755',
              300: '#FE6900',
              400: '#BA3600',
              500: '#5A1000',
          },
          //Warm Desaturated
          'wade': {
              100: '#FCEECD',
              200: '#FFDFB3',
              300: '#FEC7A0',
              400: '#D5AC9B',
              500: '#9E7F78',

          },
          //Cool Saturated
          'cosa': {
              100: '#CEFFD4',
              200: '#A9F0B7',
              300: '#1BD9B6',
              400: '#0AA1AA',
              500: '#03568A',
          },
          'code': {
              100: '#EBFFEE',
              200: '#D0F3D7',
              300: '#9FDFD3',
              400: '#95E3E8',
              500: '#76B1D6',
          },









          redBrown: "#321E1B",
          lightYellow: "#FFD073",
          lightRed: "#EAC0C0",
          paleRed: "#FFDCD6"

      },
        fontFamily: {
            'montserrat': ['Montserrat', 'sans-serif'],
            'raleway': ['Raleway', 'sans-serif']
        }
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(),
  ],
}

export default config