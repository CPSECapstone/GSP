/* eslint-disable @typescript-eslint/no-use-before-define */
import { API, graphqlOperation, Storage } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  createBusiness,
  deleteBusiness,
  updateBusiness,
} from "../../../src/graphql/mutations";
import { Business } from "../../../src/API";

export default class BusinessAPI {
  static async create(
    business: Partial<Business>,
    profileImage?: string,
    bannerImage?: string
  ) {
    const newBusiness = (await API.graphql(
      graphqlOperation(createBusiness, { input: business })
    )) as GraphQLResult<any>;

    const newBusinessId = newBusiness.data.createBusiness.id;
    if (profileImage) {
      await updateProfileImage(profileImage, newBusinessId);
    }
    if (bannerImage) {
      await updateBannerImage(bannerImage, newBusinessId);
    }
    return newBusiness;

    // return (
    //   API.graphql(
    //     graphqlOperation(createBusiness, { input: business })
    //   ) as Promise<GraphQLResult<any>>
    // ).then((response: GraphQLResult<any>) => {
    //   console.log(response.data.createBusiness);
    //   const newBusinessId = response.data.createBusiness.id;
    //   const uploadProfileImage = profileImage
    //     ? updateProfileImage(profileImage, newBusinessId)
    //     : undefined;
    //   const uploadBannerImage = bannerImage
    //     ? updateBannerImage(bannerImage, newBusinessId)
    //     : undefined;
    //   return Promise.all([uploadProfileImage, uploadBannerImage]).then(
    //     () => response
    //   );
    // });
  }

  static async update(
    business: Partial<Business>,
    profileImage?: string,
    bannerImage?: string
  ) {
    if (profileImage) {
      await updateProfileImage(profileImage, business.id!);
    }
    if (bannerImage) {
      await updateBannerImage(bannerImage, business.id!);
    }

    return API.graphql({
      query: updateBusiness,
      variables: { input: business },
    });
  }

  static async delete(id: string) {
    const businessDetails = {
      id,
    };
    return API.graphql({
      query: deleteBusiness,
      variables: { input: businessDetails },
    });
  }
}

async function updateProfileImage(file: string, businessId: string) {
  return S3ImageUpload(file, `${businessId}/profile`);
}

async function updateBannerImage(file: string, businessId: string) {
  return S3ImageUpload(file, `${businessId}/banner`);
}

export async function S3ImageUpload(file: string, name: string) {
  const photo = await fetch(file);
  const photoBlob = await photo.blob();

  return Storage.put(name, photoBlob, {
    level: "public",
  });
}
