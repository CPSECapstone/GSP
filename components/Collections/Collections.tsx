import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Modal, TextInput } from "react-native";
import { placeholderbusinesses } from "../../constants/placeholderdata";
import BusinessCell from "../Misc/BusinessCell";
import CollectionCell from "./CollectionCell";
import ColorPicker from "./ColorPicker";

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        marginLeft: 50,
        marginTop: 100,
        marginBottom: 25,
        fontFamily: "Mada-Bold",
      },
      container: {
        height: "100%",
        width: "100%",
        flex: 1,
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
            height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
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
        backgroundColor: "#EDEDED",
        padding: 10,
        borderRadius: 10,
        minWidth: 300,
      }
});

//TODO: when a new collection is created, data must be appended to this list
// Its content should be added to redux as well as posted to the collections category of the user in the DB
const collectionplaceholder = [
    { color: "#E92736", title: "Authentic Thai"},
    { color: "black", title: "Black Hairdressers"},
    { color: "#8F00FF", title: "Pride Month"}
];

function Collections() {
    const [modalVisible, setModalVisible] = React.useState(false);
    let color = "#B27129";

    const updateColor = (val: string) => {
        color = val;
    };

    function AddCollectionModal() {
        return (
            <Modal 
                transparent
                animationType="slide"
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={{ padding: 20,fontFamily: "Poppins-Regular", fontSize: 17}}>Create a New Collection</Text>
                        <Text style={styles.modaltitletext}>TITLE</Text>
                        <TextInput style={styles.modalinput} />
                        <Text style={styles.modaltitletext}>DESCRIPTION</Text>
                        <TextInput style={styles.modalinput} />
                        <Text style={styles.modaltitletext}>COLOR</Text>
                        <ColorPicker updateColor={updateColor} />
                        <View style={styles.subcontainer}>
                            <Pressable style={{marginRight: 75, marginLeft: 15}} onPress={() => { setModalVisible(false) }}>
                                <Text style={[styles.modalbuttontext, {opacity: 0.5}]}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => {}} style={{ backgroundColor: "#FA4A0C", borderRadius: 30, padding: 12, paddingHorizontal: 40,}}>
                                <Text style={[styles.modalbuttontext, {color: "white"}]}>Create</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <AddCollectionModal />
            <Text style={styles.title}>Collections</Text>
            <Text style={[styles.subheader, {marginBottom: 20}]}>Recently Visisted</Text>
            <View style={{height: 300}}>
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
                    keyExtractor={( item ) => item.businessId}
                    data={placeholderbusinesses}
                />
            </View>
            <View style={styles.subcontainer}>
                <Text style={[styles.subheader, {marginLeft: 50}]}>Your Collections</Text>
                <Pressable onPress={() => setModalVisible(true)}>
                    <Text style={styles.addcollectiontext}>+ Add Collection</Text>
                </Pressable>
            </View>
            <FlatList 
                contentContainerStyle={styles.verticalflatlist}
                showsVerticalScrollIndicator={false}
                data={collectionplaceholder}
                renderItem={({item}) => (
                    <CollectionCell 
                        color={item.color}
                        title={item.title}
                    />
                )}
                keyExtractor={(item, index) => item.title + item.color + index}
            />
        </View>
    );
};

export default Collections;