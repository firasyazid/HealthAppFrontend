import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { Platform } from "react-native";
import HomeScreen from "./HomeScreen";
import Specialite from "./Specialite";
 

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Tab = createBottomTabNavigator();


const screenOption = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 10,
     marginLeft: windowWidth * 0.2,
    borderRadius: 50,
    width: windowWidth * 0.6,
    height: windowHeight * 0.06,
    backgroundColor: "#FFFFFF",
    justifyContent: "center", 
    alignItems: "center",
     shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5, 
  },
};

const BottomNavigator = () => {
  const iconStyle = Platform.select({
    ios: {marginBottom: -19 },
    android: { marginTop: 0 }, 
  });  return (
    <Tab.Navigator screenOptions={screenOption} initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={24}
              color={focused ? "#1B3C73" : "gray"}
              style={iconStyle}

            />
          ),
        }}
      />


            <Tab.Screen 
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="account-box"
              size={30}
              color={focused ? "#1B3C73" : "gray"}
              style={iconStyle}

            />
          ),
        }}
        />

<Tab.Screen 
        name="Specialite"
        component={Specialite}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="account-box"
              size={30}
              color={focused ? "#1B3C73" : "gray"}
              style={iconStyle}

            />
          ),
        }}
        />

       
    </Tab.Navigator>
  );
};

export default BottomNavigator;
