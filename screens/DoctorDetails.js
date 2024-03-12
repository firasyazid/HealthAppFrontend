import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { showToast } from "../utils/toast";


const DoctorDetails = ({ navigation, route }) => {
  const { doctor, categoryTitre } = route.params;
  const [selectedDay, setSelectedDay] = useState({ day: null, fullDate: null });
  const [selectedTime, setSelectedTime] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [userId, setUserId] = useState(null);

  console.log(categoryTitre);
  

  const openGoogleMapsLink = () => {
    const googleMapsLink = doctor.address;
    Linking.openURL(googleMapsLink);
  };

  const getMonday = () => {
    const currentDate = new Date();
    console.log(currentDate);
    const currentDay = currentDate.getDay();
     const mondayOffset = currentDay === 0 ? 6 : currentDay - 1;
    return currentDate.getDate() - mondayOffset;
  };

  const getTuesday = () => {
    const monday = getMonday();
    return monday + 1;
  };

  const getWednesday = () => {
    const monday = getMonday();
    return monday + 2;
  };

  const getThursday = () => {
    const monday = getMonday();
    return monday + 3;
  };

  const getFriday = () => {
    const monday = getMonday();
    return monday + 4;
  };

  const handlePress = (day) => {
    const fullDate = getFullDate(day);
    setSelectedDay({ day, fullDate });
    console.log(day, fullDate);
  };
  const getFullDate = (day) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
  
    const dayOffset = { "Monday": 1, "Tuesday": 2, "Wednesday":3, "Thursday": 4, "Friday": 5 }[day];
    const selectedDate = currentDay - currentDate.getDay() + dayOffset;
  
    return `${selectedDate.toString().padStart(2, '0')}/${currentMonth.toString().padStart(2, '0')}/${currentYear}`;
  };
  

  const handlePressTime = (time) => {
    setSelectedTime(time);
   };

   const getUserId = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Id');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Failed to fetch the userId from AsyncStorage', e);
      return null;
    }
  };

  useEffect(() => {
    getUserId().then((id) => {
      setUserId(id);
    });
  }, []);



  const planifierConsultation = async () => {
    if (!selectedDay.day) {
      showToast("error", "❌ Veuillez sélectionner un jour !");
      return;
    }
    if (!selectedTime) {
      showToast("error", "❌ Veuillez sélectionner une heure !");
      return;
    }

    try {
      const appointmentData = {
        user_id: userId,  
      doctor_id: doctor._id, 
        date: selectedDay.fullDate,  
        AppHour: {
          day: selectedDay.day, 
          hours: selectedTime  
        }
      };
      const response = await axios.post('http://192.168.100.221:3005/api/v1/appointement', appointmentData);
      console.log('Appointment saved:', response.data);
      showToast("success", "✔️ Rendez-vous enregistré!");  
      } catch (error) {
       showToast("error", "❌ Date déjà réservée !");
      }
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
          <Text style={styles.text1}>A propos</Text>
        </View>

        <View style={{ position: "absolute", left: 90, top: 170 }}>
          <Text style={styles.text2}>
            <Text> {doctor.description}</Text>
          </Text>
        </View>
      </View>

      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TouchableOpacity
          onPress={() => handlePress("Monday")}
          style={{
            position: "absolute",
            left: 10,
            top: 0,
            backgroundColor: selectedDay.day === "Monday" ? "#1B3C73" : "white",
            height: 95,
            width: 80,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#F2F1EB",
            shadowColor: "grey",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 10,
              fontFamily: "Poppins",
              color: "#1B3C73",
              color: selectedDay.day === "Monday" ? "white" : "#1B3C73",
            }}
          >
            Lundi
          </Text>
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 45,
              fontFamily: "Poppins",
              color: selectedDay.day === "Monday" ? "white" : "#1B3C73",
              fontSize: 18,
            }}
          >
            {getMonday()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress("Tuesday")}
          style={{
            position: "absolute",
            left: 100,
            top: 0,
            backgroundColor: selectedDay.day === "Tuesday" ? "#1B3C73" : "white",
            height: 95,
            width: 80,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#F2F1EB",
            shadowColor: "grey",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 10,
              fontFamily: "Poppins",
              color: selectedDay.day === "Tuesday" ? "white" : "#1B3C73",
            }}
          >
            Mardi
          </Text>
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 45,
              fontFamily: "Poppins",
              color: selectedDay.day === "Tuesday" ? "white" : "#1B3C73",
              fontSize: 18,
            }}
          >
            {getTuesday()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress("Wednesday")}
          style={{
            position: "absolute",
            left: 190,
            top: 0,
            backgroundColor: selectedDay.day === "Wednesday" ? "#1B3C73" : "white",
            height: 95,
            width: 85,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#F2F1EB",
            shadowColor: "grey",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 10,
              fontFamily: "Poppins",
              color: selectedDay.day === "Wednesday" ? "white" : "#1B3C73",
            }}
          >
            Mercredi
          </Text>
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 45,
              fontFamily: "Poppins",
              color: selectedDay.day === "Wednesday" ? "white" : "#1B3C73",
              fontSize: 18,
            }}
          >
            {getWednesday()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress("Thursday")}
          style={{
            position: "absolute",
            left: 290,
            top: 0,
            backgroundColor: selectedDay.day === "Thursday" ? "#1B3C73" : "white",
            height: 95,
            width: 85,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#F2F1EB",
            shadowColor: "grey",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 10,
              fontFamily: "Poppins",
              color: selectedDay.day === "Thursday" ? "white" : "#1B3C73",
            }}
          >
            Jeudi
          </Text>
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 45,
              fontFamily: "Poppins",
              color: selectedDay.day === "Thursday" ? "white" : "#1B3C73",
              fontSize: 18,
            }}
          >
            {getThursday()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress("Friday")}
          style={{
            position: "absolute",
            left: 390,
            top: 0,
            backgroundColor: selectedDay.day === "Friday" ? "#1B3C73" : "white",
            height: 95,
            width: 85,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#F2F1EB",
            shadowColor: "grey",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 10,
              fontFamily: "Poppins",
              color: selectedDay.day === "Friday" ? "white" : "#1B3C73",
            }}
          >
            Vendredi
          </Text>
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 45,
              fontFamily: "Poppins",
              color: selectedDay.day === "Friday" ? "white" : "#1B3C73",
              fontSize: 18,
            }}
          >
            {getFriday()}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        onPress={() => handlePressTime("9:00")}
        style={{
          position: "absolute",
          top: 600,
          left: 10,
          height: 50,
          width: 120,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#F2F1EB",
          backgroundColor: selectedTime === "9:00" ? "#1B3C73" : "white",
          shadowColor: "grey",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 15,
            color: selectedTime === "9:00" ? "white" : "#1B3C73",
            textAlign: "center",
            top: 10,
            left: 0,
          }}
        >
          9:00 AM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressTime("10:00")}
        style={{
          position: "absolute",
          top: 600,
          left: 140,
          height: 50,
          width: 120,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#F2F1EB",
          backgroundColor: selectedTime === "10:00" ? "#1B3C73" : "white",
          shadowColor: "grey",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 15,
            color: selectedTime === "10:00" ? "white" : "#1B3C73",
            textAlign: "center",
            top: 10,
            left: 0,
          }}
        >
          10:00 AM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressTime("11:00")}
        style={{
          position: "absolute",
          top: 600,
          left: 270,
          height: 50,
          width: 120,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#F2F1EB",
          backgroundColor: selectedTime === "11:00" ? "#1B3C73" : "white",
          shadowColor: "grey",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 15,
            color: selectedTime === "11:00" ? "white" : "#1B3C73",
            textAlign: "center",
            top: 10,
            left: 0,
          }}
        >
          11:00 AM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressTime("1:00")}
        style={{
          position: "absolute",
          top: 680,
          left: 10,
          height: 50,
          width: 120,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#F2F1EB",
          backgroundColor: selectedTime === "1:00" ? "#1B3C73" : "white",
          shadowColor: "grey",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 15,
            color: selectedTime === "1:00" ? "white" : "#1B3C73",
            textAlign: "center",
            top: 10,
            left: 0,
          }}
        >
          1:00 PM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressTime("2:00")}
        style={{
          position: "absolute",
          top: 680,
          left: 140,
          height: 50,
          width: 120,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#F2F1EB",
          backgroundColor: selectedTime === "2:00" ? "#1B3C73" : "white",
          shadowColor: "grey",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 15,
            color: selectedTime === "2:00" ? "white" : "#1B3C73",
            textAlign: "center",
            top: 10,
            left: 0,
          }}
        >
          2:00 PM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressTime("3:00")}
        style={{
          position: "absolute",
          top: 680,
          left: 270,
          height: 50,
          width: 120,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#F2F1EB",
          backgroundColor: selectedTime === "3:00" ? "#1B3C73" : "white",
          shadowColor: "grey",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 15,
            color: selectedTime === "3:00" ? "white" : "#1B3C73",
            textAlign: "center",
            top: 10,
            left: 0,
          }}
        >
          3:00 PM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
 onPress={() => {
  setPressed(!pressed);
  planifierConsultation(); // Assuming planifierConsultation handles the navigation
}}        activeOpacity={0.7}
        style={{
          position: "absolute",
          top: 770,
          alignItems: "center",
          alignSelf: "center",

          height: 60,
          width: 240,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#F2F1EB",
          backgroundColor: pressed ? "#1B3C73" : "white",
          shadowColor: "grey",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 15,
            color: pressed ? "white" : "#1B3C73",
            textAlign: "center",
            top: 15,
            left: 0,
          }}
        >
          Planifier Consultation
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent2: {
    height: "120%",
    width: "100%",
    backgroundColor: "white",
  },
  scrollViewContent: {
    width: "120%",
    height: 100,
    marginTop: 0,
    top: 40,
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
