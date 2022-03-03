import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";
import LargeButton from "../Misc/LargeButton";
import { ForgotPass2Props } from "../../route-settings";
import InverseLargeButton from "../Misc/InverseLargeButton";
import CleanInput from "./CleanInput";

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
    marginTop: 50,
    marginBottom: 100,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 150,
  },
  error: {
    color: "red",
    textAlign: "left",
    width: "70%",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: -11,
  },
  success: {
    color: "green",
    textAlign: "left",
    width: "70%",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: -11,
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
  },
});

function ForgotPass2({ navigation, route }: ForgotPass2Props) {
  const { email } = route.params;

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [resetPassSuccess, setResetPassSuccess] = useState(false);

  const validateCode = () => {
    if (!code) {
      setCodeError("Code is required");
    } else {
      setCodeError("");
    }
    return code;
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
    validateCode() && validatePassword() && validateConfirmPassword();

  const resetPass = async () => {
    if (validateAll()) {
      try {
        await Auth.forgotPasswordSubmit(email, code, password);
        setResetPassSuccess(true);
      } catch (error) {
        setConfirmPasswordError("Failed to reset password");
      }
    }
  };

  return (
    <View>
      {/* TODO: Fill this space with an image */}

      <Text
        style={{
          marginTop: 225,
          marginBottom: 20,
          alignSelf: "center",
          color: "#B1B1B3",
        }}
      >
        The code has been sent to {email}
      </Text>

      <View style={forgotPassStyle.inputWrapper}>
        <CleanInput
          label="Code"
          textContentType="oneTimeCode"
          keyboardType="numeric"
          setState={setCode}
          value={code}
          errorMsg={codeError}
        />
        <CleanInput
          label="New Password"
          textContentType="password"
          setState={setPassword}
          secureTextEntry
          value={password}
          errorMsg={passwordError}
        />
        <CleanInput
          label="Confirm New Password"
          textContentType="password"
          setState={setConfirmPassword}
          secureTextEntry
          value={confirmPassword}
          errorMsg={confirmPasswordError}
        />
        {resetPassSuccess && (
          <Text style={forgotPassStyle.success}>
            Password successfully reset!
          </Text>
        )}
      </View>

      <View style={forgotPassStyle.container}>
        <View style={{ paddingBottom: 20, paddingTop: 50 }}>
          <InverseLargeButton label="Reset password" action={resetPass} />
        </View>
        <LargeButton label="Done" action={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}

export default ForgotPass2;
