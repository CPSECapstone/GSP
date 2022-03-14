import React from "react";
import { SearchBar as SearchBarProp } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { Business } from "../../src/API";

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

interface SearchBarProps {
  searchText: string;
  setsearchText: React.Dispatch<React.SetStateAction<string>>;
  setopenModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitEdit: () => void;
}

function SearchBar({
  searchText,
  setsearchText,
  setopenModal,
  submitEdit,
}: SearchBarProps) {
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
