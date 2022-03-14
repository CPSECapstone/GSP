import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../redux/hooks";
import selectAllBusinesses from "../../redux/selectors/business";
import { selectReviewsByUser } from "../../redux/selectors/review";
import selectUser from "../../redux/selectors/user";
import { ReviewPageProps } from "../../route-settings";
import ReviewCell from "../Profile/ReviewCell";
import BackButton from "../UserProfile/BackButton";
import ReviewModal from "./ReviewModal";

const styles = StyleSheet.create({
  title: {
    fontFamily: "Mada-Bold",
    fontSize: 30,
    alignSelf: "center",
  },
  review: {
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
});

function ReviewPage({ navigation }: ReviewPageProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const user = useAppSelector(selectUser);
  const reviews = useAppSelector(selectReviewsByUser(user?.id));
  const businesses = useAppSelector(selectAllBusinesses);

  return (
    <SafeAreaView>
      <BackButton action={() => navigation.goBack()} />
      <Text style={styles.title}>My Reviews</Text>
      {reviews.map(({ comments, rating, businessID, id }) => {
        const business = businesses.find((b) => b?.id === businessID);
        if (!business || !rating) {
          // TODO: Make rating required on backend
          return undefined;
        }

        return (
          <View style={styles.review} key={id}>
            <ReviewCell
              restaurant={business?.name}
              rating={rating}
              srcImage={business?.profileImage}
              description={comments}
              action={() => setModalVisible(true)}
            />
          </View>
        );
      })}

      <ReviewModal
        visible={modalVisible}
        modalVisibilitySetter={setModalVisible}
      />
    </SafeAreaView>
  );
}

export default ReviewPage;
