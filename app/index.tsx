import PrimaryButton from "@/components/PrimaryButton";
import RecentCities from "@/components/RecentCities";
import SearchInput from "@/components/SearchInput";
import AbsoluteButton from "@/components/AbsoluteButton";
import WeatherCard from "@/components/WeatherCard";
import { useWeather } from "@/contexts/WeatherContext";
import { WeatherData } from "@/types/weather.types";
import { getTemperatureSign } from "@/utils/getTemperatureSign";
import { useCallback, useEffect, useState } from "react";
import { Text, StyleSheet, ActivityIndicator, ImageBackground, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const OPENWEATHER_API_KEY = "75b49287b666786ae5bd4a74822b18a1";

export default function Index() {
	const [city, setCity] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [recentCities, setRecentCities] = useState<string[]>([]);

	const { setWeather, weather, isFahrenheit, setIsFahrenheit } = useWeather();

	const getWeather = useCallback(
		async (currentCity: string) => {
			setLoading(true);
			setError("");
			try {
				const weather = (await (
					await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=${isFahrenheit ? "imperial" : "metric"}&appid=${OPENWEATHER_API_KEY}`)
				).json()) as WeatherData;
				if (+weather.cod >= 400) return setError("City not found. Please try again.");

				setWeather(weather);
				//Filtering to get only unique cities
				setRecentCities((prev) => [currentCity, ...prev.filter((c) => c !== currentCity)]);
			} catch (error) {
				setError("Some server error. Please try again later");
			} finally {
				setLoading(false);
			}
		},
		[isFahrenheit, setWeather]
	);

	useEffect(() => {
		if (weather) getWeather(weather.name);
	}, [isFahrenheit]);

	return (
		<SafeAreaProvider>
			<LinearGradient colors={["#87CEEB", "#4682B4", "#1E90FF"]} style={StyleSheet.absoluteFillObject} />
			<SafeAreaView style={styles.container}>
				<AbsoluteButton onPress={() => setIsFahrenheit((prev) => !prev)} style={{ right: 16, top: 60 }}>
					{getTemperatureSign(isFahrenheit)}
				</AbsoluteButton>
				<Text style={styles.title}>🌦️ Weather App</Text>
				<View style={styles.searchRow}>
					<SearchInput onChange={setCity} value={city} placeholder="Enter city name" />
					<PrimaryButton onPress={() => getWeather(city)} title="Search" />
				</View>
				{loading && <ActivityIndicator size="large" color="#2a2929" />}
				{error ? <Text style={styles.error}>{error}</Text> : null}
				{weather && !loading && <WeatherCard weather={weather} isFahrenheit={isFahrenheit} />}
				<RecentCities data={recentCities} onCityPress={setCity} />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, marginTop: 24 },
	title: { fontSize: 36, fontWeight: "700", textAlign: "center", marginBottom: 16, marginTop: 36 },
	error: { color: "red", textAlign: "center" },
	background: {
		...StyleSheet.absoluteFillObject, // Make the view cover the entire screen
		backgroundColor: "rgb(4, 8, 46)",
	},
	searchRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
});
