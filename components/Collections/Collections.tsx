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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import selectAllUserCollections from "../../redux/selectors/collections";
import { selectUser } from "../../redux/selectors/user";
import { addCollection } from "../../redux/slices/collection";
import { Collection } from "../../src/API";
import BusinessCell from "../Misc/BusinessCell";
import CollectionCell, { CreateNewCollectionCell } from "./CollectionCell";
import ColorPicker from "./ColorPicker";
import gStyles from "../../global-styles";
import { getRecentBusinesses } from "../Misc/RecentBusinessStore";
import WithBusinessView from "../Profile/Business/WithBusinessView";
import CollectionAPI from "./CollestionsAPI";
import OpenCollection from "./OpenCollection";

const styles = StyleSheet.create({
  subheader: {
    fontFamily: "Mada-Medium",
    color: "#7300ff",
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
  },
  scrollitemsflatlist: {
    width: "100%",
    overflow: "visible",
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
    padding: 30,
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

type CollectionProps = NativeStackScreenProps<
  { BusinessView: { id: string }; Component: undefined },
  "Component"
>;

function Collections({ navigation }: CollectionProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [recent, setRecent] = React.useState<string[]>([]);
  const [currentCollection, setCurrentCollection] = React.useState<
    Collection | undefined
  >(undefined);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const userCollections = useAppSelector(selectAllUserCollections);

  React.useEffect(() => {
    if (!recent) {
      getRecentBusinesses().then((businessIds) => {
        setRecent(businessIds);
      });
    }
  }, []);

  let collectionColor = "#B27129";

  const updateColor = (val: string) => {
    collectionColor = val;
  };

  const pushNewCollection = async (
    color: string,
    title: string,
    description: string
  ) => {
    const newCollection = {
      color,
      title,
      description,
      userID: user?.id,
    };
    CollectionAPI.create(newCollection).then((res) => {
      dispatch(addCollection(res.data.createCollection));
      setCurrentCollection(res.data.createCollection);
    });
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
                marginBottom: 20,
                fontFamily: "Poppins-Regular",
                fontSize: 17,
              }}
            >
              Create New Collection
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
                  setModalVisible(false);
                  pushNewCollection(collectionColor, title, description);
                }}
                style={{
                  backgroundColor: "#7300ff",
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

  if (currentCollection !== undefined) {
    return (
      <OpenCollection
        collection={currentCollection}
        goBack={() => setCurrentCollection(undefined)}
      />
    );
  }
  return (
    <SafeAreaView style={gStyles.container}>
      <AddCollectionModal />
      <Text style={gStyles.title}>Collections</Text>
      <Text style={[styles.subheader, { marginBottom: 20 }]}>
        Recently Visisted
      </Text>
      <View style={{ height: 300 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollitemsflatlist}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("BusinessView", { id: item })}
            >
              <BusinessCell businessId={item} />
            </Pressable>
          )}
          keyExtractor={(item) => item}
          data={recent}
        />
      </View>
      <View style={[{ marginBottom: 10 }, styles.subcontainer]}>
        <Text style={styles.subheader}>My Collections</Text>
      </View>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={userCollections}
          renderItem={({ item }) => (
            <Pressable onPress={() => setCurrentCollection(item)}>
              <CollectionCell
                color={item?.color ?? "#FFFFFF"}
                title={item?.title ?? "Error"}
              />
            </Pressable>
          )}
          keyExtractor={(item, index) => item?.id ?? `undefined${index}`}
          ListFooterComponent={
            <Pressable onPress={() => setModalVisible(true)}>
              <CreateNewCollectionCell />
            </Pressable>
          }
        />
      </View>
    </SafeAreaView>
  );
}
export default function CollectionsPage() {
  return <WithBusinessView Component={Collections} />;
}
