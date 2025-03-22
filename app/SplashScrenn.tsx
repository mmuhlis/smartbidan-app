import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
    const router = useRouter();
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <Text style={styles.logoText}>Smart Bidan</Text>
            </Animated.View>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/Login")}>
                <Text style={styles.buttonText}>Mulai</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#007bff",
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
    },
    button: {
        width: "80%",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: "#007bff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
