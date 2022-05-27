import React, { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";
import mapStyle from "../../constants/map";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/selectors/user";
import { getCoordinates } from "../../constants/location";

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
  const mapRef = useRef<MapView | null>(null);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const setInitialLoc = async () => {
      if (!user?.defaultAddress) return;
      const addr = await getCoordinates(user.defaultAddress);
      if (!addr) return;
      const [longitude, latitude] = addr;
      if (!mapRef.current) return;
      mapRef.current.setCamera({
        center: { latitude, longitude },
      });
    };
    setInitialLoc();
  }, [user]);

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
        ref={mapRef}
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
