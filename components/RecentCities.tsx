import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IRecentCities {
	data: string[];
	onCityPress: (value: string) => void;
}

export default function RecentCities({ onCityPress, data }: IRecentCities) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Recent Cities</Text>
			<FlatList
				data={data}
				horizontal // Enable horizontal scrolling
				keyExtractor={(item, index) => index.toString()}
				showsHorizontalScrollIndicator={false} // Hide scroll indicator
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => onCityPress(item)} style={styles.cityContainer}>
						<Text style={styles.recentCity}>{item}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: "auto",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#2a2929",
		marginBottom: 8,
		paddingLeft: 8,
	},
	cityContainer: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: "#2a2929de",
		borderRadius: 16,
		marginHorizontal: 4,
	},
	recentCity: {
		fontSize: 16,
		color: "white",
	},
});
