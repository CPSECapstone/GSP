import React from "react";
import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import {
  returnBusinessTypeValue,
  returnMinorityGroupValue,
} from "../../constants/enumconverters";
import { getDistanceToBusiness } from "../../constants/location";
import { useAppSelector } from "../../redux/hooks";
import { selectBusinessById } from "../../redux/selectors/business";
import { getProfileImage } from "../Misc/S3Util";

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    width: 228,
    height: 296,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
  },
  titletext: {
    fontFamily: "Mada-SemiBold",
    fontSize: 22,
    maxWidth: 130,
    flexWrap: "wrap",
  },
  distancetext: {
    fontFamily: "Mada-Bold",
    fontSize: 17,
    color: "#7300ff",
    padding: 10,
  },
  horizview: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  littletext: {
    fontFamily: "Mada-SemiBold",
    fontSize: 12,
    opacity: 0.5,
    padding: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
    margin: 10,
  },
});

type ExploreResultCellProps = { businessID: string; onPress: () => void };
function ExploreResultCell({ businessID, onPress }: ExploreResultCellProps) {
  const business = useAppSelector(selectBusinessById(businessID))!;
  const [distance, setDistance] = React.useState("");

  const minoritygroups =
    business.tags?.map((tag) => returnMinorityGroupValue(tag)!) ?? [];

  React.useEffect(() => {
    getDistanceToBusiness(business).then(setDistance);
  }, []);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        style={[
          styles.image,
          { borderWidth: 2, borderColor: business.primarycolor },
        ]}
        source={getProfileImage(business)}
      />
      <View style={styles.horizview}>
        <Text style={styles.titletext}>{business.name}</Text>
        <Text style={styles.distancetext}>{`${
          distance ? `${distance}mi` : ""
        }`}</Text>
      </View>
      <Text style={styles.littletext}>
        {returnBusinessTypeValue(business.type)}
      </Text>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingBottom: 10,
        }}
      >
        {minoritygroups.map((minoritygroup, index) => (
          <Text
            key={minoritygroup + index.toString()}
            style={{ fontFamily: "Mada-SemiBold", fontSize: 12, opacity: 0.5 }}
          >
            {minoritygroup}
            {index !== minoritygroups.length - 1 ? " • " : ""}
          </Text>
        ))}
      </View>
    </Pressable>
  );
}

export default ExploreResultCell;
