import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";

export default function LoginSelection() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/laporan.png")} style={styles.logo} />
            <Text style={styles.title}>Login Sebagai</Text>
            <Text style={styles.subtitle}>Pilih Jenis Login di Bawah Ini</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.card}>
                    <Image source={require("../assets/images/laporan.png")} style={styles.image} />
                    <Text style={styles.buttonText}>Bidan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <Image source={require("../assets/images/laporan.png")} style={styles.image} />
                    <Text style={styles.buttonText}>Pasien</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    card: {
        backgroundColor: "#f8f9fa",
        borderRadius: 10,
        alignItems: "center",
        padding: 15,
        width: 140,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#6c757d",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
});
