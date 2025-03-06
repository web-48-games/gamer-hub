import type { Config } from 'tailwindcss'
import {content, plugin} from "flowbite-react/tailwind"


const config: Config = {
  content: [
    content(),
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(),
  ],
}

module.exports = {
  theme:
      {
        extend: {
          colors: {
            primary: "F4A261",
            accent: "74C69D",
            background: "FDF7EC",
            text: "264653",
            Surface: "E76F51"
          },
        },
      },
      plugins: [],
}

export default config
