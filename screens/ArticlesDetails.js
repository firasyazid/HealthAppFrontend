import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { Video } from 'expo-av';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ArticlesDetails = ({ route, navigation }) => {
  const { article } = route.params;
  console.log("Article1:", article.image);
  console.log("Article2:", article.image1);

  const images = [article.image1, article.image2];

  console.log("Images:", images[1]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent2}>
      <View style={styles.main}>
        <View
          style={{
            height: 35,
            width: 35,
            backgroundColor: "#FBF6EE",
            marginTop: 10,
            marginLeft: 10,

            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            position: "absolute",
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={20} color="black" />
          </Pressable>
        </View>

        <Carousel
          data={images.filter(
            (item) => typeof item === "string" && item.trim() !== ""
          )}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: "100%",
                height: screenHeight * 0.5,
                borderRadius: 10,
                marginTop: 20,
              }}
              resizeMode="cover"
            />
          )}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.8}
          loop
          autoplay
          autoplayInterval={2000}
        />

        <View
          style={{ padding: 20, marginTop: 10, top: 420, position: "absolute" }}
        >
          <Text style={{ fontSize: 16, fontFamily: "Poppins", color: "black" }}>
            {article.title}
          </Text>
        </View>

        <View
          style={{ padding: 20, marginTop: 30, top: 500, position: "absolute" }}
        >
          <Text
            style={{ fontSize: 14, fontFamily: "Montserrat", color: "#6c757d" }}
          >
            {article.contenu}
          </Text>
        </View>

        <View
          style={{ padding: 20, marginTop: 10, top: 800, position: "absolute" }}
        >
          <Text
            style={{ fontSize: 12, fontFamily: "Montserrat", color: "black" }}
          >
            Source:{" "}
          </Text>
        </View>

<View style={{ padding: 20, marginTop: 10, top: -100,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 10,

               
}}>
        <Video
                    source={{ uri: article.video }}
                    style={{ width: '100%', height: 200 }}
                    useNativeControls  
                      resizeMode="contain" 
                                          


                />
</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, height: "20%" },
  scrollViewContent2: {
    flexGrow: 1,
    backgroundColor: "white",
    height: screenHeight * 1.6,
  },
});

export default ArticlesDetails;
