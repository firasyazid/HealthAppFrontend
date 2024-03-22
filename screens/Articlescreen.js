import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
 import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
 
const Articlescreen = ({ navigation }) => {
  const [userNames, setUserNames] = useState("");
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArticles, setSelectedArticles] = useState([]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);  
    };
    useEffect(() => {
      if (selectedCategory) {
        fetchArticlesByCategory();
      }
    }, [selectedCategory]);
    
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.233.71:3006/api/v1/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

     const fetchArticles = async () => {
      try {
            setRefreshing(true);
        const response = await axios.get(
          "http://192.168.233.71:3006/api/v1/articles"
        );
        setArticles(response.data);
       } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setRefreshing(false);
      }
    };
  

    useEffect(() => {
    fetchArticles();
    }, []);



    const fetchArticlesByCategory = async () => {
      try {
            setRefreshing(true);
        const response = await axios.get(
          `http://192.168.233.71:3006/api/v1/articles/articlesC/${selectedCategory.id}`
        );
        setSelectedArticles(response.data);
        } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setRefreshing(false);
      }
    };
  
  
    





  useEffect(() => {
    const fetchFullName = async () => {
      try {
        let userId = await AsyncStorage.getItem("Id");
        userId = userId.replace(/"/g, "");

        const res = await axios.get(
          `http://192.168.233.71:3003/api/v1/users/${userId}`
        );

        const fullName = res.data.fullname;
        setUserNames(fullName);
      } catch (error) {}
    };

    fetchFullName();
  }, []);

  return (
    <ScrollView
    refreshControl={
        <RefreshControl
          refreshing={refreshing}
           colors={['#3498db']}  
            onRefresh={fetchArticles}
        />
      }

      contentContainerStyle={{ backgroundColor: "white" , height: "145%"}}
             
    >
      <View style={styles.container2}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("../assets/medical-team.png")}
              style={{ width: 55, height: 55, left: 20, marginTop: 10 }}
            />
          </TouchableOpacity>

          <Text style={styles.text}>Bonjour, </Text>
          <Text style={styles.textN}>{userNames} </Text>
        </SafeAreaView>
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollViewContentH}
      >
        {categories.map((category) => (
          <TouchableOpacity 
          onPress={() => handleCategoryPress(category)}
          key={category._id} style={[
            styles.v1,
            selectedCategory === category && styles.selectedCategory,
          ]}
>
          <Text
            style={[
              styles.cat,
              selectedCategory === category && styles.selectedText,
            ]}>{category.Categoryname}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.Act2}>
      <Text style={[styles.textA, selectedCategory && styles.selectedTextA]}>
  {selectedCategory ? `Articles ${selectedCategory.Categoryname}` : "Articles Populaires"}
</Text>
      </View>

      <View style={styles.Act}>
  {selectedCategory !== null ? (
    selectedArticles.slice(0, 3).map((article) => (
      <View
        key={article.id}
        style={{
          marginBottom: 30,
          marginHorizontal: 5,
         }}
      >
        <TouchableOpacity 
          onPress={() => navigation.navigate("ArticlesDetails", { article })}

          style={{ 
            width: 340, 
            height: 200, 
            borderRadius: 13, 
            shadowColor: "grey",
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 10,
           }}
        >
          <Image
            style={{
              width: 340,
              height: 200,
              top: 0,
              left: 0,
              borderRadius: 10,
            }}
            source={{ uri: article.image.replace("http://localhost:3006", "")}}
            onError={(error) => console.log("Image loading error:", error)}
          />
        </TouchableOpacity>        

        <Text style={styles.textImage}>{article.categoryName}</Text>  
        <Text style={styles.textTitle}>{article.title}</Text> 
      </View>
    ))
  ) : (
    articles.slice(0, 3).map((article) => (
      <View
        key={article.id}
        style={{
          marginBottom: 30,
          marginHorizontal: 5,
        }}
      >
        <TouchableOpacity 
         onPress={() => navigation.navigate("ArticlesDetails", { article })}

          style={{ 
            width: 340, 
            height: 200, 
            borderRadius: 15, 
            shadowColor: "grey",
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
           }}
        >
          <Image
            style={{
              width: 340,
              height: 200,
              top: 0,
              left: 0,
              borderRadius: 15,
            }}
            source={{ uri: article.image.replace("http://localhost:3006", "")}}
            onError={(error) => console.log("Image loading error:", error)}
          />
        </TouchableOpacity>        

        <Text style={styles.textImage}>{article.categoryName}</Text>  
        <Text style={styles.textTitle}>{article.title}</Text> 
      </View>
    ))
  )}
</View>



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent2: {
    height: "120%",
    width: "100%",
    backgroundColor: "white",
  },
  scrollViewContentH: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 1000,
    top: -20,
    left: 10,
  },
  scrollViewContent: {
    height: 100,
    marginTop: 0,
    top: 40,
  },
  v1: {
    height: 35,
    marginTop: 0,
    top: 40,
    width: 100,
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    shadowColor: "grey",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 5,
    marginBottom: 20,
    marginHorizontal: 5,
  },

  selectedCategory: {
    height: 35,
    marginTop: 0,
    top: 40,
    width: 100,
    backgroundColor: "#1B3C73",
    borderRadius: 20,
    flexDirection: "row",
    shadowColor: "grey",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 5,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  v2: {
    marginTop: 0,
    top: 20,
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    shadowColor: "grey",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 5,
    marginBottom: 20,
    marginHorizontal: 5,
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
    fontFamily: "Montserrat",
    fontSize: 10,
    color: "#1B3C73",
    textAlign: "center",
    top: -40,
    left: -100,
  },
  textN: {
    fontFamily: "Montserrat",
    fontSize: 10,
    color: "#1B3C73",
    textAlign: "center",
    top: -40,
    left: -95,
  },
  text1: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: "#1B3C73",
    textAlign: "center",
    top: 10,
    left: -100,
  },

  textA: {
    fontFamily: "Montserrat",
    fontSize: 18,
    color: "#1B3C73",
    textAlign: "center",
    top: 10,
    left: -90,
  },

  selectedTextA :{ 
    fontFamily: "Montserrat",
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

  cat: {
    fontSize: 12,
    color: "black",
    fontFamily: "Montserrat",
    top: 0,
    alignSelf: "center",
    left: 20,
    color: "#1B3C73",
  },

  selectedText: {
    fontSize: 12,
    color: "black",
    fontFamily: "Montserrat",
    top: 0,
    alignSelf: "center",
    left: 20,
    color: "white",
  },

  Act: {
    position: "absolute",
    top: 220,
    marginTop: 0,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
  },
  Act2: {
    position: "absolute",
    top: 150,
    marginTop: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
   },

  textImage: {
    fontFamily: "Montserrat",
    fontSize: 10,
    color: "#1B3C73",
    marginTop: 10,
    left: 5,
  },

  textTitle: {
    fontFamily: "Montserrat",
    fontSize: 15,
    color: "#1B3C73",
    marginTop: 10,
    left: 5,
  },
});

export default Articlescreen;
