/* eslint-disable @typescript-eslint/no-use-before-define */
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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppSelector } from "../../redux/hooks";
import { selectAllBusinesses } from "../../redux/selectors/business";
import SearchBar from "../SearchBar/SearchBar";
import Map from "./Map";
import { Business } from "../../src/API";
import { minoritygroups } from "../../constants/exploredata";
import ResultsTab from "./ResultsTab";
import BusinessCard from "../BusinessCard/BusinessCard";
import { returnMinorityGroupValue } from "../../api";
import WithBusinessView from "../Profile/Business/WithBusinessView";

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
  },
  minoritycelltitle: {
    fontFamily: "Mada-Medium",
    fontSize: 12,
    textAlign: "center",
  },
  resultCard: {
    position: "absolute",
    bottom: "1%",
  },
});

export default function HomePage() {
  return <WithBusinessView Component={HomeView} />;
}

type HomeProps = NativeStackScreenProps<
  { BusinessView: { id: string }; Component: undefined },
  "Component"
>;
function HomeView({ navigation }: HomeProps) {
  const allBusinesses = useAppSelector(selectAllBusinesses);

  const [selectedMinorityGroups, setselectedMinorityGroups] = useState([0]);
  const [resultBusinesses, setResultBusinesses] = useState(allBusinesses);
  const [openModal, setopenModal] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [selectedBusiness, setselectedBusiness] = useState(allBusinesses);
  const [coordinate, setcoordinate] = useState([]);
  const [findText, setfindText] = useState(" ");

  const submitEdit = () => {
    setopenModal(true);
    setselectedBusiness([]);
    setcoordinate([]);
    setfindText(searchText);
  };

  let minorityGroupsByName: string[] = [];

  React.useEffect(() => {
    minorityGroupsByName = [];
    selectedMinorityGroups.forEach((index) => {
      minorityGroupsByName.push(minoritygroups[index].title);
    });
  }, [selectedMinorityGroups]);

  React.useEffect(() => {
    const tagBusiness: Business[] = [];
    allBusinesses.forEach((business) => {
      business?.tags?.every((tag) => {
        if (
          tag != null &&
          (minorityGroupsByName.includes(returnMinorityGroupValue(tag)) ||
            minorityGroupsByName.includes("All") ||
            minorityGroupsByName.length === 0)
        ) {
          tagBusiness.push(business);
          return false;
        }
        return true;
      });
    });
    const resBusiness: Business[] = [];
    tagBusiness.forEach((business) => {
      if (business != null) {
        const businessFields = [
          business?.address,
          business?.city,
          business?.name,
          business?.state,
          business?.type,
          String(business?.zipcode),
        ];
        if (
          businessFields.some((b) => b.includes(findText)) ||
          business?.tags?.some((b) => b.includes(findText))
        ) {
          resBusiness.push(business);
        }
      }
    });
    setResultBusinesses(resBusiness);
  }, [findText, selectedMinorityGroups]);

  return (
    <View style={styles.container}>
      <Map
        coordinate={coordinate}
        length={coordinate.length}
        name={
          selectedBusiness[0] == null ? "Not found" : selectedBusiness[0].name
        }
      />
      <SearchBar
        searchText={searchText}
        setsearchText={setsearchText}
        submitEdit={submitEdit}
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
              } else if (selectedMinorityGroups.includes(index)) {
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
      {selectedBusiness.length === 1 ? (
        <View style={styles.resultCard}>
          <Pressable
            onPress={() =>
              navigation.navigate("BusinessView", {
                id: selectedBusiness[0]!.id,
              })
            }
          >
            <BusinessCard
              id={selectedBusiness[0]!.id}
              name={selectedBusiness[0]!.name}
              distance="4"
              rating={String(selectedBusiness[0]!.rating)}
            />
          </Pressable>
        </View>
      ) : (
        <View />
      )}
      {openModal && (
        <ResultsTab
          onDismiss={() => setopenModal(false)}
          visible
          resultBusinesses={resultBusinesses}
          setselectedBusiness={setselectedBusiness}
          setcoordinates={setcoordinate}
        />
      )}
    </View>
  );
}
