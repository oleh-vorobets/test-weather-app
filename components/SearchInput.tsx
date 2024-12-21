import React from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SearchInput({ onChange, value, placeholder }: any) {
	return (
		<View style={styles.inputContainer}>
			<Icon name="search" size={20} color="#2a2929" style={styles.loupeIcon} />
			<TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={(text) => onChange(text)} />
			{value ? (
				<TouchableOpacity onPress={() => onChange("")} style={styles.clearButton}>
					<Icon name="times" size={14} color="#f1f1f1" />
				</TouchableOpacity>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1.5,
		borderColor: "#2a2929",
		borderRadius: 8,
		paddingHorizontal: 10,
		height: 40,
		flexGrow: 1,
		backgroundColor: "rgba(223, 223, 223, 0.2)",
	},
	loupeIcon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		fontSize: 20,
		height: "100%",
		fontWeight: 500,
		color: "#2a2929",
	},
	clearButton: {
		backgroundColor: "#2a2929",
		borderRadius: 15,
		padding: 5,
		marginLeft: 8,
		aspectRatio: 1 / 1,
		height: 24,
		alignItems: "center",
		justifyContent: "center",
	},
});
