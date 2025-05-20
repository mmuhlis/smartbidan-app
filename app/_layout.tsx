import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'semibold',
        },
      }}>
      {/* Optionally configure static options outside the route.*/}
      {/* <Stack.Screen name="login" options={{ title: 'Login' }} /> */}
      <Stack.Screen name="index" options={{ title: 'Index' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />

      {/* Bidan */}
      <Stack.Screen name="RegistrasiBidan" options={{ title: 'Registrasi' }} />
      <Stack.Screen name="DashboardBidan" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="RekamMedisBidan" options={{ title: 'Rekam Medis' }} />
      <Stack.Screen name="DataPasien" options={{ title: 'Data Pasien' }} />
      <Stack.Screen name="DataPengguna" options={{ title: 'Data Pengguna' }} />
      <Stack.Screen name="HasilSkriningBidan" options={{ title: 'Hasil Skrining' }} />
      <Stack.Screen name="ProfileBidan" options={{ title: 'Profile' }} />
      <Stack.Screen name="DetailRekamMedis" options={{ title: 'Detail' }} />


      {/* Pasien */}
      <Stack.Screen name="RegistrasiPasien" options={{ title: 'Registrasi' }} />
      <Stack.Screen name="DashboardPasien" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="RekamMedisPasien" options={{ title: 'Rekam Medis' }} />
      <Stack.Screen name="SkriningPasien" options={{ title: 'Skrining Pasien' }} />
      <Stack.Screen name="SkriningFormLanjutan" options={{ title: 'Skrining Lanjutan' }} />
      <Stack.Screen name="DetailSkrining" options={{ title: 'Detail Skrining' }} />
      <Stack.Screen name="HasilSkriningPasien" options={{ title: 'Skrining' }} />
      <Stack.Screen name="ProfilePasien" options={{ title: 'Profile' }} />

      {/* Menu Skrining*/}
      <Stack.Screen name="Menu Skrining" options={{ title: 'Menu Skrining' }} />


      {/* Skrining Bidan*/}

      {/* Skrining Pasien*/}
      <Stack.Screen name="Skrining" options={{ title: 'Skrining' }} />

      <Stack.Screen name="laporan" options={{ title: 'Laporan' }} />
      <Stack.Screen name="TambahRekamMedis" options={{ title: 'Tambah Rekam Medis' }} />
      <Stack.Screen name="EditRekamMedis" options={{ title: 'Edit Rekam Medis' }} />
    </Stack>
  );
}
