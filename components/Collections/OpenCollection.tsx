import { ConsoleLogger } from "@aws-amplify/core";
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
import { useAppSelector } from "../../redux/hooks";
import { selectAllBusinesses } from "../../redux/selectors/business";
import selectAllUserCollections from "../../redux/selectors/collections";
import { OpenCollectionPageProps } from "../../route-settings";
import { Collection } from "../../src/API";
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

type OpenCollectionProps = { collection: Collection; goBack: () => {} };
function OpenCollection({ collection, goBack }: OpenCollectionProps) {
  const [isEditing, setisEditing] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const collectedBusinesses = useAppSelector(selectAllBusinesses)!.filter(
    (x) => x!.collectionID === collection.id
  );

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isEditing ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isEditing]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={{ marginLeft: -8 }}
          onPress={() => {
            goBack();
          }}
        >
          <Entypo color="black" name="chevron-left" size={30} />
        </Pressable>
        <Text style={styles.collectiontitle}>{collection.title}</Text>
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
      <Text style={styles.collectiondesctext}>{collection.description}</Text>
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
            <BusinessCard
              name={item!.name}
              rating={item!.rating}
              distance={item!.distance}
            />
          </View>
        )}
        keyExtractor={(item, index) => index + item!.name}
        data={collectedBusinesses}
      />
    </View>
  );
}

export default OpenCollection;
