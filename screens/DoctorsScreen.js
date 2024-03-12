import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

const DoctorsScreen = ({ navigation, route }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [refreshing, setRefreshing] = useState(false);


  const { category } = route.params;
  const idc = category.id;
  console.log(idc);

  const fetchDoctors = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        `http://192.168.100.221:3004/api/v1/medecin/by-category/${idc}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDoctors(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.221:3004/api/v1/region/"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRegions(data);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);




  const filteredDoctors = doctors.filter(
    (doctor) => doctor.region === selectedRegion
  );

  return (
    <ScrollView 
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={fetchDoctors}
      />
    }
    contentContainerStyle={styles.scrollViewContent2}>
      <View style={styles.container2}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("../assets/medical-team.png")}
              style={{ width: 55, height: 55, left: 20, marginTop: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Trouvez un médecin le </Text>
          <Text style={styles.text}>plus proche de vous </Text>

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
           justifyContent: "flex-start",
          flexDirection: "row",
           alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 200,
          left: 50,
          zIndex: 1, 

          
        }}
      >
        <SelectDropdown
  data={regions.map((region) => region.name)}
  onSelect={(selectedItem, index) => setSelectedRegion(selectedItem)}
  buttonStyle={styles.dropdownButton}
  buttonTextStyle={styles.dropdownButtonText}
  dropdownStyle={styles.dropdown}
  rowStyle={styles.dropdownRow}
  rowTextStyle={styles.dropdownText}
  defaultButtonText="Choisir Région"
/>

        <Image
          source={require("../assets/location.png")}
          style={{
            width: 30,
            height: 30,
            top: -5,
            left: -290,
            justifyContent: "flex-start",
          }}
        />
      </View>

      <ScrollView
  contentContainerStyle={{
      alignItems: "center",
      justifyContent: "center",
      top: 150,
   }}
>
  {doctors
    .filter((doctor) => selectedRegion === null || doctor.region === selectedRegion)
    .map((doctor) => (
      <TouchableOpacity
        key={doctor._id}
        onPress={() =>  navigation.navigate("DoctorDetails", { doctor, categoryTitre: category.titre })}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#D8DFE0",
          borderWidth: 0.5,
          borderRadius: 15,
          height: 170,
          backgroundColor: "white",
          width: 350,
          marginVertical: 10,  
          shadowColor: "#D8DFE0",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5,
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: doctor.image }}
          style={{
            width: 110,
            height: 110,
            top: 20,
            left: -110,
            borderRadius: 25,
          }}
        />

        <Image
          source={require("../assets/time.png")}
          style={{
            width: 20,
            height: 20,
            top: 130,
            left: 25,
            position: "absolute",
          }}
        />

        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 10,
            color: "#1B3C73",
            textAlign: "center",
            top: 131,
            position: "absolute",
            left: 53,
          }}
        >
          10 AM - 5 PM
        </Text>

        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 16,
            color: "#1B3C73",
            textAlign: "center",
            top: -90,
            left: 50,
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
            top: -90,
            left: 50,
          }}
        >
          {category.titre}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 10,
            color: "#626262",
            textAlign: "center",
            top: -80,
            left: 50,
          }}
        >
          +4 ans expérience
        </Text>

        <Image
          source={require("../assets/location.png")}
          style={{
            width: 20,
            height: 20,
            top: 130,
            left: 190,
            position: "absolute",
          }}
        />
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 10,
            color: "#1B3C73",
            textAlign: "center",
            top: 131,
            position: "absolute",
            left: 220,
          }}
        >
          {doctor.region}
        </Text>
      </TouchableOpacity>
    ))}
</ScrollView>

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
    fontSize: 20,
    color: "#1B3C73",
    textAlign: "center",
    top: 30,
    left: -60,
  },

  dropdownButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 15,
    height: 45,
    width: 300,
    justifyContent: "center",
    paddingLeft: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    borderColor: "#D8DFE0",
    borderWidth: 0.5,
    borderRadius: 10,
  },

  dropdownButtonText: {
    color: "#626262",
    fontSize: 15,
    fontFamily: "Montserrat",
  },

  dropdown: {
    borderColor: "#D8DFE0",
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    fontFamily: "Montserrat",
  },

  dropdownRow: {
    borderBottomColor: "#D8DFE0",
    justifyContent: "center",
    paddingLeft: 10,
    borderBottomWidth: 1,
    fontFamily: "Montserrat",
  },

  dropdownText: {
    fontFamily: "Montserrat",
    fontSize: 15,
    color: "#626262",
  },
});

export default DoctorsScreen;
