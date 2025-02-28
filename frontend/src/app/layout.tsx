import type { Metadata } from 'next'
import '../globals.css'

import {Navigation} from "@/app/components/Navigation";

import {FooterComponent} from "@/app/components/FooterComponent";



export const metadata: Metadata = {
    title: 'A Game Away',
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
        <FooterComponent />

        </body>
        </html>
    )
}

