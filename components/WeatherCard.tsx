import { WeatherData } from "@/types/weather.types";
import { getTemperatureSign } from "@/utils/getTemperatureSign";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IWeatherCard {
	weather: WeatherData;
	isFahrenheit: boolean;
}

export default function WeatherCard({ weather, isFahrenheit }: IWeatherCard) {
	const router = useRouter();

	return (
		<TouchableOpacity style={styles.weatherCard} onPress={() => router.push({ pathname: "/details" })}>
			<Text style={styles.city}>📍 {weather.name}</Text>
			<Text style={styles.description}>{weather.weather[0].description}</Text>
			<Image source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` }} style={styles.weatherIcon} />
			<Text style={styles.temp}>
				{weather.main.temp.toFixed(0)}
				{getTemperatureSign(isFahrenheit)}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	weatherCard: {
		marginTop: 24,
		flexDirection: "column",
		justifyContent: "space-between",
		backgroundColor: "rgba(232, 232, 232, 0.3)",
		borderRadius: 12,
		margin: 16,
		padding: 24,
		paddingVertical: 64,
		alignItems: "center",
	},
	contentContainer: {
		display: "flex",
		flexDirection: "column",
	},
	city: { fontSize: 42, fontWeight: "bold" },
	temp: { fontSize: 42, fontWeight: "600" },
	description: { fontSize: 16, fontWeight: "500" },
	weatherIcon: {
		width: 160,
		height: 160,
		alignSelf: "center",
		marginTop: 8,
	},
});
