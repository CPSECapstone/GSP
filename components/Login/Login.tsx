import React, { useState } from "react";
import { Text, Image, StyleSheet, Pressable, View } from "react-native";
import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginProps } from "../../route-settings";
import LargeButton from "../Misc/LargeButton";
import CleanInput from "./CleanInput";

const avatarImg = require("../../assets/default-avatar.jpeg");

export const styles = StyleSheet.create({
  login: {
    fontSize: 34,
    marginLeft: 50,
    marginBottom: 25,
    fontFamily: "Mada-Bold",
  },

  account: {
    width: 150,
    height: 150,
    marginTop: 10,
    alignSelf: "center",
  },

  email: {
    marginTop: 10,
    paddingBottom: 5,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },

  password: {
    marginTop: 10,
    marginBottom: 50,
    paddingBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  emailText: {
    fontSize: 15,
    paddingTop: 50,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: "bold",
    color: "#B1B1B3",
  },
  passwordText: {
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: "bold",
    color: "#B1B1B3",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 40,
  },

  userInfo: {
    marginTop: 100,
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

function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  Auth.currentSession()
    .then(() => navigation.navigate("App"))
    .catch(() => {}); // suppress unhandled Promise warning

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

  const authenticate = async () => {
    if (validateEmail() && validatePassword()) {
      try {
        await Auth.signIn(email, password);
        setEmail("");
        setPassword("");
        navigation.navigate("App");
      } catch (error) {
        console.error(error);
        setPasswordError("Invalid email or password");
      }
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.login}>Log In</Text>
      <View style={styles.userInfo}>
        <Image source={avatarImg} style={styles.account} />
        <View style={styles.inputWrapper}>
          <CleanInput
            label="Email Address"
            placeholder="Enter your email"
            textContentType="emailAddress"
            setState={setEmail}
            value={email}
            errorMsg={emailError}
          />
          <CleanInput
            label="Password"
            placeholder="Enter your password"
            textContentType="password"
            setState={setPassword}
            secureTextEntry
            value={password}
            errorMsg={passwordError}
          />
        </View>

        <Pressable onPress={() => navigation.navigate("ForgotPass")}>
          <Text
            style={{
              color: "rgb(250, 74, 12)",
              paddingBottom: 20,
              marginLeft: 20,
              marginRight: 40,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>
        <LargeButton label="Login" action={authenticate} />

        <Text style={{ marginTop: 20, alignSelf: "center" }}>
          Don&apos;t have an Account?&emsp;
          <Pressable>
            <Text
              style={{
                color: "rgb(250, 74, 12)",
                textDecorationLine: "underline",
              }}
              onPress={() => navigation.navigate("ChooseAccountType")}
            >
              Sign Up
            </Text>
          </Pressable>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Login;
