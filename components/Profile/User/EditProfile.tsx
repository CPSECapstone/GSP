import { StyleSheet, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { EditProfilePageProps } from "../../../route-settings";
import BackButton from "./BackButton";
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/selectors/user";
import defaultUser from "../../../constants/defaultData";
import LargeButton from "../../Misc/LargeButton";

const styles = StyleSheet.create({
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
  title: {
    fontFamily: "Mada-Bold",
    fontSize: 28,
    alignSelf: "center",
  },
  editName: {
    fontFamily: "Mada-SemiBold",
    fontSize: 18,
    alignSelf: "center",
    marginTop: 30,
  },
});

export function EditProfile({ navigation }: EditProfilePageProps) {
  const user = useAppSelector(selectUser);

  return (
    <SafeAreaView>
      <BackButton action={() => navigation.goBack()} />

      <Text style={styles.title}>Edit Profile</Text>
      <Image
        style={styles.profileImage}
        source={{ uri: user?.profilePic ?? defaultUser.profilePic }}
      />

      <Text style={styles.editName}>Edit Profile Name</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderWidth: 3,
          borderColor: "#EDEDED",
          alignSelf: "center",
        }}
      />

      <View style={{ marginTop: 300 }}>
        <LargeButton
          action={() => {
            navigation.goBack();
          }}
          label="Submit"
        />
      </View>
    </SafeAreaView>
  );
}
