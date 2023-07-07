import React from "react";
import { Pressable, View } from "react-native";

interface IconButtonProps {
	icon: React.ReactNode;
	onPress: () => void;
}

export default function IconButton({icon, onPress}: IconButtonProps) {
	return (
		<Pressable onPress={onPress}>
			<View
				style={{
						height: 42,
						width: 42,
						justifyContent: "center",
						alignItems: "center",
						margin: 30,
						borderRadius: 100,
						backgroundColor: "#EFEFEF77",
					}}
			>
				{icon}
			</View>
		</Pressable>
	);
}
