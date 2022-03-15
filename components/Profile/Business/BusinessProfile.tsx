/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { S3ImageBackground, S3Image } from "../../Misc/S3Util";
import BusinessProfileModal from "../../OwnershipTransfer/BusinessProfileModal";
import { Business } from "../../../src/API";

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

function Star() {
  return (
    <Ionicons
      name="star"
      style={{ marginRight: 2 }}
      size={22}
      color="#DA5125"
    />
  );
}

function StarOutline() {
  return (
    <Ionicons
      name="star-outline"
      style={{ marginRight: 5 }}
      size={22}
      color="#DA5125"
    />
  );
}

function Tags({ tags }: { tags: string[] }) {
  let tagList = "";
  // eslint-disable-next-line no-return-assign
  tags.forEach((tag) => (tagList += `${tag} • `));
  tagList = tagList.substring(0, tagList.length - 3);
  return <Text style={styles.tags}>{tagList}</Text>;
}

async function call(phoneNumber: string) {
  alert(phoneNumber);
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

type BusinessProfileProps = { business: Business; edit: () => void };
export default function BusinessProfile({
  business,
  edit,
}: BusinessProfileProps) {
  const [modalVisible, setmodalVisible] = React.useState(false);
  const navigation = useNavigation();

  return (
    <View>
      <BusinessProfileModal
        title={business.name}
        ownerID="aee0f25e-0c09-4878-b73d-096f3d927b75"
        visible={modalVisible}
        modalVisibilitySetter={setmodalVisible}
      />
      <S3ImageBackground
        S3key={`${business.id}/banner`}
        style={styles.banner}
      />
      <View
        style={[styles.darkness, { borderBottomColor: business.primarycolor }]}
      />
      <View style={{ flexDirection: "row", position: "absolute" }}>
        <Margin />
        <View style={{ flex: 10 }}>
          <View style={styles.header}>
            <Pressable style={styles.back} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={30} color="white" />
            </Pressable>
            <Pressable style={styles.save} onPress={edit}>
              <Ionicons name="bookmark-outline" size={25} color="white" />
            </Pressable>
            <Pressable
              style={styles.share}
              onPress={() => setmodalVisible(true)}
            >
              <SimpleLineIcons name="options" size={25} color="white" />
            </Pressable>
            <S3Image
              style={[styles.avatar, { borderColor: business.primarycolor }]}
              S3key={`${business.id}/profile`}
            />
            {/* <Image
                source={{uri: business.profileImage}}
                style={[
                  styles.avatar,
                  { borderColor: business.primarycolor },
                ]}
              /> */}
            <Text style={styles.title}>{business.name}</Text>
            <Text style={styles.details}>{`${business.type} • 3mi`}</Text>
          </View>
          <View style={styles.body}>
            <Tags tags={business.tags as string[]} />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <CircleButton
                icon="call"
                title="Call"
                action={() => call(business.phone)}
                color={business.primarycolor}
              />
              <Margin />
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
              <Margin />
              <CircleButton
                icon="open"
                title="Site"
                action={() => openUrl(business.website!.toString())}
                color={business.primarycolor}
              />
              <Margin />
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
                  action={() => {}}
                  color={business.primarycolor}
                />
              )}
            </View>

            <Line />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Star />
              <Star />
              <Star />
              <Star />
              <StarOutline />
              <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
                {" "}
                • 4.3 Stars • 62 Reviews
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[
                  styles.ratingButton,
                  {
                    backgroundColor: business.secondarycolor,
                    marginRight: 10,
                  },
                ]}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  Write a Review
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.ratingButton,
                  { backgroundColor: business.secondarycolor, marginLeft: 10 },
                ]}
                onPress={() =>
                  navigation.navigate("BizReviewPage", {
                    busID: "90c44163-3c82-4d91-8010-41a75a666670",
                  })
                }
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
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
    </View>
  );
}

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
  save: {
    marginBottom: 10,
    alignSelf: "flex-end",
    position: "absolute",
    marginTop: 40,
    marginRight: -10,
  },
  share: {
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
    width: "100%",
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
    marginRight: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
