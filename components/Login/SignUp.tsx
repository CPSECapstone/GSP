import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CleanInput from "./CleanInput";
import { RootStackParamList } from "../../route-settings";
import LargeButton from "../Misc/LargeButton";
import { createUser } from "../../src/graphql/mutations";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slices/user";
import { CreateUserMutation } from "../../src/API";
import fetchUsers from "../../redux/thunks/user";

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    paddingTop: 100,
    paddingBottom: 125,
  },
  error: {
    color: "red",
    textAlign: "left",
    width: "70%",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: -11,
  },
});

type SignUpProps = NativeStackScreenProps<RootStackParamList, "CreateAccount">;

function SignUp({ navigation, route }: SignUpProps) {
  const { isMBO } = route.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const dispatch = useAppDispatch();

  const validateName = () => {
    if (!name) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
    return name;
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
    return email;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
    return password;
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Password is required");
      return false;
    }
    if (confirmPassword.length < 8) {
      setConfirmPasswordError("Password must be 8 characters or more");
      return false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords must match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const validateAll = () =>
    validateName() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword();

  const submit = async () => {
    if (validateAll()) {
      // Create user through authentication
      try {
        await Auth.signUp({
          username: email,
          password,
          attributes: {
            name,
            email,
          },
        });

        // Create user through datastore
        const input = { email, name };
        const res = (await API.graphql(
          graphqlOperation(createUser, { input })
        )) as { data: CreateUserMutation };
        await fetchUsers();
        dispatch(setUser(res?.data?.createUser?.email));

        navigation.navigate("CreateAccountCode", { email });
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "UsernameExistsException"
        ) {
          setConfirmPasswordError("Given email already has an account");
        } else {
          setConfirmPasswordError("Failed to create account");
        }
      }
    }
  };

  return (
    <KeyboardAwareScrollView scrollEnabled={false} extraHeight={100}>
      <View style={styles.wrapper}>
        {isMBO ? (
          <FontAwesome5 style={styles.icon} name="store" size={130} />
        ) : (
          <Feather style={styles.icon} name="user" size={150} />
        )}
        <CleanInput
          label="Name"
          textContentType="name"
          setState={setName}
          value={name}
          errorMsg={nameError}
        />
        <CleanInput
          label="Email Address"
          textContentType="emailAddress"
          setState={setEmail}
          value={email}
          errorMsg={emailError}
        />
        <CleanInput
          label="Password"
          textContentType="password"
          setState={setPassword}
          secureTextEntry
          value={password}
          errorMsg={passwordError}
        />
        <CleanInput
          label="Confirm Password"
          textContentType="password"
          setState={setConfirmPassword}
          secureTextEntry
          value={confirmPassword}
          errorMsg={confirmPasswordError}
        />
        <LargeButton label="Submit" action={submit} />
      </View>
    </KeyboardAwareScrollView>
  );
}

SignUp.defaultProps = {
  isMBO: false,
};

export default SignUp;
