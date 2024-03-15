import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import LoginScreen from "./screens/LoginScreen";
import { useFonts } from "expo-font";
import Inscription from "./screens/Inscription";
import MainScreen from "./screens/MainScreen";
import Forgetpwd from "./screens/Forgetpwd";
import MailScreen from "./screens/MailScreen";
import Home from "./screens/HomeScreen";
import BottomNavigator from "./screens/bottomNavigator";
import specialite from "./screens/Specialite";
import DoctorsScreen from "./screens/DoctorsScreen";
import DoctorDetails from "./screens/DoctorDetails";
import Articlescreen from "./screens/Articlescreen";
import ArticlesDetails from "./screens/ArticlesDetails";







const Stack = createStackNavigator();
const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    Poppins: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="MainScreen"
      >
        <Stack.Screen
          name="BottomNavigator"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Forgetpwd" component={Forgetpwd} />
        <Stack.Screen name="MailScreen" component={MailScreen} />
        <Stack.Screen name="specialite" component={specialite} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
        <Stack.Screen name="Articlescreen" component={Articlescreen} />
        <Stack.Screen name="ArticlesDetails" component={ArticlesDetails} />


       </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  footerIcon: {
    width: 30,
    height: 25,
  },
});

export default App;
