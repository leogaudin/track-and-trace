import React from "react";
import { Text, View, Pressable } from "react-native";
import globalStyles from "../../styles/GlobalStyles";

export default function IconButton({icon}) {
	return (
		<View
			style={{
					height: 42,
					width: 42,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "red",
					margin: 30,
					borderRadius: 100,
					backgroundColor: "#EFEFEF77",
				}}
		>
			{icon}
		</View>
	);
}
