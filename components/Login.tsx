import React from "react";
import {
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  View,
} from "react-native";
import { LoginProps } from "../route-settings";
import LargeButton from "./LargeButton";

const avatarImg = require("../assets/default-avatar.jpeg");

export const styles = StyleSheet.create({
  login: {
    fontSize: 30,
    textAlign: "left",
    marginTop: 60,
    marginLeft: 10,
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

  userInfo: {
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
  },
});

function Login({ navigation }: LoginProps) {
  return (
    <View>
      <Text style={styles.login}>Log In</Text>
      <View style={styles.userInfo}>
        <Image source={avatarImg} style={styles.account} />

        <Text style={styles.emailText}>Email address</Text>
        <TextInput style={styles.email} placeholder="Enter your email" />

        <Text style={styles.passwordText}>Password</Text>
        <TextInput
          secureTextEntry
          style={styles.password}
          placeholder="Enter your password"
        />

        <Pressable onPress={() => navigation.navigate("ForgotPass")}>
          <Text
            style={{
              color: "rgb(250, 74, 12)",
              paddingBottom: 20,
              marginLeft: 20,
              marginRight: 20,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>
        <LargeButton label="Login" action={() => navigation.navigate("App")} />

        <Text style={{ marginTop: 20, alignSelf: "center" }}>
          Don&apos;t have an Account?
          <Pressable>
            <Text
              style={{
                color: "rgb(250, 74, 12)",
                textDecorationLine: "underline",
              }}
            >
              Sign Up
            </Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
}

export default Login;
