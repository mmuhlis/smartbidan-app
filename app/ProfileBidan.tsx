import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileBidan() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("auth_token");
            await AsyncStorage.removeItem("admin_id");
            Alert.alert("Logout Berhasil", "Anda telah keluar.");
            router.replace("/"); // Redirect ke halaman login
        } catch (error) {
            console.error("Error saat logout:", error);
            Alert.alert("Error", "Gagal logout, coba lagi.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: "#d9534f",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
