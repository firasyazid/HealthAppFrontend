import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Feather } from "@expo/vector-icons";
 
const LoginScreen = ({ navigation }) => {
   
  const [isChecked1, setChecked1] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);


  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

 

  return (
    <View style={styles.login}>
       <View>
        <View style={styles.logo}>
          <Image
            source={require("../assets/logo.png")}
            style={{
              width: 250,
              height: 250,
              marginTop: 10,
              borderRadius: 20,
            }}
          />
          <Text style={styles.loginText}>Vous avez dejà un compte ? </Text>
        </View>

        <View
          style={{
            zIndex: 1,
            flexDirection: "row",
            alignItems: "center",
            top: 110,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.inputContainer}>
            <Fontisto
              name="email"
              size={24}
              color="#626262"
              style={styles.icon}
            />
            <View style={styles.bar} />

            <TextInput
              style={styles.textInput}
              placeholder="Email Address"
              autoCapitalize="none"
              placeholderTextColor="#626262"
              placeholderFontFamily="Poppins"
            />
          </View>
        </View>

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
          <View style={styles.inputContainer}>
            <EvilIcons
              name="lock"
              size={30}
              color="#626262"
              style={styles.icon}
            />
            <View style={styles.bar} />

            <TextInput
              style={styles.textInput}
              placeholder="Mot de passe"
              autoCapitalize="none"
              placeholderTextColor="#626262"
              secureTextEntry={!isPasswordVisible}
              placeholderFontFamily="Poppins"
            />

            <Pressable onPress={togglePasswordVisibility}>
              <Feather
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={20}
                color="black"
                style={styles.passwordVisibilityIcon}
              />
            </Pressable>
          </View>


        </View>



        
    <View style={styles.radio1}>
      <BouncyCheckbox
        textComponent={
          <Text style={styles.loremIpsum2}>Save password</Text>
        }
        size={15}
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "black" }}
        innerIconStyle={{ borderWidth: 1 }}
        fillColor={isChecked1 ? "#626262" : "black"}
        onPress={() => setChecked1(!isChecked1)}
      />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}  
      >
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
    </View>

        <View style={{ top :235 ,flexDirection: 'row', alignItems: 'center' }}>
  <View style={styles.bar2} />
  <Text style={{ color: "#626262", fontFamily: "Montserrat" }}> Ou </Text>
  <View style={styles.bar3} />
</View>

<View style={styles.buttonContainer2}>

      <TouchableOpacity style={styles.button2}>
      <Image 
  source={require("../assets/google.png")}
  style={{ width: 30, height: 30,marginHorizontal: 10 }}
  />
        <Text style={styles.buttonText2}>Continuer avec Google</Text>
   
      </TouchableOpacity>
    </View>
      </View>
 


  </View>
       
   );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "8%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
    marginTop: 0,
    top:-370,
   },
  viewparent : {
    flex: 1,
      backgroundColor: "#40A2E3",
      marginTop: 0,
  
  }

,    
  safe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  cnx: {
    fontSize: 15,
    color: "black",
    marginLeft: -10,
    fontFamily: "Montserrat",
  },

  inscription: {
    fontSize: 15,
    color: "black",
    marginLeft: 70,
    fontFamily: "Montserrat",
  },

  login: {
    top: -240,
  },

  blueBar: {
    backgroundColor: "#40A2E3",
    height: 2,
    width: 100,
    top: 10,
    marginLeft: -10,
  },

  blueBar2: {
    backgroundColor: "#40A2E3",
    height: 2,
    width: 100,
    top: 10,
    marginLeft: 70,
  },

  loginText: {
    fontSize: 15,
    color: "black",
    fontFamily: "Montserrat",
    top: -30,
  },
  logo: {
    top: 80,
    alignContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    top: 10,
  },
  bar: {
    width: 1.5,
    height: 30,
    backgroundColor: "#626262",
    marginHorizontal: 20,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D8DFE0",
    borderWidth: 0.5,
    borderRadius: 10,
    height: 55,
    width: 350,
  },
  icon: {
    left: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 5,
    fontFamily: "Montserrat",
  },

  radio1: {
    top: 160,
    left: 50,
  },
  loremIpsum2: {
    color: "#626262",
    fontFamily: "Poppins",
    top: 0,
    paddingLeft: 10,
  },

  buttonContainer: {
    top: 190,
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
  bar2 : { 

    width: 120,
    height: 0.5,
    backgroundColor: "#626262",
    color: "#626262",
    marginHorizontal: 40,
  },
  bar3 : { 

    width: 150,
    height: 0.5,
    backgroundColor: "#626262",
    marginHorizontal: 40,
  },
  buttonContainer2: {
    top: 260,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",


  },
  button2: {
    backgroundColor: "white",
    width: 350,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderColor: "#D8DFE0",
    borderWidth: 0.5, 
  },
  buttonText2: {
    color: "#626262",
    fontSize: 15,
    fontFamily: "Montserrat",
  },

  insc: {
    top: -300,
  },
});


export default LoginScreen;
