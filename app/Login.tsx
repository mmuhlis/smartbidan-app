import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useNavigation } from "expo-router";

export default function Login() {
    const navigation = useNavigation();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("bidan");

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Email dan password harus diisi!");
            return;
        }

        try {
            // Endpoint API berdasarkan role
            const endpoint =
                role === "bidan"
                    ? "http://192.168.198.212:8000/api/bidan/login"
                    : "http://192.168.198.212:8000/api/user/login";

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            console.log("Response API:", result); // Debugging

            if (response.ok) {
                if (result.token) {
                    await AsyncStorage.setItem("auth_token", result.token);
                    console.log("Token Disimpan:", result.token);
                } else {
                    Alert.alert("Error", "Token tidak ditemukan, login gagal.");
                    return;
                }

                // Simpan user ID berdasarkan role
                if (role === "bidan" && result.admin) {
                    await AsyncStorage.setItem("user_id", result.admin.id.toString());
                    console.log("User ID Bidan Disimpan:", result.admin.id);
                    router.push("/DashboardBidan"); // Redirect ke dashboard bidan
                } else if (role === "pasien" && result.user) {
                    await AsyncStorage.setItem("user_id", result.user.id.toString());
                    console.log("User ID Pasien Disimpan:", result.user.id);
                    router.push("/DashboardPasien"); // Redirect ke dashboard pasien
                } else {
                    Alert.alert("Error", "Data user tidak ditemukan.");
                    return;
                }

                Alert.alert("Success", "Login berhasil!");
            } else {
                Alert.alert("Error", result.message || "Login gagal.");
            }
        } catch (error) {
            console.error("Error saat login:", error);
            Alert.alert("Error", "Terjadi kesalahan saat login. Coba lagi.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Pilihan Role */}
            <View style={styles.roleContainer}>
                <TouchableOpacity
                    style={[
                        styles.roleButton,
                        role === "bidan" ? styles.selectedRoleButton : null,
                    ]}
                    onPress={() => setRole("bidan")}
                >
                    <Text
                        style={role === "bidan" ? styles.selectedRoleText : styles.roleText}
                    >
                        Bidan
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.roleButton,
                        role === "pasien" ? styles.selectedRoleButton : null,
                    ]}
                    onPress={() => setRole("pasien")}
                >
                    <Text
                        style={role === "pasien" ? styles.selectedRoleText : styles.roleText}
                    >
                        Pasien
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/*  */}
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Belum punya akun?</Text>
                {/* <TouchableOpacity onPress={() => router.push("/RegistrasiBidan")}>
          <Text style={styles.registerButton}>Daftar sebagai Bidan</Text>
        </TouchableOpacity> */}
                <TouchableOpacity onPress={() => router.push("/RegistrasiPasien")}>
                    <Text style={styles.registerButton}>Daftar sebagai Pasien</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        width: "100%",
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    roleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginBottom: 15,
    },
    roleButton: {
        flex: 1,
        padding: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#007bff",
        borderRadius: 8,
        marginHorizontal: 5,
    },
    selectedRoleButton: {
        backgroundColor: "#007bff",
    },
    roleText: {
        color: "#007bff",
        fontSize: 16,
    },
    selectedRoleText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    registerContainer: {
        alignItems: "center",
        marginTop: 10,
    },
    registerText: {
        fontSize: 16,
        color: "#555",
    },
    registerButton: {
        fontSize: 16,
        color: "#007bff",
        fontWeight: "bold",
        marginTop: 5,
    },
});
