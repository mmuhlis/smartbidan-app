import React from "react";
import { View, StyleSheet, Text } from 'react-native';

export default function HasilSkriningBidan() {
    return (
        <View style={styles.container}>
            <Text>Hasil Skrining Bidan</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});