import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfileProps } from "../../../route-settings";
import UserProfileCell from "./UserProfileCell";
import BackButton from "./BackButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/selectors/user";
import notifications from "../../../redux/thunks/notifications";
import defaultUser from "../../../constants/defaultData";
import { setUser } from "../../../redux/slices/user";

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
    color: "#7300ff",
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
    <View style={[styles.logoutCell, styles.shadow]}>
      <Text style={styles.logout}>Log Out</Text>
    </View>
  );
}

export default function UserProfile({ navigation }: UserProfileProps) {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  if (user?.id !== undefined) {
    dispatch(notifications.fetchNotifications(user?.id));
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton action={() => navigation.goBack()} />
      <Image
        style={styles.profileImage}
        source={{ uri: user?.profilePic ?? defaultUser.profilePic }}
      />
      <Text style={styles.name}>{user?.name ?? defaultUser.name}</Text>
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
          action={() => navigation.navigate("Notifications")}
          title="Notifications"
        />
        {user!.isModerator && (
          <UserProfileCell
            action={() => navigation.navigate("Moderation")}
            title="Moderation"
          />
        )}
        <Pressable
          onPress={async () => {
            try {
              await Auth.signOut();
              dispatch(setUser(undefined));
              navigation.navigate("Login");
            } catch (error) {
              console.error("error signing out: ", error);
            }
          }}
        >
          <LogoutCell />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
