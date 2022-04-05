import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { returnBusinessTypeValue, returnMinorityGroupValue } from "../../api";
import { average } from "../../constants/math";
import { useAppSelector } from "../../redux/hooks";
import { selectBusinessById } from "../../redux/selectors/business";
import { selectReviewsByBusiness } from "../../redux/selectors/review";
import { S3Image } from "../Misc/S3Util";
import StarRating from "./StarRating";

const styles = StyleSheet.create({
  header: {
    fontFamily: "Mada-Black",
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },
  subtitle: {
    fontFamily: "Mada-Black",
    fontSize: 18,
    paddingBottom: 10,
  },
  avatar: {
    aspectRatio: 1,
    maxWidth: "80%",
    maxHeight: "80%",
    width: "80%",
    borderRadius: 100,
    borderWidth: 2,
    alignSelf: "center",
    backgroundColor: "black",
  },
  headerWrapper: {
    paddingBottom: 10,
    borderBottomColor: "#B1B1B3",
    flexDirection: "row",
    alignItems: "center",
  },
});

interface BizReviewHeaderProps {
  businessID: string;
}

function BizReviewHeader({ businessID }: BizReviewHeaderProps) {
  const business = useAppSelector(selectBusinessById(businessID));
  const ratings = useAppSelector(selectReviewsByBusiness(businessID));
  const avgRating = average(ratings.map((r) => r?.rating ?? 5));

  return (
    <View style={styles.headerWrapper}>
      <View style={{ flex: 2 }}>
        <Text style={styles.header}>{business?.name}</Text>
        <Text style={styles.subtitle}>
          {business?.type && returnBusinessTypeValue(business.type)} •{" "}
          {business?.tags && returnMinorityGroupValue(business.tags?.[0])}
        </Text>
        <StarRating rating={avgRating} label={`${ratings.length} reviews`} />
      </View>
      <View style={{ flex: 1 }}>
        <S3Image
          style={[styles.avatar, { borderColor: business?.primarycolor }]}
          S3key={`${business?.id}/profile`}
        />
      </View>
    </View>
  );
}

export default BizReviewHeader;
