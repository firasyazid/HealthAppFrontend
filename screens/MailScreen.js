import { ScrollView, TextInput, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { showToast } from "../utils/toast";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MailScreen = ({ navigation, route}) => {
   const [loading, setLoading] = useState(false);



  const { email } = route.params;
  console.log(email);


  const handleForgotPassword = async () => {
        
    try {
 
       const payload = {
        email:  email,
       };

  
      const backendURL = "http://192.168.40.71:3003/api/v1/users/forgot-password";
      const response = await fetch(backendURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      showToast("success", "⚡️ Mail renvoyé !");
      navigation.navigate("MainScreen");

  
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      showToast("error", "⚠️ Mail invalide");
      console.error(error);
    }  
   };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "left",
            backgroundColor: "white",
            top: -90,
            marginLeft: -60,
          }}
        >
          <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate("Forgetpwd")}>
              <AntDesign
                name="leftcircleo"
                size={24}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
          </SafeAreaView>

          <Text style={styles.text1}>L'email a été envoyé </Text>
          <Text style={styles.text1}>avec succès.</Text>
        </View>
        <View
          style={{
            justifyContent: "left",
            backgroundColor: "white",
            top: -90,
            marginLeft: -20,
          }}
        >
          <Text style={styles.text2}>
            {" "}
            Veuillez consulter votre email pour récupérer{" "}
          </Text>
          <Text style={styles.text2}>votre nouveau mot de passe.</Text>
        </View>

        <View style={{ justifyContent: "center", top: 240 }}>
          <Image
            source={require("../assets/mail.jpg")}
            style={{
              width: 400,
              height: 400,
              resizeMode: "contain",
              justifyContent: "center",
              alignItems: "center",
              top: -325,

              borderRadius: 20,
            }}
          />
        </View>

        {/* Input */}

        <View
          style={{
            zIndex: 1,
            alignItems: "center",
            top: -55,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.buttonContainer}>
          <TouchableOpacity 
    onPress={() => navigation.navigate("MainScreen")}
    style={styles.button}
>
    <Text style={styles.buttonText}>Se connecter</Text>
</TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", top: 20, marginLeft: -50 }}>
            <Text style={[styles.text2, { marginRight: 10, marginLeft: 30 }]}>
              Vous n'avez pas reçu d'email ?
            </Text>
            <TouchableOpacity 
                    onPress={handleForgotPassword}
            >
              <Text style={styles.text3}>Renvoyer </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    marginTop: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  text1: {
    fontSize: 25,
    color: "black",
    fontFamily: "Montserrat",
  },

  text2: {
    fontSize: 12,
    color: "black",
    fontFamily: "Montserrat",
    marginTop: 10,
  },

  text3: {
    fontSize: 12,
    color: "black",
    fontFamily: "Montserrat",
    marginTop: 10,
    color: "#40A2E3",
  },

  icon: {
    marginLeft: -10,
    top: -18,
  },

  iconMAIL: {
    left: 10,
  },
  bar: {
    width: 1.5,
    height: 30,
    backgroundColor: "#626262",
    marginHorizontal: 20,
  },

  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#40A2E3",
    width: 350,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Poppins",
  },
});
export default MailScreen;
