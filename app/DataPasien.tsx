import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DataPasien() {
    const [dataPasien, setDataPasien] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDataPasien();
    }, []);

    const fetchDataPasien = async () => {
        try {
            // Ambil token dari AsyncStorage
            const token = await AsyncStorage.getItem("auth_token");
            if (!token) {
                console.error("Token tidak ditemukan");
                return;
            }

            const response = await fetch("http://192.168.198.212:8000/api/bidan/data-pasien", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const json = await response.json();
            console.log("Response API:", json);

            if (json.status) {
                setDataPasien(json.data);
            } else {
                console.error("Gagal mengambil data pasien:", json.message);
            }
        } catch (error) {
            console.error("Error fetching pasien:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>👩‍⚕️ Daftar Pasien</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : dataPasien.length === 0 ? (
                <Text style={styles.emptyText}>⚠️ Tidak ada data pasien.</Text>
            ) : (
                <FlatList
                    data={dataPasien}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>{item.nama_lengkap}</Text>
                            <Text style={styles.subText}><Text style={styles.label}>NIK:</Text> {item.nik}</Text>
                            <Text style={styles.subText}><Text style={styles.label}>Alamat:</Text> {item.alamat}</Text>
                            <Text style={styles.subText}><Text style={styles.label}>No HP:</Text> {item.no_hp}</Text>
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
        backgroundColor: "#f4f6f9",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#007bff",
        marginBottom: 16,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 6,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: "#007bff",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007bff",
        marginBottom: 4,
    },
    subText: {
        fontSize: 14,
        color: "#444",
        marginBottom: 2,
    },
    label: {
        fontWeight: "bold",
        color: "#222",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#777",
        marginTop: 20,
    },
});
