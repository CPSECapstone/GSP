import { View, Text, Image, StyleSheet } from "react-native";

interface ResultCellProps {
    imageurl: string;
    title: string;
    distance: number;
    category: string;
    minoritygroup: string;
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        backgroundColor: "#FFFFFF",
        width: 228,
        height: 296,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
    },
    titletext: {
        fontFamily: "Mada-SemiBold",
        fontSize: 22,
        maxWidth: 130,
        flexWrap: "wrap"
    },
    distancetext: {
        fontFamily: "Mada-Bold",
        fontSize: 17,
        color: "#FA4A0C",
        padding: 15
    },
    horizview: {
        flexDirection: "row", 
        justifyContent: "center",
        alignItems: "center"
    },
    littletext: {
        fontFamily: "Mada-SemiBold",
        fontSize: 12,
        opacity: 0.5,
        padding: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150,
        margin: 15,
    }
});

function ExploreResultCell(props : ResultCellProps) {
    const { imageurl, title, distance, category, minoritygroup } = props;

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/icon.png")} />
            <View style={styles.horizview}>
                <Text style={styles.titletext}>{title}</Text>
                <Text style={styles.distancetext}>{distance + "mi"}</Text> 
            </View>
            <View style={styles.horizview}>
                <Text style={styles.littletext}>{category}</Text>
                <Text style={styles.littletext}>|</Text>
                <Text style={styles.littletext}>{minoritygroup + "-Owned"}</Text>
            </View>
        </View>
    );
};

export default ExploreResultCell;