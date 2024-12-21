import { WeatherProvider } from "@/contexts/WeatherContext";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<WeatherProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="details" options={{ headerShown: false }} />
			</Stack>
		</WeatherProvider>
	);
}
