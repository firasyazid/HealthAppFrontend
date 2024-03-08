import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,TouchableWithoutFeedback
} from "react-native";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";

const DoctorDetails = ({ navigation, route }) => {
  const { doctor, categoryTitre } = route.params;
  console.log(categoryTitre);






  const openGoogleMapsLink = () => {
    const googleMapsLink = doctor.address;
    Linking.openURL(googleMapsLink);
  };
  
  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent2}>
      <View style={styles.container2}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("../assets/medical-team.png")}
              style={{ width: 55, height: 55, left: 20, marginTop: 10 }}
            />
          </TouchableOpacity>

          <Text style={styles.text}>Réservez votre </Text>
          <Text style={styles.text}>rendez-vous </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("MainScreen")}
            style={styles.btnpower}
          >
            <Image
              source={require("../assets/switch.png")}
              style={{ width: 25, height: 25, top: 0, left: 0 }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <View
        style={{
          justifyContent: "center",
          position: "absolute",
          top: 170,
          height: 130,
          width: 130,
          left: 30,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#F2F1EB",
          backgroundColor: "white",
          flexDirection: "row",
          shadowColor: "grey",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: doctor.image }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            left: 0,
          }}
        />

        <View style={{ position: "absolute", left: 160 }}>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 15,
              color: "#1B3C73",
              textAlign: "center",
              top: 10,
              left: 0,
            }}
          >
            {doctor.fullname}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 12,
              color: "#1B3C73",
              textAlign: "center",
              top: 17,
              left: 0,
            }}
          >
            {categoryTitre}
          </Text>


          <TouchableWithoutFeedback onPress={openGoogleMapsLink}>
            <Image
              source={require("../assets/location.png")}
              style={{
                width: 30,
                height: 30,
                top: 80,
                left: 40,
                position: "absolute",
              }}
            />
          </TouchableWithoutFeedback>
        </View>


        <View style={{ position: "absolute", left: 90, top: 150 }}>
            <Text style={styles.text1} >
                A propos
             </Text>
            </View>

            <View style={{ position: "absolute", left: 90, top: 170 }}>
            <Text style={styles.text2} >
            <Text> {doctor.description}</Text>
             </Text>
             </View>
      </View>

                <View style={{ position: "absolute", left: 30, top: 470,flexDirection: "row",
 }}>
                <View style={{ position: "absolute", left: 0, top: 0 , backgroundColor:'white', height : 95 , width : 75,
                borderRadius: 30,borderColor: "#F2F1EB",
                borderWidth: 2,
                shadowColor: "grey",
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2
            
            }}>

                <Text style={{position: "absolute",alignSelf:'center',  top: 10, fontFamily: "Poppins",color:"#1B3C73"}} 
                >Lundi</Text>
                <Text style={{position: "absolute", alignSelf:'center', top: 50, fontFamily: "Poppins",color:"black" , 
                    fontSize: 18    
            }}
                >21</Text>
                    </View>
             </View>

















    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent2: {
    height: "120%",
    width: "100%",
    backgroundColor: "white",
  },
  container2: {
    flex: 1,
    backgroundColor: "white",
    height: "50%",
    width: "100%",
  },

  btnpower: {
    alignItems: "center",
    zIndex: 1,
    left: 360,
    top: -130,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },

  text: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: "#1B3C73",
    textAlign: "center",
    top: 10,
    left: -100,
  },
  text1: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: "#1B3C73",
    textAlign: "center",
    top: 10,
    left: -100,
    },

    text2: {
        fontFamily: "Montserrat",
        fontSize: 13,
        color: "#717784",
        textAlign: "center",
        top: 30,
        left: -100,
        textAlign: "justify",
        lineHeight: 20,
        width: 330,
         },
        
});

export default DoctorDetails;
