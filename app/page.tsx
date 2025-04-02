"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
    return (
        <div className="max-w-3/4 mx-auto">
            <h1>Welcome home Terrance. :)</h1>
            <Input
                type="search"
                placeholder="Hey, what's up?"
                onKeyDownCapture={(e) => {
                    if (e.key === "Enter") {
                        window.location.href = `https://duckduckgo.com/?q=${(e.target as HTMLInputElement).value}`;
                    }
                }}
            />

            <div>
                <ul className="grid grid-cols-2 gap-2 m-2">
                    <li>
                        <Link href="/tech-news">Tech News</Link>
                    </li>
                    <li>
                        <Link href="/news">World & Local News</Link>
                    </li>
                    <li>
                        <Link href="/youtube">YouTube</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
