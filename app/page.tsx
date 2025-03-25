"use client";

import { Input } from "@/components/ui/input";
import { Sun } from "lucide-react";
import { useState, useEffect } from "react";

type WeatherCurrent = {
    temperature_2m: number;
};

type WeatherCurrentUnits = {
    temperature_2m: string;
};

type WeatherData = {
    current: WeatherCurrent;
    current_units: WeatherCurrentUnits;
};

async function read_weather(): Promise<WeatherData> {
    const url =
        "https://api.open-meteo.com/v1/forecast?latitude=32.7157&longitude=-117.1647&current=temperature_2m&timezone=America%2FLos_Angeles&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";

    const response = await fetch(url);
    const response_data: WeatherData = await response.json();

    return response_data;
}

export default function Home() {
    const [weather, set_weather] = useState<string | undefined>(undefined);
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        (async () => {
            const weather_response = await read_weather();

            const {
                current: { temperature_2m },
                current_units: { temperature_2m: temp_units },
            } = weather_response;

            set_weather(`${temperature_2m} ${temp_units}`);
        })();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const seconds = now.getSeconds().toString().padStart(2, "0");
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col p-2">
            <header className="flex justify-end">
                <div className="flex flex-col">
                    <div className="flex">
                        <Sun />
                        <p>{weather}</p>
                    </div>
                    <p>
                        {new Date(Date.now()).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </p>
                    <p>{currentTime}</p>
                </div>
            </header>
            <main className="flex-1 flex flex-col justify-center">
                <div className="max-w-3/4 mx-auto">
                    <h1>Welcome home Terrance. :)</h1>
                    <Input
                        type="search"
                        placeholder="Hey, what's up again?"
                        onKeyDownCapture={(e) => {
                            if (e.key === "Enter") {
                                window.location.href = `https://duckduckgo.com/?q=${(e.target as HTMLInputElement).value}`;
                            }
                        }}
                    />

                    <div>
                        <ul>
                            <li>Tech News</li>
                            <li>World & Local News</li>
                            <li>YouTube</li>
                        </ul>
                    </div>
                </div>
            </main>
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
        </div>
    );
}
