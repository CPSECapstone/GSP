import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import { deleteRequestRedux } from "../../redux/slices/verification";
import { deleteVerificationRequest } from "../../src/graphql/mutations";

export async function removeRequest(
  id: string,
  dispatch: ThunkDispatch<{}, undefined, AnyAction>
) {
  dispatch(deleteRequestRedux(id));

  const details = {
    id: id,
  };

  await API.graphql({
    query: deleteVerificationRequest,
    variables: { input: details },
  });
}
