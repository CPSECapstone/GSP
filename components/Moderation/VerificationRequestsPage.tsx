import React from "react";
import { FlatList, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { VerificationRequestProps } from "../../route-settings";
import selectAllRequests from "../../redux/selectors/verification";
import VerificationRequest from "./VerificationRequest";
import { deleteRequestRedux } from "../../redux/slices/verification";
import { selectAllBusinesses } from "../../redux/selectors/business";
import { Business } from "../../src/API";
import { selectUser } from "../../redux/selectors/user";
import { updateBusinessRedux } from "../../redux/slices/business";
import {
  performModeratingAction,
  removeVerificationRequest,
} from "./VerificationAPI";

// eslint-disable-next-line
function VerificationRequests({ route, navigation }: VerificationRequestProps) {
  const requests = useAppSelector(selectAllRequests);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const businesses = useAppSelector(selectAllBusinesses);

  const deleteFromRedux = (id: string) => {
    dispatch(deleteRequestRedux(id));
  };

  const updateBusinessInRedux = (bus: Business) => {
    dispatch(updateBusinessRedux(bus));
  };

  const respondToRequest = async (
    approved: boolean,
    id: string,
    businessID: string
  ) => {
    const business = businesses.filter((b) => b?.id === businessID)[0];

    if (business) {
      removeVerificationRequest(id, deleteFromRedux);
      performModeratingAction(
        business!.name,
        business!.userID,
        currentUser!.id,
        business!.id,
        approved,
        updateBusinessInRedux
      );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      {requests.length > 0 ? (
        <FlatList
          style={{ width: "100" }}
          contentContainerStyle={{ flex: 1, marginTop: 25 }}
          data={requests}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <VerificationRequest
              itemID={item?.id!}
              responseFunction={respondToRequest}
              businessID={item?.businessID!}
            />
          )}
        />
      ) : (
        <Text
          style={{
            color: "#7300ff",
            fontFamily: "Mada-Regular",
            fontSize: 24,
            textAlign: "center",
          }}
        >
          No requests to display
        </Text>
      )}
    </View>
  );
}

export default VerificationRequests;
