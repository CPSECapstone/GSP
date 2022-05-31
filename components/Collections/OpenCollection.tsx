import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collectionplaceholderbusinesses } from "../../constants/placeholderdata";
import { OpenCollectionPageProps } from "../../route-settings";
import BusinessCard from "../BusinessCard/BusinessCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 35,
    marginTop: 30,
  },
  collectiontitle: {
    color: "#7300ff",
    fontSize: 24,
    fontFamily: "Mada-Medium",
    marginRight: 50,
    marginLeft: 15,
  },
  editcollectioncontainer: {
    backgroundColor: "#e6ccff",
    borderRadius: 10,
    marginRight: 50,
  },
  editcollectiontext: {
    fontFamily: "Mada-Medium",
    fontSize: 18,
    color: "black",
    padding: 5,
  },
  collectiondesctext: {
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    opacity: 0.5,
    marginVertical: 10,
    flexWrap: "wrap",
  },
});

function OpenCollection({ route, navigation }: OpenCollectionPageProps) {
  const [isEditing, setisEditing] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const { name, description } = route.params;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isEditing ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isEditing]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={{ marginLeft: -8 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Entypo color="black" name="chevron-left" size={30} />
        </Pressable>
        <Text style={styles.collectiontitle}>{name}</Text>
        <Pressable
          onPress={() => {
            setisEditing(!isEditing);
          }}
          style={styles.editcollectioncontainer}
        >
          <Text
            style={[
              styles.editcollectiontext,
              { minWidth: 160, textAlign: "center" },
            ]}
          >
            {isEditing ? "Done" : "Edit Collection"}
          </Text>
        </Pressable>
      </View>
      <Text style={styles.collectiondesctext}>{description}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Animated.View style={{ opacity: fadeAnim }}>
              <AntDesign
                style={{ marginRight: 10 }}
                name="minuscircle"
                color="#7300ff"
                size={20}
              />
            </Animated.View>
            <BusinessCard name={item.name} distance={item.distance} />
          </View>
        )}
        keyExtractor={(item, index) => index + item.name}
        data={collectionplaceholderbusinesses}
      />
    </SafeAreaView>
  );
}

export default OpenCollection;
