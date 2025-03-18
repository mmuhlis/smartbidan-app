import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";

export default function RekamMedisBidan() {
    const [rekamMedis, setRekamMedis] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRekamMedis();
    }, []);

    const fetchRekamMedis = async () => {
        try {
            const token = "59|mXxNfb1f5OSzBiIQdPeGdGZfqgYX9qg8fqPm0sUk70cdc3b9"; // Sesuaikan dengan token yang valid
            const response = await fetch("http://192.168.201.212:8000/api/user/rekam-medis", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const json = await response.json();
            console.log("Response API:", json);

            if (json.status) {
                setRekamMedis(json.data); // Simpan data ke state
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
                <ActivityIndicator size="large" color="#0000ff" />
            ) : rekamMedis.length === 0 ? (
                <Text style={styles.emptyText}>Tidak ada rekam medis.</Text>
            ) : (
                <FlatList
                    data={rekamMedis}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>Nama: {item.user.nama_lengkap}</Text>
                            <Text style={styles.subText}>NIK: {item.user.nik}</Text>
                            <Text style={styles.subText}>Kategori: {item.kategori}</Text>
                            <Text style={styles.subText}>Keluhan: {item.keluhan}</Text>
                            <Text style={styles.subText}>Diagnosa: {item.diagnosa}</Text>
                            <Text style={styles.subText}>Tindakan: {item.tindakan}</Text>
                            <Text style={styles.subText}>Bidan: {item.admin.nama_lengkap}</Text>
                            <Text style={styles.date}>Tanggal Periksa: {item.tanggal_periksa}</Text>
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
    date: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#007bff",
        marginTop: 4,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#777",
    },
});
