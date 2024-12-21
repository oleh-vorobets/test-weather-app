import { StyleSheet, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from "react-native";

interface AbsoluteButtonProps {
	onPress: () => void;
	children: string;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}

export default function AbsoluteButton({ onPress, children, style, textStyle }: AbsoluteButtonProps) {
	return (
		<TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
			<Text style={[styles.btnText, textStyle]}>{children}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	btn: {
		backgroundColor: "#2a2929",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		zIndex: 5,
	},
	btnText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
