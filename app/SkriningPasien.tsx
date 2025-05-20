import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pertanyaanSkrining = [
    { no: 1, pertanyaan: "Terlalu muda saat hamil anak pertama dengan usia ≤ 16 tahun", skor: 4 },
    { no: 2, pertanyaan: "Terlalu tua saat hamil anak pertama usia ≥ 35 tahun", skor: 4 },
    { no: 3, pertanyaan: "Terlalu lambat hamil saat kawin pertama kali ≥ 4 tahun", skor: 4 },
    { no: 4, pertanyaan: "Terlalu lama hamil lagi ≥ 10 tahun", skor: 4 },
    { no: 5, pertanyaan: "Terlalu cepat hamil lagi ≤ 2 tahun", skor: 4 },
    { no: 6, pertanyaan: "Terlalu banyak anak, 4 atau lebih", skor: 4 },
    { no: 7, pertanyaan: "Terlalu tua umur ≥ 35 tahun", skor: 4 },
    { no: 8, pertanyaan: "Terlalu pendek ≥ 145 cm", skor: 4 },
    { no: 9, pertanyaan: "Pernah gagal kehamilan", skor: 4 },
    { no: 10, pertanyaan: "Pernah melahirkan dengan: terikan tang/vakum, uri dirogoh, infus/transfusi", skor: 4 },
    { no: 11, pertanyaan: "Pernah operasi sesar", skor: 8 },
    { no: 12, pertanyaan: "Penyakit: anemia, malaria, TBC, jantung, diabetes, PMS", skor: 4 },
    { no: 13, pertanyaan: "Bengkak pada muka/tungkai & tekanan darah tinggi", skor: 4 },
    { no: 14, pertanyaan: "Hamil kembar", skor: 4 },
    { no: 15, pertanyaan: "Hydramnion", skor: 4 },
    { no: 16, pertanyaan: "Bayi mati dalam kandungan", skor: 4 },
    { no: 17, pertanyaan: "Kehamilan lebih bulan (≥ 42 minggu)", skor: 4 },
    { no: 18, pertanyaan: "Letak sungsang", skor: 8 },
    { no: 19, pertanyaan: "Letak lintang", skor: 8 },
    { no: 20, pertanyaan: "Pendarahan dalam kehamilan ini", skor: 8 },
    { no: 21, pertanyaan: "Pre eclampsia/kejang-kejang", skor: 8 },
];

const getKategoriRisiko = (skor) => {
    if (skor >= 12) {
        return {
            label: 'Kehamilan Resiko Sangat Tinggi',
            perawatan: 'Dokter',
            rujukan: 'Dirujuk ke Rumah Sakit',
            tempat: 'Rumah Sakit',
            penolong: 'Dokter'
        };
    } else if (skor >= 6) {
        return {
            label: 'Kehamilan Resiko Tinggi',
            perawatan: 'Bidan, Dokter',
            rujukan: 'Dirujuk ke Puskesmas atau Rumah Sakit',
            tempat: 'Bidan, Dokter',
            penolong: 'Bidan'
        };
    } else {
        return {
            label: 'Kehamilan Resiko Rendah',
            perawatan: 'Bidan',
            rujukan: 'Tidak Dirujuk',
            tempat: 'Polindes',
            penolong: 'Bidan'
        };
    }
};

