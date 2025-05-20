import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditRekamMedis() {
    const router = useRouter();
    const { rekamMedis } = useLocalSearchParams();
    const data = JSON.parse(rekamMedis);

    const [keluhan, setKeluhan] = useState(data.keluhan);
    const [diagnosa, setDiagnosa] = useState(data.diagnosa);
    const [tindakan, setTindakan] = useState(data.tindakan);

    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem("auth_token");
            if (!token) {
                Alert.alert("Error", "Token tidak ditemukan.");
                return;
            }

            const response = await fetch(`http://192.168.94.1:8000/api/bidan/rekam-medis/${data.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ keluhan, diagnosa, tindakan }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert("Sukses", "Rekam medis berhasil diperbarui.");
                router.push("/rekammedis");
            } else {
                Alert.alert("Error", result.message);
            }
        } catch (error) {
            Alert.alert("Error", "Gagal memperbarui rekam medis.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Rekam Medis</Text>
            <TextInput style={styles.input} value={keluhan} onChangeText={setKeluhan} placeholder="Keluhan" />
            <TextInput style={styles.input} value={diagnosa} onChangeText={setDiagnosa} placeholder="Diagnosa" />
            <TextInput style={styles.input} value={tindakan} onChangeText={setTindakan} placeholder="Tindakan" />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
        </View>
    );
}

// 🎨 Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f7f7",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        backgroundColor: "#3498db",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
