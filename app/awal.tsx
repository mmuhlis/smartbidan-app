// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import AntDesign from '@expo/vector-icons/AntDesign';


// export default function Index() {
//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.greeting}>Hai,</Text>
//                 <TouchableOpacity style={styles.profileIcon}>
//                     <AntDesign name="user" size={24} color="black" style={styles.icon} />
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.cardContainer}>
//                 <TouchableOpacity style={styles.card}>
//                     <Image source={require("../assets/images/icon1.png")} style={styles.cardImage} />
//                     <Text>Rekam Medis</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.card}>
//                     <Image source={require("../assets/images/icon1.png")} style={styles.cardImage} />
//                     <Text>Data Pasien</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         padding: 20,
//     },
//     header: {
//         padding: 20,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     greeting: {
//         fontSize: 18,
//         color: "black",
//         fontStyle: "italic",
//     },
//     profileIcon: {
//         padding: 10,
//     },
//     icon: {
//         width: 30,
//         height: 30,
//         color: "black",
//     },
//     cardContainer: {
//         flexDirection: "row",
//         justifyContent: "space-around",
//         marginTop: 20,
//     },
//     card: {
//         backgroundColor: "#f8f9fa",
//         padding: 20,
//         borderRadius: 10,
//         alignItems: "center",
//         width: "45%",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     cardImage: {
//         width: 50,
//         height: 50,
//         marginBottom: 10,
//     },
// });
