import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileBidan() {
    const router = useRouter();
    const [bidan, setBidan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [noHp, setNoHp] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("auth_token");
            const userId = await AsyncStorage.getItem("user_id");

            if (!token || !userId) {
                console.error("Token atau user_id tidak ditemukan");
                return;
            }

            const response = await fetch(`http://192.168.124.1:8000/api/bidan/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const json = await response.json();
            if (json.success) {
                setBidan(json.data);
                setNama(json.data.nama_lengkap);
                setEmail(json.data.email);

                setNoHp(json.data.no_hp);
            } else {
                console.error("Gagal mengambil data bidan:", json.message);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("auth_token");
            const userId = await AsyncStorage.getItem("user_id");

            const response = await fetch(`http://192.168.94.1:8000/api/bidan/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nama_lengkap: nama,
                    email: email,
                    no_hp: noHp
                })
            });

            const json = await response.json();
            if (response.ok) {
                Alert.alert("Sukses", "Profil berhasil diperbarui");
                setEditMode(false);
                fetchProfile();
            } else {
                Alert.alert("Gagal", json.message || "Gagal memperbarui profil");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Bidan</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : bidan ? (
                <View style={styles.profileContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Nama:</Text>
                        {editMode ? (
                            <TextInput style={styles.input} value={nama} onChangeText={setNama} />
                        ) : (
                            <Text style={styles.value}>{bidan.nama_lengkap}</Text>
                        )}
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Email:</Text>
                        {editMode ? (
                            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
                        ) : (
                            <Text style={styles.value}>{bidan.email}</Text>
                        )}
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>No. Telepon:</Text>
                        {editMode ? (
                            <TextInput style={styles.input} value={noHp} onChangeText={setNoHp} keyboardType="phone-pad" />
                        ) : (
                            <Text style={styles.value}>{bidan.no_hp}</Text>
                        )}
                    </View>

                    {editMode ? (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
                                <Text style={styles.buttonText}>Simpan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditMode(false)}>
                                <Text style={styles.buttonText}>Batal</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
                            <Text style={styles.buttonText}>Edit Profil</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.logoutButton} onPress={async () => {
                        await AsyncStorage.removeItem("auth_token");
                        await AsyncStorage.removeItem("user_id");
                        Alert.alert("Logout Berhasil", "Anda telah keluar.");
                        router.replace("/Login");
                    }}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.errorText}>Gagal mengambil data bidan.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    profileContainer: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    value: {
        fontSize: 16,
        color: "#555",
        marginTop: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: "#f8f9fa",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    editButton: {
        backgroundColor: "#007bff",
        padding: 12,
        marginTop: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "#28a745",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: "#dc3545",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
        marginLeft: 5,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: "#d9534f",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontSize: 16,
        marginTop: 20,
    },
});
