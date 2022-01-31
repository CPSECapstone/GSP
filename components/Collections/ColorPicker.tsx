import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";

const styles = StyleSheet.create({
  rowview: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  colorcircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    marginHorizontal: 7.5,
  },
});

const colors = [
  "#B27129",
  "#202020",
  "#FA4A0C",
  "#FFE600",
  "#0085FF",
  "#8F00FF",
];

interface ColorPickerProps {
  updateColor: Function;
}

function ColorPicker(props: ColorPickerProps) {
  const { updateColor } = props;

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    updateColor(colors[selectedIndex]);
  }, [selectedIndex]);

  return (
    <View style={styles.rowview}>
      <FlatList
        horizontal
        contentContainerStyle={{ margin: 10 }}
        renderItem={({ index }) => (
          <Pressable
            onPress={() => setSelectedIndex(index)}
            style={[styles.colorcircle, { backgroundColor: colors[index] }]}
          >
            {index === selectedIndex && (
              <AntDesign color="white" name="check" size={24} />
            )}
          </Pressable>
        )}
        keyExtractor={(index) => index}
        data={colors}
      />
    </View>
  );
}

export default ColorPicker;
