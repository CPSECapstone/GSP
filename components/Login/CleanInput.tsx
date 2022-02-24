import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const styles = StyleSheet.create({
  inputWrapper: {
    width: "70%",
  },
  input: {
    borderBottomWidth: 0.5,
    marginBottom: 20,
  },
  inputLabel: {
    color: "#939395",
    fontWeight: "bold",
    paddingBottom: 15,
  },
  error: {
    color: "red",
    textAlign: "left",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: -11,
  },
});

interface CleanInputProps {
  label: String;
  secureTextEntry?: boolean;
  textContentType: React.ComponentProps<typeof TextInput>["textContentType"];
  keyboardType?: React.ComponentProps<typeof TextInput>["keyboardType"];
  placeholder?: string | undefined;
  errorMsg?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  value: any;
}

function CleanInput({
  label,
  textContentType,
  secureTextEntry,
  keyboardType,
  placeholder,
  errorMsg,
  setState,
  value,
}: CleanInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        onChangeText={setState}
        value={value}
      />
      {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
}

CleanInput.defaultProps = {
  secureTextEntry: false,
  keyboardType: "default",
  placeholder: undefined,
  errorMsg: "",
};

export default CleanInput;
