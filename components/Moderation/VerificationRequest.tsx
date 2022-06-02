import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { selectBusinessById } from "../../redux/selectors/business";
import { Divider } from "../OwnershipTransfer/OwnershipNotif";

interface VerificationRequestProps {
  businessID: string;
  responseFunction: (approved: boolean, id: string, businessID: string) => {};
  itemID: string;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginVertical: 15,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    justifyContent: "center",
    borderRadius: 30,
    marginHorizontal: 5,
  },
  emptybutton: {
    borderColor: "#7300ff",
    borderWidth: 1,
  },
  buttontext: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
  },
  filledbutton: {
    backgroundColor: "#7300ff",
  },
});

function VerificationRequest({
  businessID,
  responseFunction,
  itemID,
}: VerificationRequestProps) {
  const currentBusiness = useAppSelector(selectBusinessById(businessID));

  return (
    <View style={[styles.container, styles.shadow]}>
      <Text
        style={{
          fontFamily: "Mada-Medium",
          fontSize: 17,
          padding: 5,
          textAlign: "center",
        }}
      >
        {`The business '${currentBusiness?.name}' has requested verification.`}
      </Text>
      <Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Pressable
          style={[styles.button, styles.filledbutton]}
          onPress={() => responseFunction(true, itemID, businessID)}
        >
          <Text style={[styles.buttontext, { color: "white" }]}>Verify</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.emptybutton]}
          onPress={() => responseFunction(false, itemID, businessID)}
        >
          <Text style={[styles.buttontext, { color: "#7300ff" }]}>Decline</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default VerificationRequest;
