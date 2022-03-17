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
    alignItems: "center",
  },
  collectiontitle: {
    color: "#FA4A0C",
    fontSize: 24,
    fontFamily: "Mada-Medium",
    marginRight: 50,
    marginLeft: 15,
  },
  editcollectiontext: {
    fontFamily: "Mada-Medium",
    fontSize: 18,
    borderRadius: 10,
    borderColor: "#9A9A9D",
    borderWidth: 1,
    color: "#9A9A9D",
    padding: 5,
    marginRight: 50,
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
      <View style={{ flexDirection: "row", marginLeft: 50 }}>
        <Pressable
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
        >
          <Text
            style={[
              styles.editcollectiontext,
              { minWidth: 150, textAlign: "center" },
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
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Animated.View style={{ opacity: fadeAnim }}>
              <AntDesign
                style={{ marginHorizontal: 10 }}
                name="minuscircle"
                color="#FA4A0C"
                size={20}
              />
            </Animated.View>
            <BusinessCard
              name={item.name}
              rating={item.rating}
              distance={item.distance}
            />
          </View>
        )}
        keyExtractor={(item, index) => index + item.name}
        data={collectionplaceholderbusinesses}
      />
    </SafeAreaView>
  );
}

export default OpenCollection;
