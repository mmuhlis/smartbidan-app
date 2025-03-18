import React, { useEffect, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity, Image, BackHandler } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function DashboardBidan() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // Mencegah kembali ke halaman login
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => true;
            BackHandler.addEventListener("hardwareBackPress", onBackPress);
            return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.textContainer}>
                    <Text style={styles.textatas}>Hai,</Text>
                    <Text style={styles.textbawah}>Selamat datang di aplikasi!</Text>
                </View>
                <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate("ProfileBidan")}>
                    <AntDesign name="user" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RekamMedisBidan")}>
                    <Image source={require("../assets/images/rekammedis.png")} style={styles.cardImage} />
                    <Text>Rekam Medis</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DataPasien")}>
                    <Image source={require("../assets/images/datapasien.png")} style={styles.cardImage} />
                    <Text>Data Pasien</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("HasilSkriningBidan")}>
                    <Image source={require("../assets/images/skrining.png")} style={styles.cardImage} />
                    <Text>Hasil Skrining</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DataPengguna")}>
                    <Image source={require("../assets/images/datapengguna.png")} style={styles.cardImage} />
                    <Text>Data Pengguna</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
    },
    header: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        alignItems: "flex-start",
    },
    textatas: {
        fontSize: 16,
        color: "gray",
        fontStyle: "italic",
    },
    textbawah: {
        fontSize: 18,
        color: "black",
        fontStyle: "italic",
    },
    profileIcon: {
        padding: 10,
    },
    icon: {
        width: 45,
        height: 45,
        color: "black",
        backgroundColor: "#f8f9fa",
        borderRadius: 70,
        padding: 11,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    card: {
        backgroundColor: "#f8f9fa",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        width: "45%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
    },
    cardImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
});
