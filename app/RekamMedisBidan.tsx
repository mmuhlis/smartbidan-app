import React, { useEffect, useState } from "react";
import {
    View, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function RekamMedisBidan() {
    const [rekamMedis, setRekamMedis] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchRekamMedis();
    }, []);

    const fetchRekamMedis = async () => {
        try {
            const token = await AsyncStorage.getItem("auth_token");
            if (!token) {
                console.error("Token tidak ditemukan");
                return;
            }

            const response = await fetch("http://192.168.198.212:8000/api/bidan/rekam-medis", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const json = await response.json();
            if (json.rekam_medis) {
                const groupedData = json.rekam_medis.reduce((acc, item) => {
                    const key = item.user ? `${item.user.nama_lengkap} | NIK: ${item.user.nik || '-'}` : "Tidak Diketahui";
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(item);
                    return acc;
                }, {});
                setRekamMedis(groupedData);
            } else {
                console.error("Gagal mengambil data rekam medis:", json.message);
            }
        } catch (error) {
            console.error("Error fetching rekam medis:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Rekam Medis Pasien</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : Object.keys(rekamMedis).length === 0 ? (
                <Text style={styles.emptyText}>Tidak ada rekam medis.</Text>
            ) : (
                <FlatList
                    data={Object.keys(rekamMedis)}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() =>
                                router.push({
                                    pathname: "/DetailRekamMedis",
                                    params: { data: JSON.stringify(rekamMedis[item]), nama: item }
                                })
                            }
                        >
                            <Text style={styles.title}>{item}</Text>
                            <Text style={styles.subText}>Total Rekam Medis: {rekamMedis[item].length}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("http://192.168.198.212:8000/admin/login")}
            >
                <Text style={styles.addButtonText}>+ Tambah Rekam Medis</Text>
            </TouchableOpacity>
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
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "#333",
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
        color: "#007bff",
        marginBottom: 4,
    },
    subText: {
        fontSize: 14,
        color: "#555",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#777",
        marginTop: 20,
    },
    addButton: {
        marginTop: 20,
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});