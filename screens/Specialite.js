import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,RefreshControl
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

const Specialite = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);



  const filteredCategories = categories.filter(category =>
    category.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  /* get data  !!!!! */

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        "http://192.168.1.16:3004/api/v1/speciality"
      );
      const data = await response.json();
      setCategories(data);
     } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView 
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={fetchData}
      />
    }
    contentContainerStyle={styles.scrollViewContent2}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container2}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("../assets/medical-team.png")}
              style={{ width: 50, height: 50, top: -20, left: 5 }}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Trouvez le spécialiste </Text>
          <Text style={styles.text}>qui vous convient</Text>
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

        {/* Input search hereee !!!!! */}

        <View
          style={{
            zIndex: 1,
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
             top: 80,
            width: "40%",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#D8DFE0",
              borderWidth: 0.5,
              borderRadius: 10,
              height: 50,
              left: -215,
              backgroundColor: "white",
              shadowColor: "#D8DFE0",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 5,
              paddingHorizontal: 10,
            }}
          >
            <Image
              source={require("../assets/search.png")}
              style={{
                width: 30,
                height: 30,
                marginLeft: 0,
                marginRight: 10,
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Rechercher un spécialiste"
              autoCapitalize="none"
              placeholderTextColor="#626262"
              placeholderFontFamily="Poppins"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
        </View>

        {/* Categories hereee !!!!! */}
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              width: "80%",
            }}
          >
{filteredCategories.map(category => (
              <TouchableOpacity 
                onPress={() => navigation.navigate("DoctorsScreen",  { category: category })}
                key={category._id}
                style={{
                  height: 60,
                  width: "12%",
                  backgroundColor: "white",
                  borderRadius: 10,
                  flexDirection: "row",
                  shadowColor: "grey",
                  shadowOffset: { width: 3, height: 3 },
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  elevation: 5,
                  padding: 10,
                  marginBottom: 20,
                  marginHorizontal: 10,
                }}
              >
                <Image
                  source={{
                    uri: category.icon.replace("http://localhost:3004", ""),
                  }}
                  style={{ width: 30, height: 30, top: 5, left: 0 }}
                />
                <Text style={styles.text2}>{category.titre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Specialite;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "200%",
  },
  scrollViewContent: {
    width: "207%",
    height: 500,
    marginTop: 130,
  },

  textInput: {
    flex: 1,
    paddingLeft: 5,
    fontFamily: "Montserrat",
  },

  containerK: {
    flex: 1,
  },

  scrollViewContent2: {
    height: "110%",
    width: "100%",
  },

  text: {
    fontSize: 19,
    color: "#1B3C73",
    fontFamily: "Montserrat",
  },

  text2: {
    fontSize: 12,
    color: "black",
    fontFamily: "Montserrat",
    top: 10,
    left: 5,
  },

  speci: {
    fontSize: 20,
    color: "black",
    fontFamily: "Montserrat",
  },
  container2: {
    flex: 1,
    backgroundColor: "white",
    height: "50%",
    width: "100%",
    top: 30,
    marginLeft: 50,
  },

  btnpower: {
    alignItems: "center",
    zIndex: 1,
    top: -120,
    left: 330,
    width: 35,
    height: 35,
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
});
