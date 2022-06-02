import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectAllBusinesses } from "../../redux/selectors/business";
import { updateBusiness } from "../../redux/slices/business";
import { collectionRemoval } from "../../redux/slices/collection";
import { Business, Collection } from "../../src/API";
import BusinessCard from "../BusinessCard/BusinessCard";
import CollectionAPI from "./CollestionsAPI";

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
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#ff504a",
    height: 45,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: "center",
    marginRight: 50,
  },
  deleteText: { fontSize: 18, fontWeight: "bold", color: "white" },
});

type OpenCollectionProps = { collection: Collection; goBack: () => void };
function OpenCollection({ collection, goBack }: OpenCollectionProps) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

  const removeBusinessFromCollection = (b: Business) => {
    if (!isEditing) return;
    CollectionAPI.removeBusiness(b).then((response) => {
      dispatch(updateBusiness(response.data.updateBusiness));
    });
  };

  const del = () => {
    CollectionAPI.delete(collection).then(() => {
      dispatch(collectionRemoval(collection.id));
      goBack();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
              <Pressable onPress={() => removeBusinessFromCollection(item!)}>
                <AntDesign
                  style={{ marginRight: 10 }}
                  name="minuscircle"
                  color="#7300ff"
                  size={20}
                />
              </Pressable>
            </Animated.View>
            <Pressable
              onPress={() => {
                if (!isEditing)
                  navigation.navigate("BusinessView", { id: item!.id });
              }}
            >
              <BusinessCard businessID={item!.id} />
            </Pressable>
          </View>
        )}
        keyExtractor={(item, index) => index + item!.name}
        data={collectedBusinesses}
        ListFooterComponent={
          isEditing && (
            <Pressable style={styles.deleteButton} onPress={() => del()}>
              <Text style={styles.deleteText}>Delete Collection</Text>
            </Pressable>
          )
        }
      />
    </SafeAreaView>
  );
}

export default OpenCollection;
