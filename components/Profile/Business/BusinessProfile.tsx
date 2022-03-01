/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";
import { BusinessProps } from "../../../route-settings";
import Business from "./Business";

export const profileData = new Business(
  "Milk In It",
  "Milkinit@gmail.com",
  "Restaurant",
  "#0394FC",
  "#7D9FB8",
  "(805) 645-2301",
  "195 N Santa Rosa St",
  "San Luis Obispo",
  "California",
  93405,
  "https://www.milk-in-it.com/",
  ["Asian-American", "American Fusion", "Family-owned", "Small business"],
  "https://www.milk-in-it.com/uploads/b/815c5b9666f8d1247820b963f62921ff010e53ce81ca60cc0f303331f5d83f1a/Milk%20in%20it_Sticker-01_1586286751.png",
  "https://www.milk-in-it.com/uploads/1/3/1/4/131411053/s823200538205006002_p76_i2_w2077.jpeg",
  "Tea house serving milk tea, boba and more. We use authentic recipes for our tapioca and import the highest quality black, oolong, and green teas. We are a small, locally-owned business with a small team dedicated to making you awesome drinks to brighten your day",
  "https://www.milk-in-it.com/signature"
);

function Margin() {
  return <View style={{ flex: 1 }} />;
}

function CircleButton({
  icon,
  title,
  action,
}: {
  icon: any;
  title: string;
  action: Function;
}) {
  return (
    <View style={styles.circleButtonContainer}>
      <TouchableOpacity onPress={() => action()} style={styles.circleButton}>
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

function Tags() {
  let tagList = "";
  // eslint-disable-next-line no-return-assign
  profileData.tags.forEach((tag) => (tagList += `${tag} • `));
  tagList = tagList.substring(0, tagList.length - 3);
  return <Text style={styles.tags}>{tagList}</Text>;
}

function call(phoneNumber: string) {
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

export default function BusinessProfile({ navigation }: BusinessProps) {
  return (
    <View>
      <ImageBackground
        source={{ uri: profileData.bannerImage }}
        resizeMode="cover"
        style={styles.banner}
      />
      <View style={styles.darkness} />
      <View style={{ flexDirection: "row", position: "absolute" }}>
        <Margin />
        <View style={{ flex: 10 }}>
          <View style={styles.header}>
            <Pressable style={styles.back}>
              <Ionicons name="chevron-back-outline" size={30} color="white" />
            </Pressable>
            <Pressable
              style={styles.save}
              onPress={() => navigation.navigate("ProfileEditor")}
            >
              <Ionicons name="bookmark-outline" size={25} color="white" />
            </Pressable>
            <Image
              style={styles.avatar}
              source={{ uri: profileData.profileImage }}
            />
            <Text style={styles.title}>{profileData.name}</Text>
            <Text style={styles.details}>
              {`${profileData.businessType} • 3mi`}
            </Text>
          </View>
          <View style={styles.body}>
            <Tags />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <CircleButton
                icon="call"
                title="Call"
                action={() => call(profileData.phone)}
              />
              <Margin />
              <CircleButton
                icon="map"
                title="Map"
                action={() =>
                  openMap(
                    profileData.address.address,
                    profileData.address.city,
                    profileData.address.zipcode.toString()
                  )
                }
              />
              <Margin />
              <CircleButton
                icon="open"
                title="Site"
                action={() => openUrl(profileData.website.toString())}
              />
              <Margin />
              {profileData.menu ? (
                <CircleButton
                  icon="restaurant"
                  title="Menu"
                  action={() => openUrl(profileData.menu!)}
                />
              ) : (
                <CircleButton icon="bookmark" title="Save" action={() => {}} />
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
              <Pressable style={[styles.ratingButton, { marginRight: 10 }]}>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  Write a Review
                </Text>
              </Pressable>
              <Pressable
                style={[styles.ratingButton, { marginLeft: 10 }]}
                onPress={() => navigation.navigate("BizReviewPage")}
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
              <Text style={styles.description}>{profileData.aboutUs}</Text>
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
  banner: {
    borderColor: profileData.colorSet.primary,
    height: 300,
    flex: 1,
    justifyContent: "center",
  },
  darkness: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: 300,
    borderBottomWidth: 3,
    borderBottomColor: profileData.colorSet.primary,
  },
  header: {
    height: 300,
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
    backgroundColor: profileData.colorSet.primary,
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
    borderColor: profileData.colorSet.primary,
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
    backgroundColor: profileData.colorSet.secondary,
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
