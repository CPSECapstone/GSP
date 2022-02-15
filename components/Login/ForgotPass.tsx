import React, { useState } from "react";
import { View, Pressable, Text, Image, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";
import LargeButton from "../Misc/LargeButton";
import { ForgotPassProps } from "../../route-settings";
import CleanInput from "./CleanInput";
import { styles } from "./Login";

const sourceImage = require("../../assets/default-avatar.jpeg");

const forgotPassStyle = StyleSheet.create({
  container: {
    marginHorizontal: 50,
    paddingTop: 10,
  },
  back: {
    fontSize: 15,
    fontWeight: "bold",
  },

  forgotPassword: {
    fontSize: 20,
    fontWeight: "bold",
  },
  navbar: {
    borderBottomColor: "#B1B1B3",
    borderBottomWidth: 2,
    marginBottom: 100,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 150,
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
  },
});

function ForgotPass({ navigation }: ForgotPassProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
    return email;
  };

  const resetPass = async () => {
    if (validateEmail()) {
      try {
        await Auth.forgotPassword(email);
        navigation.navigate("ForgotPass2", { email });
      } catch (error) {
        setEmailError("Invalid email");
      }
    }
  };

  return (
    <View>
      <View style={forgotPassStyle.container}>
        <View style={forgotPassStyle.navbar}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={forgotPassStyle.back}>
              Back{" "}
              <Text style={forgotPassStyle.forgotPassword}>
                Forgot Password
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>

      <Image source={sourceImage} style={forgotPassStyle.image} />

      <View style={styles.inputWrapper}>
        <CleanInput
          label="Email address"
          placeholder="Enter your email"
          textContentType="emailAddress"
          setState={setEmail}
          value={email}
          errorMsg={emailError}
        />
      </View>

      <View style={forgotPassStyle.container}>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 20,
            alignSelf: "center",
            color: "#B1B1B3",
          }}
        >
          Enter your email and we will send you a link to reset your password
        </Text>
        <LargeButton label="Reset Password" action={resetPass} />
      </View>
    </View>
  );
}

export default ForgotPass;
