import React from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";

type HeaderButtonProps = { title: string; onPress: Function; style: Object };
function HeaderButton({ title, onPress, style }: HeaderButtonProps) {
  return (
    <Pressable onPress={() => onPress()}>
      <Text style={style}>{title}</Text>
    </Pressable>
  );
}

export function ConfigureDoneButton(onPress: Function) {
  return (
    <HeaderButton
      title="Done"
      onPress={onPress}
      style={{ fontWeight: "bold", color: "#DA5125" }}
    />
  );
}

export function ConfigureBackButton(title: string, onPress: Function) {
  return <HeaderButton title={title} onPress={onPress} style={{}} />;
}

export function formatPhone(phone: string) {
  return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(
    6,
    10
  )}`;
}

export function Margin() {
  return <View style={{ flex: 1 }} />;
}

export function Line() {
  return (
    <View
      style={{
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom: 10,
        marginRight: "-10%",
        marginLeft: "-10%",
      }}
    />
  );
}

export function ColorOption({
  color,
  onPress,
  large,
}: {
  color: string;
  onPress: Function;
  large?: boolean;
}) {
  const size = large ? 36 : 30;
  return (
    <Pressable
      style={{ paddingRight: 10, paddingBottom: 10 }}
      onPress={() => onPress()}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 20,
          backgroundColor: color,
        }}
      />
    </Pressable>
  );
}

ColorOption.defaultProps = {
  large: false,
};

export const styles = StyleSheet.create({
  editDetails: {
    fontFamily: "Mada-Regular",
    fontSize: 12,
    color: "#7D7D7D",
  },
  editTitle: {
    fontFamily: "Mada-Bold",
    color: "#7D7D7D",
    marginBottom: 10,
  },
});
