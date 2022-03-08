import { DataStore } from "@aws-amplify/datastore";
import Business from "./Business";
import { Business as BackendBusiness } from "../../../src/models/index";

export default function createBusiness(business: Business) {
  return DataStore.save(
    new BackendBusiness({
      name: business.name,
      about: business.aboutUs,
      phone: business.phone,
      address: business.address.address,
      website: business.website ? business.website : undefined,
      tags: ["tags"],
      type: "Lorem ipsum dolor sit amet",
      primarycolor: business.colorSet.primary,
      secondarycolor: business.colorSet.secondary,
      rating: 5,
      Reviews: [],
      collectionID: undefined,
      email: "test12346789@testemailtestemail.com",
      city: business.address.city,
      state: business.address.state,
      zipcode: business.address.zipcode,
      menu: business.menu,
      profileImage: business.profileImage,
      bannerImage: business.bannerImage ? business.bannerImage : undefined,
    })
  );
}

export function updateBusiness(business: Business) {
  return DataStore.save(
    new BackendBusiness({
      name: business.name,
      about: business.aboutUs,
      phone: business.phone,
      address: business.address.address,
      website: business.website ? business.website : undefined,
      tags: ["tags"],
      type: "Lorem ipsum dolor sit amet",
      primarycolor: business.colorSet.primary,
      secondarycolor: business.colorSet.secondary,
      rating: 5,
      Reviews: [],
      collectionID: undefined,
      email: "test12346789@testemailtestemail.com",
      city: business.address.city,
      state: business.address.state,
      zipcode: business.address.zipcode,
      menu: business.menu,
      profileImage: business.profileImage,
      bannerImage: business.bannerImage ? business.bannerImage : undefined,
    })
  );
}

export async function getBusinesses() {
  const models = await DataStore.query(BackendBusiness);
  return models;
}
