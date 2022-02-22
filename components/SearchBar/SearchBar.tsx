import React, { useState } from "react";
import { SearchBar as SearchBarProp } from "react-native-elements";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchbar: {
    position: "absolute",
    top: "5%",
    alignItems: "center",
  },
  container: {
    backgroundColor: "transparent",
    width: "90%",
  },
  input: {
    borderRadius: 20,
    backgroundColor: "#EBEBEB",
  },
});

function SearchBar() {
  const [searchText, setSearchText] = useState("");

  const updateSearch = (search: React.SetStateAction<string>) => {
    setSearchText(search);
  };

  return (
    <View style={styles.searchbar}>
      <SearchBarProp
        placeholder="Search"
        containerStyle={styles.container}
        inputContainerStyle={styles.input}
        onChangeText={updateSearch}
        value={searchText}
        platform="ios"
      />
    </View>
  );
}

export default SearchBar;
