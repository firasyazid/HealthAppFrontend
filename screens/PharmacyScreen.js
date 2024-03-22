import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import * as Location from "expo-location";

const PharmacyScreen = ({ navigation }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [Type, setType] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);

  const fetchRegions = async () => {
    try {
      const response = await fetch(
        "http://192.168.233.71:3007/api/v1/RegionPharmacy"
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

  //////

  const fetchtypes = async () => {
    try {
      const response = await fetch("http://192.168.233.71:3007/api/v1/type");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setType(data);
      console.log(data, "datazzzz");
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  useEffect(() => {
    fetchtypes();
  }, []);

  /////
  const fetchpharmacies = async () => {
    try {
      const response = await fetch(
        "http://192.168.233.71:3007/api/v1/pharmacy"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPharmacies(data);
      console.log(data, "datazzzz");
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  useEffect(() => {
    fetchpharmacies();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent2}>
      <View style={styles.container2}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("../assets/medical-team.png")}
              style={{ width: 55, height: 55, left: 20, marginTop: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Votre pharmacie, </Text>
          <Text style={styles.text}>la plus proche </Text>

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
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 200,
          left: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              left: -175,
              justifyContent: "flex-start",
            }}
          />
          <SelectDropdown
            data={Type.map((type) => type.name)}
            onSelect={(selectedItem, index) => setSelectedType(selectedItem)}
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={styles.dropdownButtonText}
            dropdownStyle={styles.dropdown}
            rowStyle={styles.dropdownRow}
            rowTextStyle={styles.dropdownText}
            defaultButtonText="Choisir Type"
          />

          <Image
            source={require("../assets/day.png")}
            style={{
              width: 30,
              height: 30,
              top: -5,
              left: -175,
              justifyContent: "flex-start",
            }}
          />
        </View>
      </View>

<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", top: 250,
 alignSelf: "center",
 position: "absolute", marginTop:20}}>
      <View
         style={{
           alignItems: "center",
          justifyContent: "center",
          borderColor: "#D8DFE0",
          borderWidth: 0.5,
          borderRadius: 15,
          height: 140,
          backgroundColor: "white",
          width: 310,
          marginVertical: 10,  
          shadowColor: "#D8DFE0",
          shadowOffset: { width:4, height: 4},
          shadowOpacity: 2.5,
          shadowRadius: 5,
          elevation: 5,
          paddingHorizontal: 10,
         }}
      >


            <Text style={{fontSize: 15, fontFamily: "Montserrat", color: "#1B3C73", top: 13, left: 20, position:'absolute'}}
            >Pharmacie de la Gare</Text>
            <Image
            source={require("../assets/location.png")}
            style={{ width: 25, height: 25, top: 40, left: 20, position:'absolute'}}
            />
            <Text style={{fontSize: 12, fontFamily: "Montserrat", color: "#6c757d", top: 45, left: 50, position:'absolute'}}
            > 12 Rue de la Gare</Text>
            <TouchableOpacity>
            <Image
            source={require("../assets/location.png")}
            style={{ width: 25, height: 25, top: 5, left: -135, position:'absolute'}}
            />
            <Text style={{fontSize: 12, fontFamily: "Montserrat", color: "#6c757d", top: 10, left: -100, position:'absolute'}}
            > 71 123 456</Text>
                        </TouchableOpacity>


        </View>

        </View>














    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent2: {
    backgroundColor: "white",
    flex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: "white",
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
    top: 25,
    left: -60,
  },

  dropdownButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 15,
    height: 45,
    width: 180,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 30,
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

export default PharmacyScreen;
