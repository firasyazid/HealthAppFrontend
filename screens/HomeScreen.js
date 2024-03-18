 import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,ScrollView,RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
 
const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);




  const fetchData = async () => {
    try {
      setRefreshing(true);

      const response = await fetch(
        "http://192.168.40.71:3004/api/v1/speciality"
      );
      const data = await response.json();
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally {
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
        colors={['#3498db']}  
      />
    }
    contentContainerStyle={styles.scrollViewContent2}>

    <View style={styles.container}>
      <SafeAreaView style={styles.container2}>
        <Image
          source={require("../assets/medical-team.png")}
          style={{ width: 50, height: 50, top: -20, left: 5 }}
        />
        <Text style={styles.text}>Trouvez la solution </Text>
        <Text style={styles.text}>santé de vos envies</Text>
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

      <View style={styles.categories}>
        <TouchableOpacity
        onPress={() => navigation.navigate("specialite")}
        style={styles.touch}>
          <Image
            source={require("../assets/stethoscope.png")}
            style={styles.im1}
          />
          <Text style={styles.texté}>Médecin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch2}>
          <Image
            source={require("../assets/medicaments.png")}
            style={styles.im1}
          />
          <Text style={styles.texté}>Pharmacie</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch3}
        onPress={() => navigation.navigate("Articlescreen")}
        >
          <Image
            source={require("../assets/magazine.png")}
            style={styles.im1}
          />
          <Text style={styles.texté}>Articles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch4}>
          <Image source={require("../assets/pills.png")} style={styles.im1} />
          <Text style={styles.textt}>Médicaments</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.symp}>
        <Text style={styles.texts}>Analysez vos symptômes,</Text>
        <Text style={styles.texts2}>trouvez le bon médecin</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Analyser</Text>
        </TouchableOpacity>

        <Image
          source={require("../assets/doctor.png")}
          style={{ width: 120, height: 120, top: -40, left: 110 }}
        />
      </View>

      <View style={styles.specialites}>
        <Text style={styles.speci}>Spécialités</Text>
      </View>

      <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
      <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              width: "70%",
            }}
          >
{categories.slice(0, 8).map(category => (
    <TouchableOpacity
    onPress={() => navigation.navigate("DoctorsScreen",  { category: category })}

    style={{
      height: 60,
      width: "20%",
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
      key={category._id}>
      <Image 
       source={{
        uri: category.icon.replace("http://localhost:3004", ""),
      }} 
      style={{ width: 30, height: 30, top: 5, left: 0 }}

      />
      <Text style = {styles.text2}>{category.titre}</Text>
    </TouchableOpacity>
  ))}
  </View>
</ScrollView>
    </View>
    </ScrollView>
  );
};
 
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
     justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "200%",    
  },
  scrollViewContent: {
 flexDirection: "row",
  justifyContent: "space-between",
  width: "132%",
  height: 400,
  marginTop: 190
    },
  
    scrollViewContent2: {
      height: '130%',
      width: '100%',
    },
    
  
  text: {
    fontSize: 19,
    color: "black",
    fontFamily: "Montserrat",
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
  categories: {
    backgroundColor: "white",
    top: -20,
    left: 80,
      flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    width: "100%",}, 

  im1: {
    width: 35,
    height: 35,
    borderRadius: 10,
    shadowRadius: 2,
    left: 3,
    top: 8,
  },

  touch: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    position: "absolute",
    borderRadius: 15,
    width: 75,
    height: 60,
    top: 5,
    left: -60,
  },
  touch2: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    position: "absolute",
    borderRadius: 15,
    width: 75,
    height: 60,
    top: 5,
    left: 35,
  },

  touch3: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    position: "absolute",
    borderRadius: 15,
    width: 75,
    height: 60,
    top: 5,
    left: 130,
  },
  touch4: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    position: "absolute",
    borderRadius: 15,
    width: 75,
    height: 60,
    top: 5,
    left: 220,
  },
  texté: {
    fontSize: 10,
    color: "black",
    fontFamily: "Montserrat",
    top: 30,
    left: 0,
  },
  specText :{
    fontSize: 12,
    color: "black",
    fontFamily: "Montserrat",

    
  },

  textt: {
    fontSize: 10,
    width: 100,
    color: "black",
    fontFamily: "Montserrat",
    top: 30,
    left: 10,
  },

  symp: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    position: "absolute",
    borderRadius: 15,
    left: 20,
    width: 75,
     top: 275,
    width: "45%",
    height: 120,
  },

  texts: {
    fontSize: 13,
    color: "black",
    fontFamily: "Montserrat",
    left: -80,
    top: 50,
  },

  texts2: {
    fontSize: 13,
    color: "black",
    fontFamily: "Montserrat",
    left: -85,
    top: 55,
  },

  button: {
    backgroundColor: "#40679E",
    width: 120,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    top: 70,
    left: -90,
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
  },

  buttonText: {
    fontSize: 12,
    color: "white",
    fontFamily: "Montserrat",
  },
  spec : { 

        top: -210,
        left: -330,
        height: 40,
         
  },

  specialites : { 
          top: 190,
         left: -330,
  },
    specialitesicons : { 
        justifyContent: "space-between",
         flexDirection: "row",
        left: 20,
         width: 180,
        height: 60,
      top: 20,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        position: "absolute",
        borderRadius: 15,
    
        

          },
 
          specialitesicons2 : { 
            justifyContent: "space-between",
             flexDirection: "row",
            left: 220,
             width: 120,
            height: 60,
            top: 20,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "grey",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
            position: "absolute",
            borderRadius: 15,
              },

              specialitesicons3 : {

                justifyContent: "space-between",
                flexDirection: "row",
               left: 360,
                width: 140,
               height: 60,
               top: 20,
               backgroundColor: "white",
               justifyContent: "center",
               alignItems: "center",
               shadowColor: "grey",
               shadowOffset: { width: 2, height: 2 },
               shadowOpacity: 0.5,
               shadowRadius: 2,
               elevation: 5,
                borderRadius: 15
              },

                specialitesicons4 : {

                  justifyContent: "space-between",
                  flexDirection: "row",
                 left: 520,
                  width: 140,
                 height: 60,
                 top: 20,
                 backgroundColor: "white",
                 justifyContent: "center",
                 alignItems: "center",
                 shadowColor: "grey",
                 shadowOffset: { width: 2, height: 2 },
                 shadowOpacity: 0.5,
                 shadowRadius: 2,
                 elevation: 5,
                 position: "absolute",
                 borderRadius: 15
                },

                specialitesicons5 : {

                  justifyContent: "space-between",
                  flexDirection: "row",
                 left: 20,
                  width: 140,
                 height: 60,
               top: 110,
                 backgroundColor: "white",
                 justifyContent: "center",
                 alignItems: "center",
                 shadowColor: "grey",
                 shadowOffset: { width: 2, height: 2 },
                 shadowOpacity: 0.5,
                 shadowRadius: 2,
                 elevation: 5,
                 position: "absolute",
                 borderRadius: 15
                },
                specialitesicons6 : {

                  justifyContent: "space-between",
                  flexDirection: "row",
                 left: 175,
                  width: 140,
                 height: 60,
               top: 110,
                 backgroundColor: "white",
                 justifyContent: "center",
                 alignItems: "center",
                 shadowColor: "grey",
                 shadowOffset: { width: 2, height: 2 },
                 shadowOpacity: 0.5,
                 shadowRadius: 2,
                 elevation: 5,
                 position: "absolute",
                 borderRadius: 15
                },
                specialitesicons7 : {

                  justifyContent: "space-between",
                  flexDirection: "row",
                 left: 330,
                  width: 140,
                 height: 60,
               top: 110,
                 backgroundColor: "white",
                 justifyContent: "center",
                 alignItems: "center",
                 shadowColor: "grey",
                 shadowOffset: { width: 2, height: 2 },
                 shadowOpacity: 0.5,
                 shadowRadius: 2,
                 elevation: 5,
                 position: "absolute",
                 borderRadius: 15
                },                specialitesicons8 : {

                  justifyContent: "space-between",
                  flexDirection: "row",
                 left: 490,
                  width: 140,
                 height: 60,
               top: 110,
                 backgroundColor: "white",
                 justifyContent: "center",
                 alignItems: "center",
                 shadowColor: "grey",
                 shadowOffset: { width: 2, height: 2 },
                 shadowOpacity: 0.5,
                 shadowRadius: 2,
                 elevation: 5,
                 position: "absolute",
                 borderRadius: 15
                },


      im2: {
        width: 35,
        height: 35,
        borderRadius: 10,
        shadowRadius: 2,
         top:200,
         left: -100,
      },

      im3: {
        width: 35,
        height: 35,
        borderRadius: 10,
        shadowRadius: 2,
         top:0,
         left: 115,
      },

      im4: {
        width: 35,
        height: 35,
        borderRadius: 10,
        shadowRadius: 2,
         top:0,
         left: 90,
      },


      texticons2: {
        fontSize: 10,
        color: "black",
        fontFamily: "Montserrat",
        top: -15,
        left: 25,
      },

      iconstouch    : { 
         top: 'auto',
           width: '45%',
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "grey",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
          borderRadius: 15,
          height: 60,
              
            

      },

      iconstouch2 : { 
        top: 5,
        width: '45%',
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
         borderRadius: 15,
        height: 60,
        top: 5,
        left: 300,

      },


      iconsnss : { 
        fontSize: 10,
        color: "black",
        fontFamily: "Montserrat",
        top: 0,
        left: 125,
        width: '200%',
      }
      ,

      iconsnss2 : { 
        fontSize: 10,
        color: "black",
        fontFamily: "Montserrat",
        top: 0,
        left: 100,
        width: '200%',
      },
      text2: {
        fontSize: 12,
        color: "black",
        fontFamily: "Montserrat",
        top: 10,
        left: 5,
      },
});
