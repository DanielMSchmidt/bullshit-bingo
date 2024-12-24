import { StyleSheet, Image, View } from "react-native";

export default function TabTwoScreen() {
    return (
        <View style={{ flex: 1, height: "100%", width: "100%" }}>
            <Image
                style={{ flex: 1, height: "100%", width: "100%" }}
                source={{
                    uri: "https://www.katebackdrop.de/cdn/shop/files/BH1046908Q.jpg?v=1695115301&width=1000",
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
});
