import React from "react";
import { View, StyleSheet, Text } from 'react-native';

export default function SkriningAnak() {
    return (
        <View style={styles.container}>
            <Text>Skrining Anak</Text>
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