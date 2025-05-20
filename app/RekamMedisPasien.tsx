import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RekamMedisPasien() {
    const [rekamMedis, setRekamMedis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRekamMedis();
    }, []);

    const fetchRekamMedis = async () => {
        try {
            const token = await AsyncStorage.getItem("auth_token");
            if (!token) {
                setError("Token tidak ditemukan, silakan login kembali.");
                setLoading(false);
                return;
            }

            const response = await fetch("http://192.168.37.1:8000/api/user/rekam-medis", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.message || "Terjadi kesalahan saat mengambil data.");
            } else if (!json.rekam_medis || json.rekam_medis.length === 0) {
                setError("Tidak ada rekam medis yang ditemukan.");
            } else {
                setRekamMedis(json.rekam_medis);
            }
        } catch (err) {
            console.error("Error fetching rekam medis:", err);
            setError("Gagal mengambil data, coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📋 Rekam Medis Pasien</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                    data={rekamMedis}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>🆔 NIK: {item.nik}</Text>
                            <Text style={styles.subText}>
                                📌 Kategori: <Text style={styles.bold}>{item.kategori}</Text>
                            </Text>
                            <Text style={styles.subText}>💬 Keluhan: {item.keluhan}</Text>
                            <Text style={styles.subText}>🩺 Diagnosa: {item.diagnosa}</Text>
                            <Text style={styles.subText}>💉 Tindakan: {item.tindakan}</Text>
                            <Text style={styles.subText}>
                                👩‍⚕️ Bidan: {item.admin ? item.admin.nama_lengkap : "Tidak diketahui"}
                            </Text>
                            <Text style={styles.date}>
                                📅 Tanggal Periksa: {new Date(item.tanggal_periksa).toLocaleDateString()}
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f4f6f8",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 16,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        borderLeftWidth: 5,
        borderLeftColor: "#007bff",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#444",
        marginBottom: 6,
    },
    subText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4,
    },
    bold: {
        fontWeight: "bold",
        color: "#222",
    },
    date: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#007bff",
        marginTop: 8,
        textAlign: "right",
    },
    errorText: {
        textAlign: "center",
        fontSize: 16,
        color: "red",
        marginTop: 20,
    },
});

