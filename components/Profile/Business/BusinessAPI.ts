/* eslint-disable @typescript-eslint/no-use-before-define */
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createBusiness, updateBusiness } from "../../../src/graphql/mutations";
import { Business } from "../../../src/API";
import { useAppSelector } from "../../../redux/hooks";
import selectUser from "../../../redux/selectors/user";

export default class BusinessAPI {
  static async create(business: Business) {
    const user = useAppSelector(selectUser);

    const businessObj = { ...business, email: user.email, userID: user.id };

    return API.graphql(
      graphqlOperation(createBusiness, { input: businessObj })
    );
  }

  static async update(
    business: Partial<Business>,
    profileImage?: string,
    bannerImage?: string
  ) {
    if (profileImage) {
      await S3ImageUpload(profileImage, business.id!, "profile");
    }
    if (bannerImage) {
      await S3ImageUpload(bannerImage, business.id!, "banner");
    }

    return API.graphql({
      query: updateBusiness,
      variables: { input: business },
    });
  }

  // static async delete(business: Business) {
  //   const businessDetails = {
  //     id: business.id,
  //   };
  //   return API.graphql({
  //     query: deleteBusiness,
  //     variables: { input: businessDetails },
  //   });
  // }
}

async function S3ImageUpload(
  file: string,
  businessId: string,
  type: "profile" | "banner"
) {
  const photo = await fetch(file);
  const photoBlob = await photo.blob();

  return Storage.put(`${businessId}/${type}`, photoBlob, {
    level: "public",
  });
}
