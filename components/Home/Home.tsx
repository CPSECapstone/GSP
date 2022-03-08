import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Image,
  Text,
  Dimensions,
} from "react-native";
import { useAppSelector } from "../../redux/hooks";
import selectAllBusinesses from "../../redux/selectors/business";
import SearchBar from "../SearchBar/SearchBar";
import Map from "../Map/Map";
import { Business } from "../../src/API";
import { minoritygroups } from "../../constants/exploredata";
import ResultsTab from "./ResultsTab";
import BusinessCard from "../BusinessCard/BusinessCard";

const width = Dimensions.get("screen").width * 0.3;
const height = Dimensions.get("screen").height * 0.04;
const imgdimensions = Dimensions.get("screen").height * 0.0253;
const minorityGroupCellPadding = Dimensions.get("screen").height * 0.004;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filters: {
    position: "absolute",
    top: "14.5%",
  },
  minoritycellcontainer: {
    borderRadius: 20.35,
    marginHorizontal: 8,
    marginTop: minorityGroupCellPadding,
    width,
    height,
    // minHeight: height,
    // minWidth: width + 10,
    // maxWidth: width + 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",

    borderColor: "#7B7B7C",
  },
  minoritycellimage: {
    width: imgdimensions,
    height: imgdimensions,
    borderRadius: imgdimensions,
    marginLeft: "5%",
    marginRight: "5%",
    // marginTop: 5,
  },
  minoritycelltitle: {
    fontFamily: "Mada-Medium",
    fontSize: 12,
    textAlign: "center",
    // padding: 10,
  },
});

export default function HomePage() {
  const allBusinesses = useAppSelector(selectAllBusinesses);

  const [selectedMinorityGroups, setselectedMinorityGroups] = useState([0]);
  const [resultBusinesses, setResultBusinesses] = useState(allBusinesses);
  const [openModal, setopenModal] = useState(false);
  const [searchText, setsearchText] = useState("");

  const onDismiss = () => {
    setopenModal(false);
  };

  let minorityGroupsByName: string[] = [];

  React.useEffect(() => {
    minorityGroupsByName = [];
    selectedMinorityGroups.forEach((index) => {
      minorityGroupsByName.push(minoritygroups[index].title);
    });
  }, [selectedMinorityGroups]);

  React.useEffect(() => {
    const resBusiness: Business[] = [];
    allBusinesses.forEach((business) => {
      business?.tags?.every((tag) => {
        if (tag != null && minorityGroupsByName.includes(tag)) return true;
        return false;
      });
    });
    setResultBusinesses(resBusiness);
  }, [selectedMinorityGroups]);

  return (
    <View style={styles.container}>
      <Map />
      <SearchBar
        searchText={searchText}
        setsearchText={setsearchText}
        setopenModal={setopenModal}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={minoritygroups}
        contentContainerStyle={{ paddingLeft: "9.5%", height: ".02%" }}
        style={styles.filters}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              if (index === 0 && !selectedMinorityGroups.includes(index)) {
                setselectedMinorityGroups([0]);
              }
              if (selectedMinorityGroups.includes(index)) {
                setselectedMinorityGroups(
                  selectedMinorityGroups.filter(
                    (listitem) => listitem !== index
                  )
                );
              } else {
                setselectedMinorityGroups([...selectedMinorityGroups, index]);
              }
            }}
          >
            <View
              style={[
                styles.minoritycellcontainer,
                { borderWidth: 2, borderColor: "#7b7b7c" },
                selectedMinorityGroups.includes(index) && {
                  borderColor: "#FA4A0C",
                },
              ]}
            >
              <Image style={styles.minoritycellimage} source={item.img} />
              <Text style={styles.minoritycelltitle}>{item.title}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item, index) => item.title + index.toString()}
      />
      {openModal && (
        <ResultsTab onDismiss={onDismiss} visible>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
              padding: 10,
              minHeight: 350,
            }}
          >
            {resultBusinesses.length === 0 ? (
              <Text
                style={{
                  color: "#FA4A0C",
                  fontFamily: "Mada-Regular",
                  fontSize: 24,
                  textAlign: "center",
                }}
              >
                No businesses returned from selected filters.
              </Text>
            ) : (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 25, width: "100%" }}
                data={resultBusinesses}
                renderItem={({ item }) => {
                  if (item?.name !== undefined) {
                    return (
                      <BusinessCard
                        name={item.name}
                        distance={"3"}
                        rating={"4"}
                      />
                    );
                  }
                  return <Text>Something went wrong</Text>;
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        </ResultsTab>
      )}
    </View>
  );
}
