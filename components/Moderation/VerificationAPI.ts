import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { Business, NotificationType } from "../../src/API";
import {
  createNotification,
  deleteVerificationRequest,
  updateBusiness,
} from "../../src/graphql/mutations";

/**
 * Removes a verification request from the database, if it succeeds
 * in doing so, removes it from redux as well.
 * @param requestID The unique ID of the request to remove as a string.
 * @param dispatchCallback Redux dispatch to call to remove a request with a given ID from the redux store.
 */
export async function removeVerificationRequest(
  requestID: string,
  dispatchCallback: (id: string) => void
) {
  const details = {
    id: requestID,
  };

  const deleteResponse = API.graphql({
    query: deleteVerificationRequest,
    variables: { input: details },
  }) as Promise<GraphQLResult<any>>;

  deleteResponse
    .then((response) => {
      dispatchCallback(response.data!.deleteVerificationRequest!.id);
    })
    .catch((error) => {
      console.log(`Error deleting verification request: ${error}`);
    });
}

/**
 * Handles the backend side of a moderator responding to a request for business verification.
 * @param businessName Name of the business
 * @param ownerID ID of the owner
 * @param moderatorID ID of the moderator
 * @param businessID ID of the business
 * @param approved Whether the request for verification was approved (true) or denied (false)
 * @param updateCallback The reducer used to update the business in redux
 */
export async function performModeratingAction(
  businessName: string,
  ownerID: string,
  moderatorID: string,
  businessID: string,
  approved: boolean,
  updateCallback: (input: Business) => void
) {
  const approveNotif = {
    message: `Your verification request for ${businessName} was ${
      approved ? "approved." : "rejected."
    }.`,
    userID: ownerID,
    type: NotificationType.OWNERSHIPAPPROVED,
    Sender: moderatorID,
    title: "Business Verification",
    businessRequestID: businessID,
  };

  const businessUpdate = {
    id: businessID,
    isVerified: approved,
  };

  const busUpdatePromise = API.graphql({
    query: updateBusiness,
    variables: { input: businessUpdate },
  }) as Promise<GraphQLResult<any>>;

  const notifCreatePromise = API.graphql({
    query: createNotification,
    variables: { input: approveNotif },
  }) as Promise<GraphQLResult<any>>;

  busUpdatePromise
    .then((b) => {
      console.log("Business verified");
      updateCallback(b.data.updateBusiness);
      notifCreatePromise
        .then(() => {
          console.log("Response sent to business owner");
        })
        .catch((e) =>
          console.error(
            `Notification could not be sent to business owner: ${e}`
          )
        );
    })
    .catch((e) => console.error(`Business could not be updated: ${e}`));
}
