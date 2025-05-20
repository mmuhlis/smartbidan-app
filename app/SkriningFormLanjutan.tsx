import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SkriningFormLanjutan() {
    const navigation = useNavigation();
    const [riwayat, setRiwayat] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRiwayat();
    }, []);

    const fetchRiwayat = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            const userId = await AsyncStorage.getItem('user_id');

            const response = await fetch(`http://192.168.94.1:8000/api/user/skrining/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            const json = await response.json();
            console.log('RESPONSE:', json);

            if (json.success) {
                setRiwayat(json.data);
            } else {
                Alert.alert('Gagal', json.message || 'Tidak dapat mengambil data riwayat');
            }
        } catch (err) {
            console.error('Error:', err);
            Alert.alert('Error', 'Terjadi kesalahan saat mengambil data');
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetailSkrining', { skrining: item })}
        >
            <Text style={styles.date}>{item.tanggal_pengkajian}</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Skor: </Text>
                <Text style={styles.value}>{item.total_skor}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Kategori: </Text>
                <Text style={[styles.value, styles.category]}>{item.kategori_risiko}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Riwayat Skrining</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 30 }} />
                    ) : riwayat.length > 0 ? (
                        <FlatList
                            data={riwayat}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            contentContainerStyle={styles.list}
                        />
                    ) : (
                        <Text style={styles.noData}>Belum ada riwayat skrining.</Text>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343a40',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 18,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#007bff',
    },
    date: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
        color: '#212529',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    label: {
        fontWeight: '600',
        color: '#495057',
    },
    value: {
        color: '#343a40',
    },
    category: {
        fontStyle: 'italic',
    },
    noData: {
        textAlign: 'center',
        color: '#6c757d',
        marginTop: 50,
        fontSize: 16,
    },
});
