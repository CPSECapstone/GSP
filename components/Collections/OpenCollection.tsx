const placeHolderImage = require("../../assets/icon.png");
import { AntDesign, Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { StyleSheet, View, Text, FlatList, Image, Pressable, Animated } from "react-native";
import { collectionplaceholderbusinesses } from "../../constants/placeholderdata";
import { OpenCollectionPageProps, RootStackParamList } from "../../route-settings";

interface OpenCollectionProps {
    route: NativeStackScreenProps<RootStackParamList>,
    navigation: OpenCollectionPageProps,
};

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
        flexWrap: "wrap"
      },
});

interface CollectionBusinessCellProps {
    name: string,
    distance: string,
    rating: string,
}

const styles2 = StyleSheet.create({
    container: {
        width: 315,
        height: 100,
        padding: 10,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        marginVertical: 10,
    },
    subcontainer: {
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: 15,
    },
    title: {
        fontSize: 17,
        fontFamily: "Mada-SemiBold",
    },
    distancetext: {
        fontSize: 18,
        fontFamily: "Mada-Medium",
        color: "#9A9A9D"
    },
    ratingtext: {
        color: "#FA4A0C",
        fontFamily: "Mada-SemiBold",
        fontSize: 18,
    }
});

function CollectionBusinessCell({ name, distance, rating }: CollectionBusinessCellProps) {
    return (
        <View style={styles2.container}>
            <FontAwesome name="gg-circle" size={75} style={{borderRadius: 75}}/>
            <View style={styles2.subcontainer}>
                <Text style={styles2.title}>{name}</Text>
                <Text style={styles2.distancetext}>{distance + " mi"}</Text>
                <View style={{flexDirection: "row"}}>
                    <Entypo name="star" size={23} color={"#FA4A0C"}/>
                    <Text>{rating}</Text>
                </View>
            </View>
        </View>
    );
};

function OpenCollection({ route, navigation} : OpenCollectionPageProps) {
    const [isEditing, setisEditing] = React.useState(false);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const { name, description } = route.params;
    
    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: isEditing ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    }, [isEditing]);

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", marginLeft: 50}}>
                <Pressable onPress={() => { navigation.goBack() }}>
                   <Entypo color={"black"} name="chevron-left" size={30} />
                </Pressable>
                <Text style={styles.collectiontitle}>{name}</Text>
                <Pressable onPress={() => {
                    setisEditing(!isEditing);
                    }}>
                    <Text style={[styles.editcollectiontext, {minWidth: 150, textAlign: "center"}]}>{isEditing ? "Done" : "Edit Collection"}</Text>
                </Pressable>
            </View>
            <Text style={styles.collectiondesctext}>{description}</Text>
            <FlatList 
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                        <Animated.View style={{ opacity: fadeAnim}}>                        
                            <AntDesign style={{ marginHorizontal: 10 }} name="minuscircle" color={"#FA4A0C"} size={20} />
                        </Animated.View>
                        <CollectionBusinessCell 
                            name={item.name}
                            rating={item.rating}
                            distance={item.distance}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index + item.name}
                data={collectionplaceholderbusinesses}
            />
        </View>
    );
};

export default OpenCollection;