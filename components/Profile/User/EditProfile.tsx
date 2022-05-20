import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { API, graphqlOperation } from "aws-amplify";
import React, { useLayoutEffect, useState } from "react";
import { View, Button, StyleSheet, Image } from "react-native";
import defaultUser from "../../../constants/defaultData";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/selectors/user";
import { updateCurUser } from "../../../redux/slices/user";
import { RootStackParamList } from "../../../route-settings";
import { UpdateUserMutation } from "../../../src/API";
import { updateUser } from "../../../src/graphql/mutations";
import CleanInput from "../../Login/CleanInput";

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    alignItems: "center",
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
});

type UserProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "EditProfile"
>;

export default function EditProfile({ navigation }: UserProfileProps) {
  const user = useAppSelector(selectUser);
  const [name, setName] = useState(user!.name);
  const [address, setAddress] = useState(user?.defaultAddress ?? "");
  const dispatch = useAppDispatch();

  const editUser = async () => {
    const newUser = {
      id: user!.id,
      name,
      defaultAddress: address ?? undefined,
    };
    const backendUser = (await API.graphql(
      graphqlOperation(updateUser, {
        input: newUser,
      })
    )) as { data: UpdateUserMutation };
    if (backendUser.data.updateUser) {
      // @ts-ignore
      dispatch(updateCurUser(backendUser.data.updateUser));
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <Button title="Done" onPress={editUser} />,
    });
  }, [navigation, name, address]);

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.profileImage}
        source={{ uri: user?.profilePic ?? defaultUser.profilePic }}
      />
      <CleanInput
        label="Name"
        textContentType="name"
        setState={setName}
        value={name}
      />
      <CleanInput
        label="Default Address"
        textContentType="fullStreetAddress"
        setState={setAddress}
        value={address}
      />
    </View>
  );
}
