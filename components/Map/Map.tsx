import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";
import mapStyle from "../../constants/map"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
      />
    </View>
  );
}
