import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function SkriningPasien() {
    const navigation = useNavigation();
    const [tanggal, setTanggal] = useState("");
    const [bidan, setBidan] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deteksi Dini</Text>
            <Text style={styles.subtitle}>Resiko Tinggi Kehamilan</Text>

            <View style={styles.inputContainer}>
                <FontAwesome name="clock-o" size={20} color="black" style={styles.icon} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Tanggal Pengkajian"
                    value={tanggal}
                    onChangeText={setTanggal}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={20} color="black" style={styles.icon} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Bidan Pelaksana"
                    value={bidan}
                    onChangeText={setBidan}
                />
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
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ddd",
        padding: 12,
        borderRadius: 8,
        width: "100%",
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    inputText: {
        fontSize: 16,
        color: "black",
        flex: 1,
    },
    button: {
        backgroundColor: "#DFF6FF",
        padding: 15,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
});