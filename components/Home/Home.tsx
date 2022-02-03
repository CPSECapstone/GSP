import { StyleSheet, View } from "react-native";
import Map from "../Map/Map";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}
