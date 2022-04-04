import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../redux/hooks";
import { selectAllBusinesses } from "../../redux/selectors/business";
import { selectReviewsByUser } from "../../redux/selectors/review";
import { selectUser } from "../../redux/selectors/user";
import { ReviewPageProps } from "../../route-settings";
import ReviewCell from "./ReviewCell";
import BackButton from "../Profile/User/BackButton";
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
      {reviews.map((review) => {
        const business = businesses.find((b) => b?.id === review.businessID);
        if (!business || !review.rating || !user) {
          // TODO: Make rating required on backend
          return undefined;
        }

        return (
          <View style={styles.review} key={review.id}>
            <ReviewCell
              user={user}
              title={business.name}
              review={review}
              clientId={user?.id}
              srcImage={business.profileImage}
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
