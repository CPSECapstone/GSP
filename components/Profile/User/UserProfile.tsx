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
import verification from "../../../redux/thunks/verification";
import { S3Image } from "../../Misc/S3Util";

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

  React.useEffect(() => {
    if (user?.id !== undefined) {
      dispatch(notifications.fetchNotifications(user?.id));
      dispatch(verification.fetchRequests());
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton action={() => navigation.goBack()} />
      {user?.profilePic === "https://aws.amazon.com/s3/" ? (
        <S3Image style={styles.profileImage} S3key={`${user.id}/user`} />
      ) : (
        <Image
          style={styles.profileImage}
          source={{ uri: user?.profilePic ?? defaultUser.profilePic }}
        />
      )}
      <Text style={styles.name}>{user?.name ?? defaultUser.name}</Text>
      <View style={styles.cells}>
        <UserProfileCell
          action={() => navigation.navigate("ReviewPage")}
          title="My Reviews"
        />
        <UserProfileCell
          action={() => navigation.navigate("EditProfile")}
          title="Edit Profile"
        />
        <UserProfileCell
          action={() => navigation.navigate("Notifications")}
          title="Notifications"
        />
        <UserProfileCell
          action={() => navigation.navigate("VerificationRequests")}
          title="Verification Requests"
        />
        <Pressable
          onPress={() => {
            try {
              Auth.signOut();
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
