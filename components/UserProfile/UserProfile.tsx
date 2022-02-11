import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import UserProfileCell from "./UserProfileCell";
import BackButton from "./BackButton";
import { UserProfileProps } from "../../route-settings";

const profileData = {
  name: "Marvis Ighedosa",
  profileImage: {
    uri: "https://kodaandcrushmarketing.com/wp-content/uploads/2020/11/ToyFaces_Colored_BG_32-7QFYBYH-768x768.jpg",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myProfileText: {
    fontSize: 28,
    paddingLeft: "8.5%",
    fontFamily: "Mada-Bold",
    paddingTop: "2%",
  },
  profileImage: {
    width: "25%",
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 4,
    alignSelf: "center",
    marginTop: "6%",
    marginBottom: "4%",
    borderColor: "#F5F5F8",
    backgroundColor: "black",
  },
  name: {
    fontFamily: "Mada-SemiBold",
    fontSize: 18,
    alignSelf: "center",
    paddingBottom: "5%",
  },
  cells: {
    flexDirection: "column",
    alignContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 5,
  },
  logout: {
    fontFamily: "Mada-SemiBold",
    fontSize: 18,
    padding: 10,
    color: "#FA4A0C",
  },
  logoutCell: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginVertical: 10,
    width: "80%",
  },
});

function LogoutCell() {
  return (
    <Pressable
      onPress={() => {
        console.log("Logout");
      }}
    >
      <View style={[styles.logoutCell, styles.shadow]}>
        <Text style={styles.logout}>Log Out</Text>
      </View>
    </Pressable>
  );
}

export default function UserProfile({ navigation }: UserProfileProps) {
  return (
    <View style={styles.container}>
      <BackButton action={() => navigation.goBack()} />
      <Text style={styles.myProfileText}>My Profile</Text>
      <Image style={styles.profileImage} source={profileData.profileImage} />
      <Text style={styles.name}>{profileData.name}</Text>
      <View style={styles.cells}>
        <UserProfileCell
          action={() => navigation.navigate("ReviewPage")}
          title="My Reviews"
        />
        <UserProfileCell
          action={() => console.log("Edit Profile")}
          title="Edit Profile"
        />
        <UserProfileCell
          action={() => console.log("Notifications")}
          title="Notifications"
        />
        <LogoutCell />
      </View>
    </View>
  );
}
