import { Dimensions, StyleSheet, View, Text, Image } from "react-native";

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
        width: Dimensions.get('window').width * 0.53,
        height: Dimensions.get('window').height * 0.3,
        cornerRadius: 15,
        backgroundColor: "#FFFFFF",
        padding: 10,
        justifyContent: "center",
    },
    businessimage: {
        cornerRadius: 15,
        margin: "auto",
    },
    businesssubtitle: {
        fontSize: 22,
    },
    distancetext: {
        color: "#FA4A0C",
        fontSize: 17,
    }
});

export default ForYouCell;