export default function SkriningMobile() {
    const [step, setStep] = useState(1);
    const [skorAkhir, setSkorAkhir] = useState(null);
    const [kategoriHasil, setKategoriHasil] = useState(null);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const [form, setForm] = useState({
        tanggal_pengkajian: '',
        bidan_pelaksana: '',
        nama_ibu: '', umur_ibu: '', alamat: '', no_hp: '', pendidikan: '', pekerjaan: '',
        hamil_ke: '', hpht: '', hpl: '', umur_kehamilan: '', tempat_periksa: '',
        jawaban_skrining: pertanyaanSkrining.map(q => ({ ...q, jawab: false }))
    });

    useEffect(() => {
        const loadAuth = async () => {
            const t = await AsyncStorage.getItem("auth_token");
            const id = await AsyncStorage.getItem("user_id");
            setToken(t);
            setUserId(id);
        };
        loadAuth();
    }, []);

    const handleSubmit = async () => {
        const totalSkor = form.jawaban_skrining.reduce((acc, q) => q.jawab ? acc + q.skor : acc, 0);
        const kategori = getKategoriRisiko(totalSkor);

        const payload = {
            user_id: parseInt(userId),
            ...form,
            umur_ibu: parseInt(form.umur_ibu),
            hamil_ke: parseInt(form.hamil_ke),
            jawaban_skrining: form.jawaban_skrining.map(q => ({
                no: q.no,
                pertanyaan: q.pertanyaan, // ✅ ini penting!
                jawab: q.jawab ? 'ya' : 'tidak',
                skor: q.skor
            }))
        };

        try {
            const response = await fetch("http://192.168.37.1:8000/api/user/skrining", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                setSkorAkhir(totalSkor);
                setKategoriHasil(kategori);
                setStep(4);
            } else {
                console.log('Error:', data);
                Alert.alert("Gagal", data.message || "Terjadi kesalahan saat menyimpan data");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            Alert.alert("Error", "Gagal menyimpan data");
        }
    };


    const Input = ({ label, value, onChangeText }) => (
        <View style={{ marginVertical: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{label}</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6 }}
                value={value} onChangeText={onChangeText} />
        </View>
    );

    if (step === 4 && kategoriHasil) {
        return (
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Total Skor Akhir</Text>
                <Text style={{ fontSize: 48, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>{skorAkhir}</Text>
                <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 12 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>{kategoriHasil.label}</Text>
                    <Text>Perawatan: {kategoriHasil.perawatan}</Text>
                    <Text>Rujukan: {kategoriHasil.rujukan}</Text>
                    <Text>Tempat Persalinan: {kategoriHasil.tempat}</Text>
                    <Text>Penolong Persalinan: {kategoriHasil.penolong}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button title="Cetak PDF" onPress={() => Alert.alert('PDF belum tersedia')} />
                    <Button title="Halaman Awal" onPress={() => setStep(1)} />
                </View>
            </View>
        );
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            {step === 1 && (
                <View>
                    <Input label="Tanggal Pengkajian" value={form.tanggal_pengkajian} onChangeText={t => setForm({ ...form, tanggal_pengkajian: t })} />
                    <Input label="Bidan Pelaksana" value={form.bidan_pelaksana} onChangeText={t => setForm({ ...form, bidan_pelaksana: t })} />
                    <Button title="Mulai" onPress={() => setStep(2)} />
                </View>
            )}

            {step === 2 && (
                <View>
                    <Input label="Nama Ibu" value={form.nama_ibu} onChangeText={t => setForm({ ...form, nama_ibu: t })} />
                    <Input label="Umur Ibu" value={form.umur_ibu} onChangeText={t => setForm({ ...form, umur_ibu: t })} />
                    <Input label="Alamat" value={form.alamat} onChangeText={t => setForm({ ...form, alamat: t })} />
                    <Input label="No HP" value={form.no_hp} onChangeText={t => setForm({ ...form, no_hp: t })} />
                    <Input label="Pendidikan" value={form.pendidikan} onChangeText={t => setForm({ ...form, pendidikan: t })} />
                    <Input label="Pekerjaan" value={form.pekerjaan} onChangeText={t => setForm({ ...form, pekerjaan: t })} />
                    <Input label="Hamil ke-" value={form.hamil_ke} onChangeText={t => setForm({ ...form, hamil_ke: t })} />
                    <Input label="HPHT" value={form.hpht} onChangeText={t => setForm({ ...form, hpht: t })} />
                    <Input label="HPL" value={form.hpl} onChangeText={t => setForm({ ...form, hpl: t })} />
                    <Input label="Umur Kehamilan" value={form.umur_kehamilan} onChangeText={t => setForm({ ...form, umur_kehamilan: t })} />
                    <Input label="Tempat Periksa" value={form.tempat_periksa} onChangeText={t => setForm({ ...form, tempat_periksa: t })} />
                    <Button title="Selanjutnya" onPress={() => setStep(3)} />
                </View>
            )}

            {step === 3 && (
                <View>
                    {form.jawaban_skrining.map((q, i) => (
                        <View key={i} style={{ marginVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>{q.no}. {q.pertanyaan}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
                                <TouchableOpacity onPress={() => {
                                    const updated = [...form.jawaban_skrining];
                                    updated[i].jawab = true;
                                    setForm({ ...form, jawaban_skrining: updated });
                                }}>
                                    <Text style={{ color: q.jawab ? 'green' : 'black' }}>Ya</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    const updated = [...form.jawaban_skrining];
                                    updated[i].jawab = false;
                                    setForm({ ...form, jawaban_skrining: updated });
                                }}>
                                    <Text style={{ color: !q.jawab ? 'green' : 'black' }}>Tidak</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <Button title="Submit" onPress={handleSubmit} />
                </View>
            )}
        </ScrollView>
    );
}
