import { StyleSheet, View, Text, Image } from "react-native";
import * as React from 'react';

interface ForYouParameters {
    name: string;
    businessId: string;
    distance: number;
}

const ForYouCell = (props: ForYouParameters) => {

    // TODO: retrieve business info from datastore using businessId
    const getDistance = (distance: number) => {
        return <Text style={styles.distancetext}>{distance.toString() + "mi"}</Text>
    };

    return (
        <View style={styles.foryoucellcontainer}>
            <Image style={styles.businessimage} source={require('../../assets/icon.png')}/>
            <Text style={styles.businesssubtitle}>Taqueria Santa Cruz</Text>
            {getDistance(props.distance)}
        </View>
    );
};

const styles = StyleSheet.create({
    foryoucellcontainer: {
        width: 220,
        height: 270,
        borderRadius: 20,
        padding: 10,
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
    },
    businessimage: {
        height: 110,
        width: 175,
        borderRadius: 20,
        marginBottom: 15,
    },
    businesssubtitle: {
        fontSize: 22,
        fontFamily: "Mada-SemiBold",
        width: 125,
        textAlign: "center",
        marginBottom: 20,
    },
    distancetext: {
        color: "#FA4A0C",
        fontSize: 17,
        fontFamily: "Mada-Bold",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    }
});

export default ForYouCell;