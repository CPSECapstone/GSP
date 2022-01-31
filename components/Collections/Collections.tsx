import React from "react";
import { View, Text, FlatList, Button, StyleSheet, Pressable } from "react-native";
import { placeholderbusinesses, placeholdercategories } from "../../constants/placeholderdata";
import BusinessCell from "../Misc/BusinessCell";
import CollectionCell from "./CollectionCell";

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
      }
});

const collectionplaceholder = [
    { color: "orange", title: "Authentic Thai"},
    { color: "black", title: "Black Hairdressers"},
    { color: "purple", title: "Pride Month"}
];

function Collections() {

    return (
        <View style={styles.container}>
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
                <Pressable onPress={() => {}}>
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