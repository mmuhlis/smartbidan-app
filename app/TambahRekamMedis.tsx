import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function TambahRekamMedis() {
    const [nama, setNama] = useState("");
    const [umur, setUmur] = useState("");
    const [kategori, setKategori] = useState("");
    const [alamat, setAlamat] = useState("");
    const [keluhan, setKeluhan] = useState("");
    const [diagnosa, setDiagnosa] = useState("");
    const [tindakan, setTindakan] = useState("");
    const [tanggalPeriksa, setTanggalPeriksa] = useState("");

    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem("auth_token");
            let userId = await AsyncStorage.getItem("user_id");

            if (!userId) {
                console.log("User ID masih null, mencoba mengambil ulang...");
                userId = await AsyncStorage.getItem("user_id");
            }

            console.log("Token:", token);
            console.log("User ID:", userId);

            if (!token || !userId) {
                Alert.alert("Error", "Token atau User ID tidak ditemukan. Harap login ulang.");
                return;
            }

            const response = await fetch("http://192.168.37.1:8000/api/bidan/rekam-medis", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_id: parseInt(userId), // ✅ Pastikan dalam format angka
                    nama,
                    umur,
                    kategori,
                    alamat,
                    keluhan,
                    diagnosa,
                    tindakan,
                    tanggal_periksa: tanggalPeriksa,
                }),
            });

            const result = await response.json();
            console.log("Response Store:", result);

            if (response.ok) {
                Alert.alert("Sukses", "Rekam medis berhasil ditambahkan!");
                router.replace("/rekammedis");
            } else {
                Alert.alert("Gagal", result.message || "Gagal menyimpan rekam medis.");
            }
        } catch (error) {
            console.error("Error saat menyimpan:", error);
            Alert.alert("Error", "Terjadi kesalahan saat menyimpan data.");
        }
    };




    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Tambah Rekam Medis</Text>
            <TextInput placeholder="Nama Pasien" style={styles.input} value={nama} onChangeText={setNama} />
            <TextInput placeholder="Umur" style={styles.input} value={umur} onChangeText={setUmur} keyboardType="numeric" />
            <TextInput placeholder="Kategori (IBU HAMIL, BALITA, dll)" style={styles.input} value={kategori} onChangeText={setKategori} />
            <TextInput placeholder="Alamat" style={styles.input} value={alamat} onChangeText={setAlamat} />
            <TextInput placeholder="Keluhan" style={styles.input} value={keluhan} onChangeText={setKeluhan} />
            <TextInput placeholder="Diagnosa" style={styles.input} value={diagnosa} onChangeText={setDiagnosa} />
            <TextInput placeholder="Tindakan" style={styles.input} value={tindakan} onChangeText={setTindakan} />
            <TextInput placeholder="Tanggal Periksa (YYYY-MM-DD)" style={styles.input} value={tanggalPeriksa} onChangeText={setTanggalPeriksa} />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

// 🎨 Styling
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f7f7f7",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#3498db",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
