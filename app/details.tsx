import { View, Text, Button, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useWeather } from "@/contexts/WeatherContext";
import { useRouter } from "expo-router";
import { convertToLocalTime } from "@/utils/convertToLocalTime";
import { getTemperatureSign } from "@/utils/getTemperatureSign";
import AbsoluteButton from "@/components/AbsoluteButton";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function DetailsScreen() {
	const { weather, isFahrenheit } = useWeather();
	const router = useRouter();

	return (
		<SafeAreaProvider>
			<LinearGradient colors={["#87CEEB", "#4682B4", "#1E90FF"]} style={StyleSheet.absoluteFillObject} />
			<SafeAreaView>
				<AbsoluteButton onPress={() => router.back()} style={styles.backBtn}>
					Back
				</AbsoluteButton>
				{weather && (
					<View style={styles.weatherContainer}>
						<Text style={styles.header}>🌦️ Weather in {weather.name}</Text>
						<Text style={styles.text}>
							🌡️ Temp: {weather.main.temp}
							{getTemperatureSign(isFahrenheit)}
						</Text>
						<Text style={styles.text}>
							🔼 Temp max: {weather.main.temp_max}
							{getTemperatureSign(isFahrenheit)}
						</Text>
						<Text style={styles.text}>
							🔽 Temp min: {weather.main.temp_min}
							{getTemperatureSign(isFahrenheit)}
						</Text>
						<Text style={styles.text}>💧 Humidity: {weather.main.humidity}</Text>
						<Text style={styles.text}>🌬️ Pressure: {weather.main.pressure}</Text>
						<Text style={styles.text}>🌅 Sunrise: {convertToLocalTime(weather.sys.sunrise)}</Text>
						<Text style={styles.text}>🌇 Sunset: {convertToLocalTime(weather.sys.sunset)}</Text>
					</View>
				)}
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	backBtn: {
		backgroundColor: "#2a2929",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		left: 16,
		top: 92,
		zIndex: 5,
	},
	backBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

	header: {
		fontSize: 36,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 16,
	},

	weatherContainer: {
		backgroundColor: "rgba(223, 223, 223, 0.2)",
		borderRadius: 12,
		margin: 16,
		padding: 24,
		marginTop: 98,
		paddingVertical: 64,
	},
	text: {
		fontSize: 18,
		color: "#2a2929",
		marginVertical: 4,
		fontWeight: "600",
	},
	loader: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -25 }, { translateY: -25 }],
	},
});
