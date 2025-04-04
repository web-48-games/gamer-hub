// app/layout.tsx

import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google'; // Import the font
import '../globals.css'; // Your global styles

import { Navigation } from "@/app/components/Navigation";
import { FooterComponent } from "@/app/components/FooterComponent";

// Configure the Quicksand font
const quicksand = Quicksand({
    subsets: ['latin'], // Specify character subsets needed
    weight: ['400', '500', '700'], // Specify desired font weights
    display: 'swap', // Use 'swap' for better performance (avoids blocking render)
    variable: '--font-quicksand' // Optional: Define a CSS variable if needed elsewhere
});

export const metadata: Metadata = {
    title: 'A Game Away',
    description: 'description goes here',
};

type RootLayoutProps = {
    children: React.ReactNode
};

export default function RootLayout(props : RootLayoutProps) {
    const { children } = props;
    return (
        // Apply the font class to the html or body tag
        // Using suppressHydrationWarning is often needed when element attributes differ between server/client (like className potentially could if not careful, though next/font handles it well)
        <html lang="en" className={`${quicksand.variable} font-sans`} suppressHydrationWarning>
        {/* Applying the main font class to the body for cascading, and antialiased for better rendering */}
        <body className={`${quicksand.className} antialiased`}>

        <Navigation />
        {/* Ensure flex layout pushes footer down */}
        <div className="min-h-screen flex flex-col">
            {/* Main content area takes remaining space */}
            <main className="flex-grow">{children}</main>
            <FooterComponent />
        </div>

        </body>
        </html>
    );
}
