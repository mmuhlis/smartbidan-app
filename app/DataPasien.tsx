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
            const token = "59|mXxNfb1f5OSzBiIQdPeGdGZfqgYX9qg8fqPm0sUk70cdc3b9"; // Sesuaikan dengan token yang valid
            const response = await fetch("http://192.168.201.212:8000/api/user/data-pasien", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const json = await response.json();
            console.log("Response API:", json);

            if (json.status) {
                setDataPasien(json.data); // Simpan data ke state
            }
        } catch (error) {
            console.error("Error fetching data pasien:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Daftar Pasien</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : dataPasien.length === 0 ? (
                <Text style={styles.emptyText}>Tidak ada data pasien.</Text>
            ) : (
                <FlatList
                    data={dataPasien}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>Nama: {item.nama_lengkap}</Text>
                            <Text style={styles.subText}>NIK: {item.nik}</Text>
                            <Text style={styles.subText}>Alamat: {item.alamat}</Text>
                            <Text style={styles.subText}>No HP: {item.no_hp}</Text>
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
        backgroundColor: "#f8f9fa",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 2,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#777",
    },
});
