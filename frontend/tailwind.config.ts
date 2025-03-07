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

export default config