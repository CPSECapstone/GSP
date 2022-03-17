import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";
import mapStyle from "../../constants/map";

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

interface MapProps {
  length: number;
  coordinate: any;
  name: string;
}

export default function Map({ coordinate, length, name }: MapProps) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 35.30501403594777,
          longitude: -120.66260149147742,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {length === 2 ? (
          <Marker
            coordinate={{ latitude: coordinate[1], longitude: coordinate[0] }}
            title={name}
            /* eslint-disable global-require */
            image={require("../../assets/map-marker.png")}
          />
        ) : (
          <View />
        )}
      </MapView>
    </View>
  );
}
