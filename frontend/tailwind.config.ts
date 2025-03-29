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
       redBrown: "#321E1B",
       lightYellow: "#f8d896",
       darkYellow: "#D78F00",
       turquoise: "#30D5C8",
        lightTurquoise: "#65E8DE",
        darkTurquoise: "#173D38"
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