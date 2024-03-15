import { ScrollView, TextInput, View,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { showToast } from "../utils/toast";
import { ActivityIndicator } from "react-native";

const Forgetpwd = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidForm = () => {
     
        if (!email.trim() || email.length < 10) {
          showToast("error", "⚠️ Veuillez saisir votre adresse email");
          return false;
        }
    
        return true;
      };
 
      const handleForgotPassword = async () => {
        try {
            if (!isValidForm()) {
                return;
            }
            setLoading(true);
    
            const payload = {
                email: email,
            };
    
            const backendURL = "http://192.168.103.71:3003/api/v1/users/forgot-password";
            const response = await fetch(backendURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            if (response.status === 404) {
                showToast("error", "⚠️ Adresse email non enregistrée");
            } else if (response.status === 400) {
                showToast("error", "⚠️ Adresse email invalide");
            } else if (!response.ok) {
                throw new Error("Network response was not ok");
            } else {
              navigation.navigate("MailScreen", { email: email });
              showToast("success", "⚡️ Mail envoyé !");
            }
    
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            showToast("error", "⚠️ Erreur lors de l'envoi du mail");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "left",
            backgroundColor: "white",
            top: -100,
            marginLeft: -60,
          }}
        >
            <TouchableOpacity onPress={() => navigation.navigate("MainScreen")}>
          <AntDesign
            name="leftcircleo"
            size={24}
            color="black"
            style={styles.icon}
          />
            </TouchableOpacity>

          <Text style={styles.text1}>Vous avez oublié </Text>
          <Text style={styles.text1}>votre mot de passe ?</Text>
        </View>
        <View
          style={{
            justifyContent: "left",
            backgroundColor: "white",
            top: -100,
            marginLeft: -20,
          }}
        >
          <Text style={styles.text2}>
            {" "}
            Veuillez saisir votre adresse e-mail enregistrée,{" "}
          </Text>
          <Text style={styles.text2}>
            Un nouveau mot de passe vous sera envoyé.
          </Text>
        </View>

        <View style={{ justifyContent: "center", top: 240 }}>
          <Image
            source={require("../assets/resetpwd.jpg")}
            style={{
              width: 400,
              height: 350,
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
            flexDirection: "row",
            alignItems: "center",
            top: 140,
            alignContent: "center",
            justifyContent: "center",
        }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#D8DFE0",
              borderWidth: 0.5,
              borderRadius: 10,
              height: 55,
              width: 350,
                 top: -200
            }}
          >
            <Fontisto
                name="email"
                size={24}
                color="#626262"
                style={styles.iconMAIL}
              />
              <View style={styles.bar} />


            <TextInput
              placeholder="Email Address"
              autoCapitalize="none"
              placeholderTextColor="#626262"
              placeholderFontFamily="Poppins"
              onChangeText={(text) => setEmail(text)}


            />
          </View>



        </View>
          {/* Button */}
 
        <View style={styles.buttonContainer}>
            <TouchableOpacity
             style={styles.button} 
                onPress={handleForgotPassword}>
                {loading?( 
                    <ActivityIndicator color="white" />
                ) : (
                 <Text style={styles.buttonText}>Envoyer</Text>
                )}

              </TouchableOpacity>
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
export default Forgetpwd;
