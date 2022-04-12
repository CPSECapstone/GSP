/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import ReviewCell from "./ReviewCell";
import LargeButton from "../Misc/LargeButton";
import { useAppSelector } from "../../redux/hooks";
import ReviewModal from "./ReviewModal";
import { selectReviewsByBusiness } from "../../redux/selectors/review";
import { selectAllUsers, selectUser } from "../../redux/selectors/user";
import { RatingInput } from "./RatingView";
// eslint-disable-next-line import/no-cycle
import {
  BProfileStackParamList,
  BusinessContext,
} from "../Profile/Business/BusinessProfile";
import ReviewAPI from "./ReviewAPI";
import { addReview } from "../../redux/slices/review";
import BizReviewHeader from "./BizReviewHeader";

type ReviewPageProps = NativeStackScreenProps<
  BProfileStackParamList,
  "Reviews"
>;
function BizReviewPage({ navigation, route }: ReviewPageProps) {
  const dispatch = useDispatch();
  const [modalVisible, setmodalVisible] = React.useState(false);
  const [writing, setWriting] = React.useState(route.params.edit);
  const [newRating, setNewRating] = React.useState(0);
  const [text, setText] = React.useState("");
  const [selectedReview, setSelectedReview] = useState("");

  const business = React.useContext(BusinessContext);
  const reviews = useAppSelector(selectReviewsByBusiness(business.id));
  const users = useAppSelector(selectAllUsers);
  const clientId = useAppSelector(selectUser)!.id;

  const cancelWriting = () => setWriting(false);
  const submitReview = () => {
    if (!newRating || !text) {
      return;
    }
    ReviewAPI.create({
      rating: newRating,
      comments: text,
      businessID: business.id,
      userID: clientId,
    }).then((response) => {
      dispatch(addReview(response.data.createReview));
      setWriting(false);
    });
  };

  return (
    <SafeAreaView style={{ flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10 }}>
        <ReviewModal
          visible={modalVisible}
          modalVisibilitySetter={setmodalVisible}
          reviewID={selectedReview}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <BackButton action={writing ? cancelWriting : navigation.goBack} />
          {writing && (
            <PostButton action={writing ? submitReview : navigation.goBack} />
          )}
        </View>
        <BizReviewHeader businessID={business.id} />
        <Line />
        {/* Commenting out until functional
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
        */}
        {!writing ? (
          <View>
            <View>
              <FlatList
                contentContainerStyle={{
                  paddingTop: 40,
                  paddingLeft: 12,
                  paddingRight: 12,
                }}
                data={reviews}
                renderItem={({ item }) => {
                  const user = users.find((u) => u.id === item.userID);
                  if (!user || !user.name || !item.rating) return null;
                  return (
                    <View style={{ paddingBottom: 30 }}>
                      <ReviewCell
                        review={item}
                        user={user}
                        title={user.name}
                        clientId={clientId}
                        action={() => {
                          setmodalVisible(true);
                          setSelectedReview(item.id);
                        }}
                      />
                    </View>
                  );
                }}
                keyExtractor={(review) => review.id}
              />
            </View>
            <LargeButton
              action={() => setWriting(true)}
              label="Write a Review"
            />
          </View>
        ) : (
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
        )}
      </View>
      <Margin />
    </SafeAreaView>
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

const styles = StyleSheet.create({
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
  center: {
    alignItems: "center",
  },
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

export default BizReviewPage;
