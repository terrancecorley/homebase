'use client';

import { Input } from '@/components/ui/input';
import { Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

type WeatherCurrent = {
    apparent_temperature: number;
}

type WeatherData = {
    current?: WeatherCurrent;
}

async function read_weather(): Promise<WeatherData> {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=32.7157&longitude=-117.1647&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,rain,showers,visibility,relative_humidity_2m,uv_index,precipitation&current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature,showers,relative_humidity_2m,rain,cloud_cover,weather_code&minutely_15=precipitation,rain&timezone=America%2FLos_Angeles&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch';

    const response = await fetch(url);
    const response_data: WeatherData = await response.json();
    
    return response_data;
}

export default function Home() {
    const [ weather, set_weather ] = useState<WeatherData | null>(null);

    useEffect(() => {
        (async() => {
            const weather_response = await read_weather();
            set_weather(weather_response);
        })();
    }, []);

    return (
        <div>
            <header>
                <p><Sun /></p>
                <p>{weather?.current?.apparent_temperature}</p>
                <p>
                    {new Date(Date.now()).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                    })}
                </p>
            </header>
            <main>
                <h1>Welcome home. :)</h1>
                <Input type='search' placeholder="Hey, what's up again?" />

                <div>
                    <ul>
                        <li>Tech News</li>
                        <li>World & Local News</li>
                        <li>YouTube</li>
                    </ul>
                </div>
            </main>
            <footer>
                <p>Created by <a href='https://terrancecorley.com' rel='noopener noreferrer'>Terrance Corley</a></p>
            </footer>
        </div>
    );
}
