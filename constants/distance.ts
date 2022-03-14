import { Geo } from "aws-amplify";
import * as geolib from "geolib";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

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
    const test1 = {
      latitude: sourceCoords!["point"][1],
      longitude: sourceCoords!["point"][0],
    };
    const test2 = {
      latitude: destCoords!["point"][1],
      longitude: destCoords!["point"][0],
    };
    const distance = geolib.getDistance(test1, test2);
    return geolib.convertDistance(distance, "mi");
  } catch (e) {
    console.log(`Error loading address ${e}`);
  }
};

export default computeDistance;
