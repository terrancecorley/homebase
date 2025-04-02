"use client";

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

export default function SiteHeader() {
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
    );
}
