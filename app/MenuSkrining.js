import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from 'expo-router';

export default function MenuSkrining() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: true, title: "Menu Skrining" });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pilih Kategori Skrining</Text>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("SkriningPasien")}>
                    <Image source={require('../assets/images/skrining.png')} style={styles.cardImage} />
                    <Text>Ibu Hamil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("SkriningAnak")}>
                    <Image source={require('../assets/images/skrining.png')} style={styles.cardImage} />
                    <Text>Anak-Anak</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("SkriningCalonIbu")}>
                    <Image source={require('../assets/images/skrining.png')} style={styles.cardImage} />
                    <Text>Calon Ibu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("SkriningIbuMenyusui")}>
                    <Image source={require('../assets/images/skrining.png')} style={styles.cardImage} />
                    <Text>Ibu Menyusui</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
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
        elevation: 5,
    },
    cardImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
});
