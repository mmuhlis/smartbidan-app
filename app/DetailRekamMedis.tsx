import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function DetailRekamMedis() {
    const { data, nama } = useLocalSearchParams();
    const rekamMedis = JSON.parse(data); // Konversi kembali dari string ke objek

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🩺 Detail Rekam Medis</Text>
            <Text style={styles.title}>{nama}</Text>

            <FlatList
                data={rekamMedis}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.subText}><Text style={styles.label}>Kategori:</Text> {item.kategori}</Text>
                            <Text style={styles.subText}><Text style={styles.label}>Keluhan:</Text> {item.keluhan}</Text>
                            <Text style={styles.subText}><Text style={styles.label}>Diagnosa:</Text> {item.diagnosa}</Text>
                            <Text style={styles.subText}><Text style={styles.label}>Tindakan:</Text> {item.tindakan}</Text>
                            <Text style={styles.subText}><Text style={styles.label}>Bidan:</Text> {item.admin?.nama_lengkap || "Tidak tersedia"}</Text>
                            <Text style={styles.date}>📅 {item.tanggal_periksa}</Text>
                        </View>
                    </View>
                )}
            />
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
        marginBottom: 10,
        textAlign: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 12,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: "#007bff",
    },
    cardContent: {
        flexDirection: "column",
    },
    subText: {
        fontSize: 14,
        color: "#444",
        marginBottom: 4,
    },
    label: {
        fontWeight: "bold",
        color: "#222",
    },
    date: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#28a745",
        marginTop: 6,
        textAlign: "right",
    },
});
