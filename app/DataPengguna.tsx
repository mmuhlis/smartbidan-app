import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DataPengguna() {
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDataPengguna();
    }, []);

    const fetchDataPengguna = async () => {
        try {
            // Ambil token dari AsyncStorage
            const token = await AsyncStorage.getItem("auth_token");
            if (!token) {
                console.error("Token tidak ditemukan");
                return;
            }

            const response = await fetch("http://192.168.198.212:8000/api/bidan/data-pengguna", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const json = await response.json();
            console.log("Response API:", json);

            if (json.status) {
                setAdmins(json.data.admins || []);
                setUsers(json.data.users || []);
            } else {
                console.error("Gagal mengambil data pengguna:", json.message);
            }
        } catch (error) {
            console.error("Error fetching data pengguna:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>👥 Data Pengguna</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <>
                    <Text style={styles.sectionHeader}>🩺 Daftar Bidan</Text>
                    {admins.length === 0 ? (
                        <Text style={styles.emptyText}>⚠️ Tidak ada bidan yang terdaftar.</Text>
                    ) : (
                        <FlatList
                            data={admins}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={[styles.card, styles.bidanCard]}>
                                    <Text style={styles.title}>{item.nama_lengkap}</Text>
                                    <Text style={styles.subText}><Text style={styles.label}>Email:</Text> {item.email}</Text>
                                    <Text style={styles.subText}><Text style={styles.label}>No HP:</Text> {item.no_hp}</Text>
                                </View>
                            )}
                        />
                    )}

                    <Text style={styles.sectionHeader}>🏥 Daftar Pasien</Text>
                    {users.length === 0 ? (
                        <Text style={styles.emptyText}>⚠️ Tidak ada pasien yang terdaftar.</Text>
                    ) : (
                        <FlatList
                            data={users}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={[styles.card, styles.pasienCard]}>
                                    <Text style={styles.title}>{item.nama_lengkap}</Text>
                                    <Text style={styles.subText}><Text style={styles.label}>Email:</Text> {item.email}</Text>
                                    <Text style={styles.subText}><Text style={styles.label}>NIK:</Text> {item.nik}</Text>
                                    <Text style={styles.subText}><Text style={styles.label}>No HP:</Text> {item.no_hp}</Text>
                                    <Text style={styles.subText}><Text style={styles.label}>Alamat:</Text> {item.alamat}</Text>
                                </View>
                            )}
                        />
                    )}
                </>
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
    sectionHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
        color: "#007bff",
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
    },
    bidanCard: {
        borderLeftWidth: 5,
        borderLeftColor: "#007bff",
    },
    pasienCard: {
        borderLeftWidth: 5,
        borderLeftColor: "#28a745",
    },
    title: {
        fontSize: 16,
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
        marginTop: 10,
    },
});
