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
        sandyBrown: "#F4A261",
        brownAccent: "#391C04",
        mint: "#8BD0AD",
        cornflower: "#a4cafe",
        blueAccent: "#f0f9ff",
        floralWhite: "#FBF0DA",
        charcoal: "#264653",
        burntSienna: "#EB866F"
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(),
  ],
}

export default config
