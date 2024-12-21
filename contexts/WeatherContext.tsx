import { WeatherData } from "@/types/weather.types";
import React, { createContext, useContext, useState } from "react";

interface IWeatherContext {
	weather: WeatherData | null;
	setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
	isFahrenheit: boolean;
	setIsFahrenheit: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeatherContext = createContext<IWeatherContext | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [isFahrenheit, setIsFahrenheit] = useState(false);

	return <WeatherContext.Provider value={{ weather, setWeather, isFahrenheit, setIsFahrenheit }}>{children}</WeatherContext.Provider>;
}

export function useWeather() {
	const context = useContext(WeatherContext);
	if (!context) throw new Error("Weather context isn't valid here");
	return context;
}
