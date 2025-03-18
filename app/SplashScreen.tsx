import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

export default function SplashScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require("../assets/images/logobidan2.png")} style={styles.logo} />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Mulai</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 120,
        height: 120,
    },
    button: {
        backgroundColor: "#3B82F6",
        paddingVertical: 20,
        paddingHorizontal: 80,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 50,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});
