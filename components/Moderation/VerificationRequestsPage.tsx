import React from "react";
import { FlatList, Text, View } from "react-native";
import { API } from "aws-amplify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { VerificationRequestProps } from "../../route-settings";
import selectAllRequests from "../../redux/selectors/verification";
import VerificationRequest from "./VerificationRequest";
import { deleteRequestRedux } from "../../redux/slices/verification";
import {
  createNotification,
  deleteVerificationRequest,
  updateBusiness,
} from "../../src/graphql/mutations";
import { selectAllBusinesses } from "../../redux/selectors/business";
import { NotificationType } from "../../src/API";
import { selectUser } from "../../redux/selectors/user";

// eslint-disable-next-line
function VerificationRequests({ route, navigation }: VerificationRequestProps) {
  const requests = useAppSelector(selectAllRequests);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const businesses = useAppSelector(selectAllBusinesses);

  const respondToRequest = async (
    approved: boolean,
    id: string,
    businessID: string
  ) => {
    const business = businesses.filter((b) => b?.id === businessID)[0];
    // 1. remove request from redux and asynchronously
    dispatch(deleteRequestRedux(id));

    const details = {
      id,
    };

    await API.graphql({
      query: deleteVerificationRequest,
      variables: { input: details },
    });

    // 2. push new notification with appropriate inputs
    const approveNotif = {
      message: `Your verification request for ${business?.name} was ${
        approved ? "approved." : "rejected."
      }.`,
      userID: business?.userID,
      type: NotificationType.OWNERSHIPAPPROVED,
      Sender: currentUser?.id,
      title: "Business Verification",
      businessRequestID: business?.id,
    };

    const businessUpdate = {
      id: business?.id,
      isVerified: !!approved,
    };

    await API.graphql({
      query: updateBusiness,
      variables: { input: businessUpdate },
    });

    await API.graphql({
      query: createNotification,
      variables: { input: approveNotif },
    });
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
