import { Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

interface CollectionCellPropTypes {
  color: string;
  title: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginVertical: 10,
  },
  title: {
    fontFamily: "Mada-Medium",
    fontSize: 18,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 5,
  },
});

function CollectionCell(props: CollectionCellPropTypes) {
  const { color, title } = props;

  return (
    <View style={[styles.container, styles.shadow]}>
      <Entypo color={color} name="location-pin" size={35} />
      <Text style={styles.title}>{title}</Text>
      <Entypo name="chevron-right" size={24} />
    </View>
  );
}

export default CollectionCell;
