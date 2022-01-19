import React, { useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import CleanInput from "./CleanInput";
import Header from "../components/Header";

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    paddingTop: 100,
    paddingBottom: 150,
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

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const submit = () => {
    if (password === confirmPassword) {
      setPasswordError("");
      console.log({ name, email, password });
    } else {
      setPasswordError("Passwords must match");
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header>Create an Account</Header>
      <Feather style={styles.icon} name="user" size={150} />
      <CleanInput label="Name" textContentType="name" setState={setName} />
      <CleanInput
        label="Email Address"
        textContentType="emailAddress"
        setState={setEmail}
      />
      <CleanInput
        label="Password"
        textContentType="password"
        setState={setPassword}
        secureTextEntry
      />
      <CleanInput
        label="Confirm Password"
        textContentType="password"
        setState={setConfirmPassword}
        secureTextEntry
      />
      {!!passwordError && <Text style={styles.error}>{passwordError}</Text>}
      <Button title="Submit" onPress={submit}>
        Submit
      </Button>
    </View>
  );
}

export default SignUp;
