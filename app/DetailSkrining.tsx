import React, { useEffect, useState } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Button, View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function DetailSkrining() {
    const route = useRoute();
    const { skrining } = route.params || {};
    const [jawaban, setJawaban] = useState([]);

    useEffect(() => {
        if (skrining?.jawaban_skrining) {
            try {
                setJawaban(JSON.parse(skrining.jawaban_skrining));
            } catch (e) {
                console.error('Gagal parse jawaban skrining', e);
            }
        }
    }, [skrining]);

    const getKategoriDetail = (skor) => {
        if (skor >= 12) {
            return {
                kategori: 'Kehamilan Resiko Sangat Tinggi',
                perawatan: 'Dokter',
                rujukan: 'Dirujuk ke Rumah Sakit',
                tempat: 'Rumah Sakit',
                penolong: 'Dokter'
            };
        } else if (skor >= 6) {
            return {
                kategori: 'Kehamilan Resiko Tinggi',
                perawatan: 'Bidan, Dokter',
                rujukan: 'Dirujuk ke Puskesmas atau Rumah Sakit',
                tempat: 'Bidan, Dokter',
                penolong: 'Bidan'
            };
        } else {
            return {
                kategori: 'Kehamilan Resiko Rendah',
                perawatan: 'Bidan',
                rujukan: 'Tidak Dirujuk',
                tempat: 'Polindes',
                penolong: 'Bidan'
            };
        }
    };

    const kategoriDetail = getKategoriDetail(skrining.total_skor || 0);

    const handleCetakPDF = async () => {
        const html = `
        <html>
          <head><meta charset="UTF-8"><style>
              body { font-family: Arial; padding: 20px; font-size: 14px; }
              h2 { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              td, th { border: 1px solid #000; padding: 8px; }
              .section-title { margin-top: 20px; font-weight: bold; text-decoration: underline; }
            </style></head>
          <body>
            <h2>HASIL SKRINING KEHAMILAN</h2>

            <p class="section-title">A. IDENTITAS IBU HAMIL</p>
            <table>
              <tr><td>Tanggal Pengkajian</td><td>${skrining.tanggal_pengkajian}</td></tr>
              <tr><td>Nama Ibu</td><td>${skrining.nama_ibu}</td></tr>
              <tr><td>Umur</td><td>${skrining.umur_ibu} tahun</td></tr>
              <tr><td>Alamat</td><td>${skrining.alamat}</td></tr>
              <tr><td>No. HP</td><td>${skrining.no_hp}</td></tr>
              <tr><td>Pendidikan</td><td>${skrining.pendidikan}</td></tr>
              <tr><td>Pekerjaan</td><td>${skrining.pekerjaan}</td></tr>
              <tr><td>Hamil ke</td><td>${skrining.hamil_ke}</td></tr>
              <tr><td>HPHT</td><td>${skrining.hpht}</td></tr>
              <tr><td>HPL</td><td>${skrining.hpl}</td></tr>
              <tr><td>Umur Kehamilan</td><td>${skrining.umur_kehamilan}</td></tr>
              <tr><td>Tempat Periksa</td><td>${skrining.tempat_periksa}</td></tr>
            </table>

            <p class="section-title">B. IDENTIFIKASI MASALAH</p>
            <table>
              <tr>
                <th>No</th>
                <th>Pertanyaan</th>
                <th>Jawaban</th>
                <th>Skor</th>
              </tr>
              ${jawaban.map(item => `
                <tr>
                  <td>${item.no}</td>
                  <td>${item.pertanyaan}</td>
                  <td>${item.jawab.toUpperCase()}</td>
                  <td>${item.jawab === 'ya' ? item.skor : 0}</td>
                </tr>
              `).join('')}
              <tr>
                <td colspan="3"><strong>Total Skor</strong></td>
                <td><strong>${skrining.total_skor}</strong></td>
              </tr>
            </table>

            <p class="section-title">C. HASIL SKRINING</p>
            <table>
              <tr><td>Kategori Risiko</td><td>${kategoriDetail.kategori}</td></tr>
            </table>

            <p class="section-title">D. PERAWATAN LANJUTAN</p>
            <table>
              <tr><td>Perawatan</td><td>${kategoriDetail.perawatan}</td></tr>
              <tr><td>Rujukan</td><td>${kategoriDetail.rujukan}</td></tr>
              <tr><td>Tempat Persalinan</td><td>${kategoriDetail.tempat}</td></tr>
              <tr><td>Penolong Persalinan</td><td>${kategoriDetail.penolong}</td></tr>
            </table>

            <br><br>
            <p style="text-align:right;">Tertanda, <br><br><br><strong>${skrining.bidan_pelaksana}</strong></p>
          </body>
        </html>
        `;

        const { uri } = await Print.printToFileAsync({ html });
        await Sharing.shareAsync(uri);
    };

    if (!skrining) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Data skrining tidak tersedia.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Detail Skrining</Text>

            <Text style={styles.label}>Tanggal Pengkajian: <Text style={styles.value}>{skrining.tanggal_pengkajian}</Text></Text>
            <Text style={styles.label}>Bidan Pelaksana: <Text style={styles.value}>{skrining.bidan_pelaksana}</Text></Text>
            <Text style={styles.label}>Nama Ibu: <Text style={styles.value}>{skrining.nama_ibu}</Text></Text>
            <Text style={styles.label}>Umur Ibu: <Text style={styles.value}>{skrining.umur_ibu}</Text></Text>
            <Text style={styles.label}>Hamil ke: <Text style={styles.value}>{skrining.hamil_ke}</Text></Text>

            <Text style={styles.subheading}>Jawaban Skrining:</Text>
            {jawaban.map((item, index) => (
                <View key={index} style={styles.item}>
                    <Text>{item.no}. {item.pertanyaan}</Text>
                    <Text>Jawab: {item.jawab.toUpperCase()} ({item.jawab === 'ya' ? item.skor : 0} poin)</Text>
                </View>
            ))}

            <Text style={styles.result}>Total Skor: {skrining.total_skor}</Text>
            <Text style={styles.result}>Kategori: {kategoriDetail.kategori}</Text>

            <View style={{ marginTop: 20 }}>
                <Button title="Cetak PDF" onPress={handleCetakPDF} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f9fa',
        flex: 1
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16
    },
    label: {
        fontWeight: 'bold',
        marginTop: 8
    },
    value: {
        fontWeight: 'normal'
    },
    subheading: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: '#fff',
        padding: 12,
        marginTop: 10,
        borderRadius: 6,
        elevation: 1
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
