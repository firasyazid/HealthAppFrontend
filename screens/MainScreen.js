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
import { AntDesign } from "@expo/vector-icons";
import client from "../api/user";
import { showToast } from "../utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri} from 'expo-auth-session';
 



WebBrowser.maybeCompleteAuthSession();


const isValidObjectField = (obj) => {
  return Object.values(obj).every((value) => value.trim());
};

export const isValidEmail = (value) => {
  const regx = /^([A-Za-z0-9_\-.\s])+@([A-Za-z0-9_\-.\s])+\.([A-Za-z]{2,4})$/;

  return regx.test(value);
};


const MainScreen = ({ navigation }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

///// 

 


const [token, setToken] = useState("");
const [userI, setUserI] = useState(null);

console.log(
  makeRedirectUri({
   })
);
const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: "501914669541-mj4u8dvp2qqp6o1o5mgpo1l7vrb2ij4d.apps.googleusercontent.com",
   webClientId: "501914669541-rv8ffbb7m38u8nede7da7t4235p24rc1.apps.googleusercontent.com",
   expoClientId: "1053547080556-fenvqavkp2lfuvbrin88oqs1eon0v0ke.apps.googleusercontent.com",
   redirectUri: makeRedirectUri({
   }),
  scopes: ["profile", "email"],
      }
  );

useEffect(() => {
  handleEffect();
  
}, [response, token]);

async function handleEffect() {
  const user = await getLocalUser();
  console.log("user", user);
  if (!user) {
    if (response?.type === "success") {
       getUserInfo(response.authentication.accessToken);
    }
  } else {
    setUserI(user);
    console.log("loaded locally");
  }
}

const getLocalUser = async () => {
  const data = await AsyncStorage.getItem("@user");
  if (!data) return null;
  return JSON.parse(data);
};

const getUserInfo = async (token) => {
  if (!token) return;
  try {
    const response = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const user = await response.json();
    await AsyncStorage.setItem("@user", JSON.stringify(user));
    setUserI(user);
    console.log("user", userI);
  } catch (error) {
   }
};

const signOutAsync = async () => {
  await AsyncStorage.removeItem("@user");
  setUserI(null);
}





























  
  const [userInfo, SetUserInfo] = useState({
    email: "",
    password: "",
  });

  const [newuserInfo, SetNewUserInfo] = useState({
    fullname: "",
    mail: "",
    pwd: "",
  });
 
//sso gmail //// 















  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleLoginPress = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const handleSignUpPress = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

///***sigin */
   const { email, password } = userInfo;
   const handleOnChangeText = (value, fieldName) => {
    SetUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjectField(userInfo)) {
      showToast("error", "⚠️ Veuillez remplir tous les champs requis");
      return false;
    }

    if (!isValidEmail(email)) {
      showToast("error", "⚠️ Email invalide");
      return false;
    }

    if (!password.trim() || password.length < 5) {
      showToast("error", "⚠️ Mot de passe doit contenir au moins 5 caractères");
      return false;
    }

    return true;
  };


  const submitForm = async () => {
    console.log(userInfo);

    if (isValidForm()) {
      try {
        setLoading(true);
        const res = await client.post("/login", { ...userInfo });
        if (res.data.success) {
          SetUserInfo({ email: "", password: "" });
        } 
        const jsonValue = JSON.stringify(res.data.userId);
          await AsyncStorage.setItem("Id", jsonValue);
         await AsyncStorage.setItem('userToken', res.data.token);

        showToast("success", "✔️ Connexion réussie");  
        navigation.navigate("BottomNavigator");
  
      } catch (error) {
        if (error.response && error.response.status === 400) {
          showToast("error", "⚠️ Vérifiez votre email ou mot de passe");
        } else if (error.response && error.response.status === 401) {
          showToast("error", "⚠️ Email or password is incorrect");
        } else {
          showToast(
            "error",
            "⚠️ Une erreur s'est produite. Veuillez réessayer plus tard."
          );
                  }
      } finally {
        setLoading(false);
 
          
        }
    }
  };

  //***signup */
  
