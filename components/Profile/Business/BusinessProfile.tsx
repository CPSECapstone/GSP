/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Animated,
  Alert,
  AlertButton,
  Image,
  ImageBackground,
} from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { getBannerImage, getProfileImage } from "../../Misc/S3Util";
import BusinessProfileModal from "../../OwnershipTransfer/BusinessProfileModal";
import { Business, Collection } from "../../../src/API";
import { AverageRating } from "../../Review/RatingView";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import BusinessAPI from "./BusinessAPI";
import {
  deleteBusiness,
  updateBusinessRedux,
} from "../../../redux/slices/business";
import BusinessEditor from "./BusinessEditor";
import BizReviewPage from "../../Review/BizReviewPage";
import { BProfileStackParamList, BusinessContext } from "./bizDependencies";
import {
  returnBusinessTypeValue,
  returnMinorityGroupValue,
} from "../../../constants/enumconverters";
import { selectUser } from "../../../redux/selectors/user";
import { addRecentBusiness } from "../../Misc/RecentBusinessStore";
import { selectReviewsByBusiness } from "../../../redux/selectors/review";
import selectAllUserCollections from "../../../redux/selectors/collections";
import CollectionAPI from "../../Collections/CollestionsAPI";
import { getDistanceToBusiness } from "../../../constants/location";
import { selectBusinessById } from "../../../redux/selectors/business";
import { API } from "aws-amplify";
import {
  createVerificationRequest,
  updateBusiness,
} from "../../../src/graphql/mutations";
import { MinorityGroups } from "../../../src/models";

const BProfileStack = createNativeStackNavigator<BProfileStackParamList>();

