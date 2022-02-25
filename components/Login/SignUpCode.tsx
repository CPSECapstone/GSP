import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Auth } from "aws-amplify";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RootStackParamList } from "../../route-settings";
import LargeButton from "../Misc/LargeButton";
import CleanInput from "./CleanInput";

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  prompt: {
    paddingTop: height / 2,
    paddingBottom: 100,
  },
});

type SignUpCodeProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateAccountCode"
>;

function SignUpCode({ navigation, route }: SignUpCodeProps) {
  const { email } = route.params;
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const submitCode = async () => {
    try {
      await Auth.confirmSignUp(email, code);
      navigation.navigate("App");
    } catch {
      setCodeError("Invalid Code");
    }
  };

  return (
    <KeyboardAwareScrollView scrollEnabled={false} extraHeight={100}>
      <View style={styles.wrapper}>
        <Text style={styles.prompt}>Please input the code sent to {email}</Text>
        <CleanInput
          label="Confirmation Code"
          textContentType="oneTimeCode"
          keyboardType="numeric"
          setState={setCode}
          value={code}
          errorMsg={codeError}
        />
        <LargeButton label="Submit" action={submitCode} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default SignUpCode;
