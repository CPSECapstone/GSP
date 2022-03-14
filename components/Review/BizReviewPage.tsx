import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { BizReviewPageProps } from "../../route-settings";
import BackButton from "../UserProfile/BackButton";
import ReviewCell from "./ReviewCell";
import LargeButton from "../Misc/LargeButton";
import ReviewModal from "./ReviewModal";
import { useAppSelector } from "../../redux/hooks";
import { selectReviewsByBusiness } from "../../redux/selectors/review";
import { selectAllUsers } from "../../redux/selectors/user";
import { selectBusinessById } from "../../redux/selectors/business";
import {
  returnBusinessTypeValue,
  returnMinorityGroupValue,
} from "../../constants/enumconverters";
import StarRating from "./StarRating";
import { average } from "../../constants/math";

const styles = StyleSheet.create({
  header: {
    fontFamily: "Mada-Black",
    fontSize: 24,
    paddingTop: 10,
    alignSelf: "center",
    paddingBottom: 10,
  },
  subtitle: {
    fontFamily: "Mada-Black",
    fontSize: 18,
    alignSelf: "center",
    paddingBottom: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 10,
    flexDirection: "row",
  },
  filterButton: {
    height: 30,
    width: 70,
    fontFamily: "Mada-Medium",
    backgroundColor: "#D7D7D7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D7D7D7",
    marginLeft: 30,
    marginTop: 5,
  },
  unselectedFilter: {
    height: 30,
    width: 70,
    fontFamily: "Mada-Medium",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D7D7D7",
    marginLeft: 30,
    marginTop: 5,
  },
  bizImage: {
    height: 100,
    width: 100,
    alignSelf: "center",
    paddingRight: 30,
  },
  center: {
    alignItems: "center",
  },
});

function BizReviewPage({ navigation, route }: BizReviewPageProps) {
  const { busID } = route.params;

  const [modalVisible, setmodalVisible] = React.useState(false);

  const reviews = useAppSelector(selectReviewsByBusiness(busID));
  const users = useAppSelector(selectAllUsers);
  const business = useAppSelector(selectBusinessById(busID));

  const ratings = reviews.map((review) => review.rating) as number[]; // TODO: remove type declaration after rating is required
  const avgRating = average(ratings);

  return (
    <SafeAreaView>
      <ReviewModal
        visible={modalVisible}
        modalVisibilitySetter={setmodalVisible}
      />

      <BackButton action={navigation.goBack} />
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: "#B1B1B3",
          borderBottomWidth: 2,
        }}
      >
        <View>
          <Image
            style={styles.bizImage}
            source={{ uri: business?.profileImage }}
          />

          <Text style={styles.header}>{business?.name}</Text>
          <Text style={styles.subtitle}>
            {returnBusinessTypeValue(business?.type)} •{" "}
            {returnMinorityGroupValue(business?.tags?.[0])}
          </Text>
        </View>
        <View style={styles.center}>
          <StarRating rating={avgRating} label={`${reviews.length} Reviews`} />
        </View>
      </View>

      <Text style={{ color: "grey", paddingLeft: 30, paddingTop: 10 }}>
        {" "}
        Sort By
      </Text>

      <View style={{ flexDirection: "row" }}>
        <Pressable style={styles.filterButton}>
          <Text>Relevant</Text>
        </Pressable>

        <Pressable style={styles.unselectedFilter}>
          <Text>Recent</Text>
        </Pressable>

        <Pressable style={styles.unselectedFilter}>
          <Text>Lowest</Text>
        </Pressable>

        <Pressable style={styles.unselectedFilter}>
          <Text>Highest</Text>
        </Pressable>
      </View>

      <SafeAreaView>
        <FlatList
          contentContainerStyle={{ alignItems: "center", padding: 30 }}
          data={reviews}
          renderItem={({ item }) => {
            const user = users.find((u) => u.id === item.userID);
            if (!user || !user.name || !item.rating) return null;

            return (
              <View style={{ paddingBottom: 20 }}>
                <ReviewCell
                  restaurant={user?.name}
                  description={item.comments}
                  rating={item.rating}
                />
              </View>
            );
          }}
          keyExtractor={(review) => review.id}
        />
      </SafeAreaView>

      <LargeButton
        action={() => console.log("Write a Review")}
        label="Write a Review"
      />
    </SafeAreaView>
  );
}

export default BizReviewPage;
