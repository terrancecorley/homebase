"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";

export default function Home() {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (
                e.key === "/" &&
                document.activeElement !== searchInputRef.current
            ) {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function handleSearchValueChange(e: ChangeEvent<HTMLInputElement>): void {
        setSearchValue(e.target.value);
    }

    const handleKeyDownCapture = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                const trimmedSearchValue = searchValue.trim();
                const geminiKeyword = "/ai";
                const geminiUrl = "https://gemini.google.com/app";
                const youtubePageKeyword = "/y";
                const youtubePagePath = "/youtube";
                const techNewsPageKeyword = "/t";
                const worldNewsPageKeyword = "/n";

                switch (trimmedSearchValue) {
                    case geminiKeyword:
                        window.location.href = geminiUrl;
                        break;
                    case youtubePageKeyword:
                        router.push(youtubePagePath);
                        break;
                    // TODO: add tech and world news conditions
                    default:
                        window.location.href = `https://duckduckgo.com/?q=${searchValue.trim()}`;
                }
            }
        },
        [searchValue],
    );

    return (
        <div className="max-w-3/4 mx-auto">
            <h1>Welcome home Terrance. :)</h1>
            <Input
                type="search"
                placeholder="Hey, what's up?"
                onChange={handleSearchValueChange}
                onKeyDownCapture={handleKeyDownCapture}
                value={searchValue}
                ref={searchInputRef}
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
