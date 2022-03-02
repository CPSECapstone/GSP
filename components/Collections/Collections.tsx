import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { placeholderbusinesses } from "../../constants/placeholderdata";
import { CollectionProps } from "../../route-settings";
import BusinessCell from "../Misc/BusinessCell";
import CollectionCell from "./CollectionCell";
import ColorPicker from "./ColorPicker";

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    marginLeft: 50,
    marginBottom: 25,
    fontFamily: "Mada-Bold",
  },

  subheader: {
    marginLeft: 50,
    fontFamily: "Mada-Medium",
    color: "#FA4A0C",
    fontSize: 18,
  },
  subcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addcollectiontext: {
    fontFamily: "Mada-Medium",
    fontSize: 18,
    borderRadius: 10,
    borderColor: "#9A9A9D",
    borderWidth: 1,
    color: "#9A9A9D",
    padding: 5,
    marginRight: 50,
  },
  scrollitemsflatlist: {
    width: "100%",
    paddingLeft: 50,
    overflow: "visible",
  },
  verticalflatlist: {
    paddingHorizontal: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modaltitletext: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#000000",
    opacity: 0.5,
  },
  modalbuttontext: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
  },
  modalinput: {
    borderBottomColor: "#8b8b8b",
    borderBottomWidth: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 5,
    borderRadius: 10,
    width: 300,
  },
  emptytext: {
    fontFamily: "Mada-Medium",
    fontSize: 20,
    padding: 50,
  },
  charcounttext: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    opacity: 0.3,
    marginTop: 2.5,
    marginBottom: 10,
  },
});

// TODO: when a new collection is created, data must be appended to this list
// Its content should be added to redux as well as posted to the collections category of the user in the DB
const collectionplaceholder = [
  {
    color: "#E92736",
    title: "Authentic Thai",
    description: "The best thai restaurants in town!",
  },
  {
    color: "black",
    title: "Black Hairdressers",
    description: "My favorite local black-owned hairdressers",
  },
  {
    color: "#8F00FF",
    title: "Pride Month",
    description: "LQBTQ owned businesses in my area.",
  },
];

function Collections({ navigation }: CollectionProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  let color = "#B27129";

  const updateColor = (val: string) => {
    color = val;
  };

  // eslint-disable-next-line
  function AddCollectionModal() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    return (
      <Modal transparent animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text
              style={{
                padding: 20,
                fontFamily: "Poppins-Regular",
                fontSize: 17,
              }}
            >
              Create a New Collection
            </Text>
            <Text style={styles.modaltitletext}>TITLE</Text>
            <TextInput
              maxLength={15}
              style={styles.modalinput}
              onChangeText={setTitle}
              value={title}
            />
            <Text style={styles.charcounttext}>{`${title.length}/15`}</Text>
            <Text style={styles.modaltitletext}>DESCRIPTION</Text>
            <TextInput
              maxLength={50}
              style={styles.modalinput}
              onChangeText={setDescription}
              value={description}
            />
            <Text style={styles.charcounttext}>
              {`${description.length}/50`}
            </Text>
            <Text style={styles.modaltitletext}>COLOR</Text>
            <ColorPicker updateColor={updateColor} />
            <View style={styles.subcontainer}>
              <Pressable
                style={{ marginRight: 75, marginLeft: 15 }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={[styles.modalbuttontext, { opacity: 0.5 }]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  // eslint-disable-next-line
                  navigation.navigate("OpenCollection", {
                    name: title,
                    description,
                  });
                  setModalVisible(false);
                  // TODO: replace this with redux/database push!
                  collectionplaceholder.push({
                    color,
                    title,
                    description,
                  });
                }}
                style={{
                  backgroundColor: "#FA4A0C",
                  borderRadius: 30,
                  padding: 12,
                  paddingHorizontal: 40,
                }}
              >
                <Text style={[styles.modalbuttontext, { color: "white" }]}>
                  Create
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView>
      <AddCollectionModal />
      <Text style={styles.title}>Collections</Text>
      <Text style={[styles.subheader, { marginBottom: 20 }]}>
        Recently Visisted
      </Text>
      <View style={{ height: 300 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollitemsflatlist}
          renderItem={({ item }) => (
            <BusinessCell
              name={item.name}
              businessId={item.businessId}
              distance={item.distance}
            />
          )}
          keyExtractor={(item) => item.businessId}
          data={placeholderbusinesses}
        />
      </View>
      <View style={[{ marginBottom: 10 }, styles.subcontainer]}>
        <Text style={[styles.subheader, { marginLeft: 50 }]}>
          Your Collections
        </Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.addcollectiontext}>+ Add Collection</Text>
        </Pressable>
      </View>
      {collectionplaceholder.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.verticalflatlist}
          showsVerticalScrollIndicator={false}
          data={collectionplaceholder}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("OpenCollection", {
                  name: item.title,
                  description: item.description,
                })
              }
            >
              <CollectionCell color={item.color} title={item.title} />
            </Pressable>
          )}
          keyExtractor={(item, index) => item.title + item.color + index}
        />
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.emptytext}>Add you first collection!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Collections;
