import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const styles = StyleSheet.create({
  inputWrapper: {
    width: "70%",
  },
  input: {
    borderBottomWidth: 0.5,
    marginBottom: 15,
  },
  inputLabel: {
    color: "#939395",
    fontWeight: "bold",
    paddingBottom: 10,
  },
});

interface CleanInputProps {
  label: String;
  secureTextEntry?: boolean;
  textContentType: React.ComponentProps<typeof TextInput>["textContentType"];
  setState: React.Dispatch<React.SetStateAction<string>>;
}

function CleanInput({
  label,
  textContentType,
  secureTextEntry,
  setState,
}: CleanInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        onChangeText={setState}
      />
    </View>
  );
}

CleanInput.defaultProps = {
  secureTextEntry: false,
};

export default CleanInput;
