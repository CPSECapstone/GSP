import { StyleSheet, View, Text, Image } from "react-native";
import * as React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectBusinessById } from "../../redux/selectors/business";
import { getDistanceToBusiness } from "../../constants/location";
import { getProfileImage, S3Image } from "./S3Util";

interface BusinessCellProps {
  businessId: string;
}

const styles = StyleSheet.create({
  foryoucellcontainer: {
    width: 200,
    height: 270,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginRight: 30,
  },
  businessimage: {
    width: 130,
    height: 130,
    borderRadius: 150,
    borderWidth: 3,
    margin: 10,
  },
  businesssubtitle: {
    fontSize: 22,
    fontFamily: "Mada-SemiBold",
    width: 125,
    textAlign: "center",
    marginBottom: 20,
  },
  distancetext: {
    position: "absolute",
    bottom: 20,
    color: "#7300ff",
    fontSize: 17,
    fontFamily: "Mada-Bold",
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

function BusinessCell({ businessId }: BusinessCellProps) {
  const business = useAppSelector(selectBusinessById(businessId))!;
  const [distance, setDistance] = React.useState("");

  React.useEffect(() => {
    getDistanceToBusiness(business).then(setDistance);
  }, []);

  return (
    <View style={[styles.foryoucellcontainer, styles.shadow]}>
      <Image
        style={[
          styles.businessimage,
          { borderColor: `${business.primarycolor}` },
        ]}
        source={getProfileImage(business)}
      />
      <View>
        <Text style={styles.businesssubtitle}>{business.name}</Text>
      </View>
      <Text style={styles.distancetext}>{`${distance}mi`}</Text>
    </View>
  );
}

export default BusinessCell;
