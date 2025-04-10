import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import AuthButtons from "@/components/auth/AuthButtons";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Homebase",
    description: "A personal homebase for all things web",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="min-h-screen flex flex-col p-2">
                    <SiteHeader AuthButtons={<AuthButtons />} />
                    <main className="flex-1 flex flex-col justify-center">
                        {children}
                    </main>
                </div>
                <footer className="text-center">
                    <p>
                        Created by{" "}
                        <a
                            href="https://terrancecorley.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Terrance Corley
                        </a>
                    </p>
                </footer>
            </body>
        </html>
    );
}
