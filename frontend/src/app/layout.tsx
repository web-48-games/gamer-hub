import type { Metadata } from 'next'
import '../globals.css'
import {Navigation} from "@/app/Components/Navigation";


export const metadata: Metadata = {
    title: 'Title Goes Here',
    description: 'description goes here',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout(props : RootLayoutProps) {
    const { children } = props
    return (
        <html  lang="en" suppressHydrationWarning>
        <body>
        <Navigation />
        {children}
        </body>
        </html>
    )
}