type BusinessProfileProps = { businessID: string };
export default function BusinessProfile({ businessID }: BusinessProfileProps) {
  const dispatch = useAppDispatch();
  const [modalVisible, setmodalVisible] = React.useState(false);
  const backgroundOpactiy = new Animated.Value(1.0);
  const business = useAppSelector(selectBusinessById(businessID))!;
  const currentUser = useAppSelector(selectUser)!;
  const userCollections = useAppSelector(selectAllUserCollections);
  const curReviews = useAppSelector(selectReviewsByBusiness(business.id));
  const [distance, setDistance] = React.useState("");
  const curUserReviewId = curReviews.find(
    (r) => r.userID === currentUser.id
  )?.id;

  React.useEffect(() => {
    addRecentBusiness(business.id);
    getDistanceToBusiness(business).then(setDistance);
    // requestPermission();
  }, []);

  React.useEffect(() => {
    if (modalVisible) {
      Animated.timing(backgroundOpactiy, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(backgroundOpactiy, {
        toValue: 1.0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [modalVisible]);

  const sendVerificationRequest = async () => {
    if (business.verificationPending) {
      Alert.alert(
        "Request Pending",
        "You have already previously sent a verification request."
      );
    } else {
      const requestDetails = {
        businessID: business.id,
        message: "Verification request testing.",
      };

      await API.graphql({
        query: createVerificationRequest,
        variables: { input: requestDetails },
      });

      const busUpdate = { id: business.id, verificationPending: true };

      await API.graphql({
        query: updateBusiness,
        variables: { input: busUpdate },
      });

      Alert.alert(
        "Success",
        "Verification request has been sent to moderators, please be patient while they review your request."
      );
    }
  };

  const updateBusinessCollection = (c: Collection) => {
    CollectionAPI.addBusiness(c!, business).then((response) => {
      dispatch(updateBusinessRedux(response.data.updateBusiness));
    });
  };

  const createSaveAlert = () => {
    const buttons: AlertButton[] = userCollections.map((c) => ({
      text: c?.title,
      onPress: () => updateBusinessCollection(c!),
    }));
    buttons.push({
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    });
    Alert.alert("Save Business", "Select Collection", buttons);
  };

  return (
    <BusinessContext.Provider value={business}>
      <BProfileStack.Navigator
        initialRouteName="BusinessProfile"
        screenOptions={{ headerShown: false }}
      >
        <BProfileStack.Screen
          name="BusinessEditor"
          component={BusinessEditorScreen}
        />
        <BProfileStack.Screen name="Reviews" component={BizReviewPage} />
        <BProfileStack.Screen name="BusinessProfile">
          {({ navigation }) => (
            <Animated.View style={{ opacity: backgroundOpactiy }}>
              <BusinessProfileModal
                title={business.name}
                ownerID={business.userID}
                businessID={business.id}
                visible={modalVisible}
                modalVisibilitySetter={setmodalVisible}
              />
              <ImageBackground
                source={getBannerImage(business)}
                style={styles.banner}
              />
              <View
                style={[
                  styles.darkness,
                  { borderBottomColor: business.primarycolor },
                ]}
              />
              <View style={{ flexDirection: "row", position: "absolute" }}>
                <Margin />
                <View style={{ flex: 10 }}>
                  <View style={styles.header}>
                    <Pressable
                      style={styles.back}
                      onPress={() => navigation.goBack()}
                    >
                      <Ionicons
                        name="chevron-back-outline"
                        size={30}
                        color="white"
                      />
                    </Pressable>
                    {currentUser.id === business.userID && (
                      <Pressable
                        style={styles.edit}
                        onPress={() => navigation.navigate("BusinessEditor")}
                      >
                        <Ionicons name="pencil" size={20} color="white" />
                      </Pressable>
                    )}
                    <Pressable
                      style={styles.more}
                      onPress={() => setmodalVisible(true)}
                    >
                      <SimpleLineIcons name="options" size={25} color="white" />
                    </Pressable>
                    <Image
                      style={[
                        styles.avatar,
                        { borderColor: business.primarycolor },
                      ]}
                      source={getProfileImage(business)}
                    />
                    <Text style={styles.title}>{business.name}</Text>
                    <Text style={styles.details}>{`${returnBusinessTypeValue(
                      business.type
                    )}${distance ? ` • ${distance} mi` : ""}`}</Text>
                  </View>
                  <View style={styles.body}>
                    <Pressable
                      onPress={() => {
                        if (currentUser.id === business.userID) {
                          if (business.isVerified) {
                            Alert.alert(
                              "Verified",
                              "Your business has been verified by moderators!"
                            );
                          } else {
                            Alert.alert(
                              "Unverified",
                              "Your business has not yet been verified by moderators. Would you like to send a request for verification?",
                              [
                                {
                                  text: "Yes",
                                  onPress: () => sendVerificationRequest(),
                                },
                                { text: "No", onPress: () => {} },
                              ]
                            );
                          }
                        } else if (business.isVerified) {
                          Alert.alert(
                            "Verified Business",
                            "This business has been verified by moderators."
                          );
                        } else {
                          Alert.alert(
                            "Unverified Business",
                            "This business has not yet been verified by moderators."
                          );
                        }
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingBottom: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: business.isVerified ? "#31c3f7" : "#99aab0",
                          }}
                        >
                          {business.isVerified ? "Verified" : "Not Verified"}
                        </Text>
                        <MaterialIcons
                          color={business.isVerified ? "#31c3f7" : "#99aab0"}
                          name="verified"
                          size={20}
                        />
                      </View>
                    </Pressable>
                    <Tags tags={business.tags ?? []} />
                    <View style={styles.buttonWrapper}>
                      {business.phone && (
                        <CircleButton
                          icon="call"
                          title="Call"
                          action={() => call(business.phone)}
                          color={business.primarycolor}
                        />
                      )}
                      {business.address && (
                        <CircleButton
                          icon="map"
                          title="Map"
                          action={() =>
                            openMap(
                              business.address,
                              business.city,
                              business.zipcode.toString()
                            )
                          }
                          color={business.primarycolor}
                        />
                      )}
                      {business.website && (
                        <CircleButton
                          icon="open"
                          title="Site"
                          action={() => openUrl(business.website!.toString())}
                          color={business.primarycolor}
                        />
                      )}
                      {business.menu ? (
                        <CircleButton
                          icon="restaurant"
                          title="Menu"
                          action={() => openUrl(business.menu!)}
                          color={business.primarycolor}
                        />
                      ) : (
                        <CircleButton
                          icon="bookmark"
                          title="Save"
                          action={createSaveAlert}
                          color={business.primarycolor}
                        />
                      )}
                    </View>

                    <Line />

                    <AverageRating
                      businessId={business.id}
                      color={business.primarycolor}
                    />

                    <View style={{ flexDirection: "row" }}>
                      <Pressable
                        style={[
                          styles.ratingButton,
                          {
                            backgroundColor: business.secondarycolor,
                            marginRight: 10,
                          },
                        ]}
                        onPress={() =>
                          navigation.navigate("CreateEditReview", {
                            busID: business.id,
                            editReviewId: curUserReviewId,
                          })
                        }
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          {curUserReviewId
                            ? "Edit Your Review"
                            : "Write a Review"}
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          styles.ratingButton,
                          {
                            backgroundColor: business.secondarycolor,
                            marginLeft: 10,
                            alignSelf: "flex-start",
                          },
                        ]}
                        onPress={() =>
                          navigation.navigate("Reviews", { edit: false })
                        }
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          See All Reviews
                        </Text>
                      </Pressable>
                    </View>

                    <Line />

                    <View style={styles.bodyContent}>
                      <Text style={styles.heading}>About Us</Text>
                      <Text style={styles.description}>{business.about}</Text>
                    </View>
                  </View>
                </View>
                <Margin />
              </View>
            </Animated.View>
          )}
        </BProfileStack.Screen>
      </BProfileStack.Navigator>
    </BusinessContext.Provider>
  );
}

type EditorScreenProps = NativeStackScreenProps<
  BProfileStackParamList,
  "BusinessEditor"
>;
function BusinessEditorScreen({ navigation }: EditorScreenProps) {
  const business = React.useContext(BusinessContext);
  const dispatch = useAppDispatch();

  const del = () => {
    BusinessAPI.delete(business.id)
      .then(() => {
        navigation.goBack();
        navigation.goBack();
        dispatch(deleteBusiness(business.id));
      })
      .catch((err) => console.log(err));
  };
  const submit = (edits: Partial<Business>, pImg?: string, bImg?: string) => {
    BusinessAPI.update(edits, pImg, bImg)
      .then((response) => {
        const updatedBusiness = response.data.updateBusiness;
        if (pImg) {
          updatedBusiness.profileImage = null;
        }
        if (bImg) {
          updatedBusiness.bannerImage = null;
        }
        dispatch(updateBusinessRedux(updatedBusiness));
        navigation.navigate("BusinessProfile", { rerender: true });
      })
      .catch((err) => console.log(err));
  };
  return <BusinessEditor business={business} submit={submit} del={del} />;
}

function Margin() {
  return <View style={{ flex: 1 }} />;
}

type CircleButtonProps = {
  icon: any;
  title: string;
  action: Function;
  color: string;
};

function CircleButton({ icon, title, action, color }: CircleButtonProps) {
  return (
    <View style={styles.circleButtonContainer}>
      <TouchableOpacity
        onPress={() => action()}
        style={[styles.circleButton, { backgroundColor: color }]}
      >
        <Ionicons name={icon} size={20} color="white" />
      </TouchableOpacity>
      <Text style={styles.circleButtonText}>{title}</Text>
    </View>
  );
}

function Line() {
  return (
    <View
      style={{
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1.5,
        marginTop: 30,
        marginBottom: 20,
        marginRight: "-10%",
        marginLeft: "-10%",
      }}
    />
  );
}

function Tags({ tags }: { tags: MinorityGroups[] }) {
  let tagList = "";
  // eslint-disable-next-line no-return-assign
  tags.forEach((tag) => (tagList += `${returnMinorityGroupValue(tag)} • `));
  tagList = tagList.substring(0, tagList.length - 3);
  return <Text style={styles.tags}>{tagList}</Text>;
}

async function call(phoneNumber: string) {
  Linking.openURL(`tel:${phoneNumber}`);
}

const openUrl = async (link: string) => {
  try {
    const supported = await Linking.canOpenURL(link);

    if (supported) Linking.openURL(link);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const openMap = async (address: string, city: string, zipCode: string) => {
  const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`);
  const provider = Platform.OS === "ios" ? "apple" : "google";
  const link = `http://maps.${provider}.com/?daddr=${destination}`;

  openUrl(link);
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    bottom: 40,
  },
  details: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    bottom: 15,
  },
  back: {
    marginBottom: 10,
    alignSelf: "flex-start",
    position: "absolute",
    marginTop: 40,
    marginLeft: -10,
  },
  more: {
    marginBottom: 10,
    alignSelf: "flex-end",
    position: "absolute",
    marginTop: 40,
    marginRight: -10,
  },
  edit: {
    marginBottom: 10,
    alignSelf: "flex-end",
    position: "absolute",
    marginTop: 40,
    right: 35,
  },
  banner: {
    height: 320,
    flex: 1,
    justifyContent: "center",
  },
  darkness: {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: 320,
    borderBottomWidth: 3,
  },
  header: {
    height: 320,
  },
  tags: {
    fontSize: 12,
    fontWeight: "bold",
    color: "grey",
  },
  circleButtonContainer: {
    alignItems: "center",
    flex: 1,
  },
  circleButton: {
    width: 60,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  circleButtonText: {
    paddingTop: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "grey",
  },
  avatar: {
    width: "50%",
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 4,
    alignSelf: "center",
    marginTop: 60,
    backgroundColor: "black",
  },
  body: {
    marginTop: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
  },
  bodyContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  heading: {
    fontSize: 18,
    justifyContent: "flex-start",
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 12,
    color: "#696969",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  ratingButton: {
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
