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
});

interface CleanInputProps {
  label: String;
  secureTextEntry?: boolean;
  textContentType: React.ComponentProps<typeof TextInput>["textContentType"];
  placeholder?: string | undefined;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

function CleanInput({
  label,
  textContentType,
  secureTextEntry,
  placeholder,
  setState,
}: CleanInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChangeText={setState}
      />
    </View>
  );
}

CleanInput.defaultProps = {
  secureTextEntry: false,
  placeholder: undefined,
};

export default CleanInput;