const { mail, pwd , fullname } = newuserInfo;

const handleOnChangeText2 = (value, fieldName) => {
  SetNewUserInfo({ ...newuserInfo, [fieldName]: value });
};

const isValidForm2 = () => {



  if (!isValidObjectField(newuserInfo)) {
    showToast("error", "⚠️ Veuillez remplir tous les champs requis");
    return false;
  }

  if(!fullname.trim() || fullname.length < 5 || fullname.length > 12){
    showToast("error", "⚠️ Nom & prénom doit contenir au moins 5 caractères");
    return false;
  }

  if (!isValidEmail(mail)) {
    showToast("error", "⚠️ Email invalide");
    return false;
  }

  if (!pwd.trim() || pwd.length < 5) {
    showToast("error", "⚠️ Mot de passe doit contenir au moins 5 caractères");
    return false;
  }

  return true;

};

const submitForm2 = async () => {
  if (!isValidForm2()) {
    return;
  }

  try {
    setLoading(true);
    const payload = {
      email: newuserInfo.mail,
      fullname: newuserInfo.fullname,
      password: newuserInfo.pwd,
    };

    const backendURL = "http://192.168.40.71:3003/api/v1/users/register";
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

    showToast("success", "⚡️ Bienvenue !");

    const responseData = await response.json();
   } catch (error) {
    showToast("error", "⚠️ Veuillez vérifier vos informations");
    console.error(error);
  } finally {
    setLoading(false);
  }
};



   

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>

    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.cnx}> Connexion</Text>
          {showLogin && <View style={styles.blueBar} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUpPress}>
          <Text style={styles.inscription}> Inscription</Text>
          {showSignUp && <View style={styles.blueBar2} />}
        </TouchableOpacity>
      </View>






      {/* Content  login & signup */}

      <View style={styles.login}>
        {showLogin && (
          <View>
            <View style={styles.logo}>
              <Image
                source={require("../assets/logo.png")}
                style={{
                  width: 250,
                  height: 200,
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
                top: 170,
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
                  onChangeText={(value) => handleOnChangeText(value, "email")}
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
                top: 195,
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
                  onChangeText={(value) => handleOnChangeText(value, "password")}
                  placeholder="Mot de passe"
                  autoCapitalize="none"
                  placeholderTextColor="#626262"
                  secureTextEntry={!isPasswordVisible}
                  placeholderFontFamily="Poppins"
                />

                <Pressable onPress={togglePasswordVisibility}>
                  <Feather
                    name={isPasswordVisible ? "eye" : "eye-off"}
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
<TouchableOpacity
onPress={() => navigation.navigate("Forgetpwd")}
>
              <Text style={styles.loremIpsum3}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
              
              onPress={submitForm}
              style={styles.button}>
                 {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Connexion</Text>
              )}
              </TouchableOpacity>
            </View>

            <View
              style={{ top: 290, flexDirection: "row", alignItems: "center" }}
            >
              <View style={styles.bar2} />
              <Text style={{ color: "#626262", fontFamily: "Montserrat" }}>
                {" "}
                Ou{" "}
              </Text>
              <View style={styles.bar3} />
            </View>

            <View style={styles.buttonContainer2}>
              <TouchableOpacity
              onPress={() => promptAsync()}

              style={styles.button2}>
                <Image
                  source={require("../assets/google.png")}
                  style={{ width: 30, height: 30, marginHorizontal: 10 }}
                />
                <Text style={styles.buttonText2}>Continuer avec Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <StatusBar backgroundColor="white" barStyle="dark-content" />
      </View>













      {/* Content for inscription */}

      {showSignUp && (
        <View style={styles.inscriptionComponent}>
          <View style={styles.logo2}>
            <Image
              source={require("../assets/logo.png")}
              style={{
                width: 250,
                height: 250,
                marginTop: 10,
                borderRadius: 20,
              }}
            />
            <Text style={styles.inscriText}>Vous n'avez pas un compte ? </Text>
          </View>
          {/* Name & lastname */}

          <View
            style={{
              zIndex: 1,
              flexDirection: "row",
              alignItems: "center",
              top: 175,
              alignContent: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <View style={styles.inputContainer}>
              <AntDesign
                name="user"
                size={24}
                color="#626262"
                style={styles.icon}
              />
              <View style={styles.bar} />

              <TextInput
                style={styles.textInput}
                onChangeText={(value) => handleOnChangeText2(value, "fullname")}
                placeholder="Nom & prénom"
                autoCapitalize="none"
                placeholderTextColor="#626262"
                placeholderFontFamily="Poppins"
              />
            </View>
          </View>

          {/* Mail */}

          <View
            style={{
              zIndex: 1,
              flexDirection: "row",
              alignItems: "center",
              top: 180,
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
                onChangeText={(value) => handleOnChangeText2(value, "mail")}
                placeholder="Email Address"
                autoCapitalize="none"
                placeholderTextColor="#626262"
                placeholderFontFamily="Poppins"
              />
            </View>
          </View>

          {/* password */}

          <View
            style={{
              zIndex: 1,
              flexDirection: "row",
              alignItems: "center",
              top: 210,
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
                onChangeText={(value) => handleOnChangeText2(value, "pwd")}
                placeholder="Mot de passe"
                autoCapitalize="none"
                placeholderTextColor="#626262"
                secureTextEntry={!isPasswordVisible}
                placeholderFontFamily="Poppins"
              />

              <Pressable onPress={togglePasswordVisibility}>
                <Feather
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={20}
                  color="black"
                  style={styles.passwordVisibilityIcon}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.buttonContainerI}>
            <TouchableOpacity
              onPress={submitForm2}
            style={styles.button}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Inscription</Text>
              )}
             </TouchableOpacity>
          </View>


           <View
            style={{ top: 265, flexDirection: "row", alignItems: "center" }}
          >
            <View style={styles.bar2} />
            <Text style={{ color: "#626262", fontFamily: "Montserrat" }}>
              {" "}
              Ou{" "}
            </Text>
            <View style={styles.bar3} />
          </View>

          <View style={styles.buttonContainer3}>
            <TouchableOpacity style={styles.button2}>
              <Image
                source={require("../assets/google.png")}
                style={{ width: 30, height: 30, marginHorizontal: 10 }}
              />
              <Text style={styles.buttonText2}>Continuer avec Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
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
    position: "absolute",
    top: -15,
  },

  safe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
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
    top: 10,
  },

   inscriText : { 
    fontSize: 15,
    color: "black",
    fontFamily: "Montserrat",
    top: -10,


   },
  logo: {
    top: 160,
    alignContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logo2: {
    top: 150,
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
    top: 230,
    left: 50,
    flexDirection: "row",


  },
  loremIpsum2: {
    color: "#626262",
    fontFamily: "Montserrat",
    fontSize: 13,
    top: 0,
    paddingLeft: 10,
  },
  loremIpsum3: {
    color: "#626262",
     top:0,
    paddingLeft: 70,
    fontFamily: "Montserrat",
    fontSize: 12,
    
   },

  buttonContainer: {
    top: 260,
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
  bar2: {
    width: 120,
    height: 0.5,
    backgroundColor: "#626262",
    color: "#626262",
    marginHorizontal: 40,
  },
  bar3: {
    width: 150,
    height: 0.5,
    backgroundColor: "#626262",
    marginHorizontal: 40,
  },
  buttonContainer2: {
    top: 325,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  buttonContainerI :{ 

    top: 240,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",


  },

 
    buttonContainer3: {
      top: 285,
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

  inscriptionComponent: {
    top: -210,
  },
});
export default MainScreen;
