import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from "react-native";
import { useRouter } from "expo-router";

export default function RegistrasiPasien() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        nik: "",
        nama_lengkap: "",
        alamat: "",
        no_hp: "",
    });

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };


    const handleRegister = async () => {
        try {
            const response = await fetch("http://192.168.198.212:8000/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const textResponse = await response.text(); // Ambil respon dalam teks terlebih dahulu

            try {
                const result = JSON.parse(textResponse); // Coba parse ke JSON
                console.log("Response API:", result);

                if (response.ok) {
                    Alert.alert("Sukses", "Registrasi berhasil! Silakan login.");
                    router.push("/");
                } else {
                    Alert.alert("Error", result.message || "Registrasi gagal.");
                }
            } catch (jsonError) {
                console.error("Error parsing JSON:", textResponse);
                Alert.alert("Error", "Server mengembalikan respons yang tidak valid.");
            }
        } catch (error) {
            console.error("Error saat registrasi:", error);
            Alert.alert("Error", "Terjadi kesalahan, coba lagi.");
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>FORM REGISTRASI PASIEN</Text>
            <Text style={styles.subtitle}>Silahkan Lengkapi Data Berikut Ini</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="NIK"
                keyboardType="numeric"
                value={formData.nik}
                onChangeText={(text) => handleChange("nik", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nama Lengkap"
                value={formData.nama_lengkap}
                onChangeText={(text) => handleChange("nama_lengkap", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Alamat"
                value={formData.alamat}
                onChangeText={(text) => handleChange("alamat", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="No HP"
                keyboardType="phone-pad"
                value={formData.no_hp}
                onChangeText={(text) => handleChange("no_hp", text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Daftar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/")}>
                <Text style={styles.linkText}>Sudah punya akun? Login di sini</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    linkText: {
        color: "#007bff",
        marginTop: 15,
        fontSize: 14,
    },
});
