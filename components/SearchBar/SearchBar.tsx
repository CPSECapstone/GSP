import React from "react";
import { SearchBar as SearchBarProp } from "react-native-elements";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchbar: {
    position: "absolute",
    top: 60,
    alignItems: "center",
  },
  container: {
    backgroundColor: "transparent",
    width: "95%",
  },
  input: {
    borderRadius: 30,
    backgroundColor: "#EBEBEB",
  },
});

interface SearchBarProps {
  searchText: string;
  setsearchText: React.Dispatch<React.SetStateAction<string>>;
  submitEdit: () => void;
}

function SearchBar({ searchText, setsearchText, submitEdit }: SearchBarProps) {
  const updateSearch = (search: React.SetStateAction<string>) => {
    setsearchText(search);
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
        onSubmitEditing={submitEdit}
      />
    </View>
  );
}

export default SearchBar;
