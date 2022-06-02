import { Geo } from "aws-amplify";
import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
} from "expo-location";
import * as geolib from "geolib";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Business } from "../src/API";

const searchOptionsWithBiasPosition = {
  maxResults: 1,
};

const computeDistance = async (source: string, destination: string) => {
  try {
    const sourceGeo = await Geo.searchByText(
      source,
      searchOptionsWithBiasPosition
    );
    const destGeo = await Geo.searchByText(
      destination,
      searchOptionsWithBiasPosition
    );
    const sourceCoords = sourceGeo[0].geometry;
    const destCoords = destGeo[0].geometry;
    const src = {
      latitude: sourceCoords!.point[1],
      longitude: sourceCoords!.point[0],
    };
    const dest = {
      latitude: destCoords!.point[1],
      longitude: destCoords!.point[0],
    };
    const distance = geolib.getDistance(src, dest);
    return String(geolib.convertDistance(distance, "mi"));
  } catch (e) {
    console.log(`Error loading address ${e}`);
    return false;
  }
};

const getCoordinates = async (loc: string) => {
  try {
    const locGeo = await Geo.searchByText(loc, searchOptionsWithBiasPosition);
    return locGeo[0].geometry!.point;
  } catch (e) {
    console.log(`Error searching address ${e}`);
    return false;
  }
};

const getDistanceToBusiness = async (business: Business) => {
  const perms = await getForegroundPermissionsAsync();
  if (!perms.granted) {
    return "";
  }
  const currentPostition = await getCurrentPositionAsync({});
  const businessPosition = await getCoordinates(
    `${business.address}, ${business.city}, ${business.state} ${business.zipcode}`
  );
  if (businessPosition === false) {
    return "";
  }
  const dist = geolib.getDistance(
    {
      longitude: currentPostition.coords.longitude,
      latitude: currentPostition.coords.latitude,
    },
    businessPosition
  );
  const distInMiles = geolib.convertDistance(dist, "mi").toFixed(1);
  return distInMiles;
};

export { computeDistance, getCoordinates, getDistanceToBusiness };
