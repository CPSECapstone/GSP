import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import ReviewCell from "./ReviewCell";
import LargeButton from "../Misc/LargeButton";
import { useAppSelector } from "../../redux/hooks";
import ReviewModal from "./ReviewModal";
import { selectReviewsByBusiness } from "../../redux/selectors/review";
import { selectAllUsers, selectUser } from "../../redux/selectors/user";
import {
  BProfileStackParamList,
  BusinessContext,
} from "../Profile/Business/bizDependencies";
import BizReviewHeader from "./BizReviewHeader";
import { RootStackParamList } from "../../route-settings";
import { ReviewType } from "../../src/APITypes";

const styles = StyleSheet.create({
  sortBy: {
    color: "grey",
    padding: 10,
  },
  filterWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filter: {
    height: 30,
    width: 70,
    fontFamily: "Mada-Medium",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D7D7D7",
  },
  selectedFilter: {
    backgroundColor: "#D7D7D7",
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
});

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

type BizReviewPageProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList>,
  NativeStackScreenProps<BProfileStackParamList, "Reviews">
>;

const recentFilter = (a: ReviewType, b: ReviewType) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

const relevantFilter = (a: ReviewType, b: ReviewType) =>
  (b.comments?.length ?? 0) - (a.comments?.length ?? 0);

const lowestFilter = (a: ReviewType, b: ReviewType) => a.rating! - b.rating!;
const highestFilter = (a: ReviewType, b: ReviewType) => b.rating! - a.rating!;

const filters = [
  { name: "Recent", filter: recentFilter },
  { name: "Relevant", filter: relevantFilter },
  { name: "Lowest", filter: lowestFilter },
  { name: "Highest", filter: highestFilter },
];

function BizReviewPage({ navigation }: BizReviewPageProps) {
  const [modalVisible, setmodalVisible] = React.useState(false);
  const [selectedReview, setSelectedReview] = useState("");
  const [filterIdx, setFilterIdx] = useState(0);

  const business = React.useContext(BusinessContext);
  const reviews = useAppSelector(selectReviewsByBusiness(business.id));
  const users = useAppSelector(selectAllUsers);
  const clientId = useAppSelector(selectUser)!.id;
  const selectedStyle = { ...styles.filter, ...styles.selectedFilter };

  return (
    <SafeAreaView style={{ flexDirection: "row", flex: 1 }}>
      <Margin />
      <View style={{ flex: 10 }}>
        <ReviewModal
          visible={modalVisible}
          modalVisibilitySetter={setmodalVisible}
          reviewID={selectedReview}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <BackButton action={navigation.goBack} />
        </View>
        <BizReviewHeader businessID={business.id} />
        <Line />
        <Text style={styles.sortBy}> Sort By</Text>
        <View style={styles.filterWrapper}>
          {filters.map((f, idx) => (
            <Pressable
              style={filterIdx === idx ? selectedStyle : styles.filter}
              onPress={() => setFilterIdx(idx)}
              key={f.name}
            >
              <Text>{f.name}</Text>
            </Pressable>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              contentContainerStyle={{
                paddingTop: 40,
                paddingLeft: 12,
                paddingRight: 12,
              }}
              data={reviews.sort(filters[filterIdx].filter)}
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
              ListFooterComponent={
                <LargeButton
                  action={() =>
                    navigation.navigate("CreateEditReview", {
                      busID: business.id,
                    })
                  }
                  label="Write a Review"
                />
              }
            />
          </View>
        </View>
      </View>
      <Margin />
    </SafeAreaView>
  );
}

export default BizReviewPage;
