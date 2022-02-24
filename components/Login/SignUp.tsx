import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Auth } from "aws-amplify";
import CleanInput from "./CleanInput";
import { RootStackParamList } from "../../route-settings";
import LargeButton from "../Misc/LargeButton";

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
      try {
        const { user } = await Auth.signUp({
          username: email,
          password,
          attributes: {
            name,
            email,
          },
        });
        console.log(user);
        navigation.navigate("CreateAccountCode", { email });
      } catch {
        setConfirmPasswordError("Failed to create account");
      }
    }
  };

  return (
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
  );
}

SignUp.defaultProps = {
  isMBO: false,
};

export default SignUp;
