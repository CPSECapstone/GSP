import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/selectors/user";
import { RatingInput } from "./RatingView";
import ReviewAPI from "./ReviewAPI";
import { addReview, editReview } from "../../redux/slices/review";
import BizReviewHeader from "./BizReviewHeader";
import { selectBusinessById } from "../../redux/selectors/business";
import { RootStackParamList } from "../../route-settings";
import { selectReviewById } from "../../redux/selectors/review";
import { ReviewType } from "../../src/APITypes";

const styles = StyleSheet.create({
  back: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -3,
  },
  backText: {
    fontFamily: "Mada-SemiBold",
    fontSize: 18,
    textAlign: "left",
    padding: 10,
    paddingLeft: "1%",
  },
  post: {
    flexDirection: "row",
    alignItems: "center",
  },
  postText: {
    fontFamily: "Mada-Black",
    color: "#DA5125",
    fontSize: 18,
    textAlign: "right",
    padding: 10,
    paddingLeft: "1%",
  },
  descriptor: {
    color: "grey",
    fontFamily: "Mada-Medium",
    paddingTop: 10,
    paddingBottom: 8,
  },
});

interface BackButtonProps {
  action: () => void;
}

function BackButton({ action }: BackButtonProps) {
  return (
    <Pressable onPress={action}>
      <View style={styles.back}>
        <Entypo name="chevron-left" size={24} />
        <Text style={styles.backText}>Back</Text>
      </View>
    </Pressable>
  );
}

function PostButton({ action }: BackButtonProps) {
  return (
    <Pressable onPress={action}>
      <View style={styles.post}>
        <Text style={styles.postText}>Post</Text>
      </View>
    </Pressable>
  );
}

function Line() {
  return (
    <View
      style={{
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1,
        marginTop: 10,
        marginRight: "-10%",
        marginLeft: "-10%",
      }}
    />
  );
}

function Margin() {
  return <View style={{ flex: 1 }} />;
}

type CreateEditReviewProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateEditReview"
>;

function CreateEditReview({ navigation, route }: CreateEditReviewProps) {
  const { busID, editReviewId } = route.params;
  const initialReview = editReviewId
    ? useAppSelector(selectReviewById(editReviewId))
    : undefined;
  const dispatch = useDispatch();
  const [newRating, setNewRating] = useState(initialReview?.rating ?? 0);
  const [text, setText] = useState(initialReview?.comments ?? "");

  const business = useAppSelector(selectBusinessById(busID));
  const clientId = useAppSelector(selectUser)!.id;

  const submitReview = async () => {
    if (!newRating || !text) {
      return;
    }
    if (editReviewId && initialReview) {
      const newReview = {
        ...initialReview,
        rating: newRating,
        comments: text,
      };
      await ReviewAPI.update(newReview);
      dispatch(editReview(newReview));
      navigation.goBack();
    } else {
      const res = (await ReviewAPI.create({
        rating: newRating,
        comments: text,
        businessID: business?.id,
        userID: clientId,
      })) as { data: { createReview: ReviewType } };

      dispatch(addReview(res.data.createReview));
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={{ flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <BackButton action={navigation.goBack} />
          <PostButton action={submitReview} />
        </View>
        <BizReviewHeader businessID={business?.id ?? ""} />
        <Line />

        <View>
          <Text style={styles.descriptor}>Star Rating</Text>
          <RatingInput rating={newRating} submit={setNewRating} />
          <Line />
          <Text style={styles.descriptor}>Comments</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={{ flex: 10 }}
              multiline
              numberOfLines={10}
              maxLength={300}
              placeholder="Enter Text"
              onChangeText={setText}
              defaultValue={text}
            />
            <Pressable
              style={{ flex: 1, alignItems: "flex-end" }}
              onPress={() => setText("")}
            >
              <Ionicons name="close-circle" color="grey" size={15} />
            </Pressable>
          </View>
          <Text
            style={[
              styles.descriptor,
              { color: text.length > 300 ? "red" : "#7D7D7D" },
            ]}
          >
            {`${text.length}\\300`}
          </Text>
        </View>
      </View>
      <Margin />
    </SafeAreaView>
  );
}

export default CreateEditReview;
