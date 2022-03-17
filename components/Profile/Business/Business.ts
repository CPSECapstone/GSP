/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/lines-between-class-members */

import { Business } from "../../../src/API";

// export const BUSINESS_TYPES = [
//   "Restaurant",
//   "Store",
//   "Market",
//   "Beauty",
//   "Automotive",
//   "Education",
//   "EventPlanning",
//   "Financial",
//   "Medical",
//   "HomeServices",
//   "Pets",
//   "ProfessionalServices",
//   "Other",
// ] as const;
// export type BusinessType = typeof BUSINESS_TYPES[number];

export const BUSINESS_COLORS = [
  "#F81515",
  "#DA3025",
  "#DA5125",
  "#DA3B25",
  "#E19258",
  "#FEBF45",
  "#F3D1AF",
  "#BEEA0E",
  "#1BA431",
  "#2BBA64",
  "#2BBAA9",
  "#2B98BA",
  "#0394FC",
  "#2B64BA",
  "#7D9FB8",
] as const;
export type Color = typeof BUSINESS_COLORS[number];

export type ColorSet = {
  primary: Color;
  secondary: Color;
};

export type Address = {
  address: string;
  city: string;
  state: string;
  zipcode: number;
};

// export default class Business {
//   name: string;
//   email: string;
//   type: BusinessType;
//   colorSet: ColorSet;
//   phone: string;
//   address: Address;
//   website: string | null | undefined;
//   tags: Array<MinorityGroups>;
//   profileImage: string;
//   bannerImage: string | null | undefined;
//   aboutUs: string;
//   menu?: string;

//   constructor(
//     name: string,
//     email: string,
//     type: BusinessType,
//     colorPrimary: Color,
//     colorSecondary: Color,
//     phone: string,
//     address: string,
//     city: string,
//     state: string,
//     zipcode: number,
//     website: string | null | undefined,
//     tags: Array<MinorityGroups>,
//     profileImage: string,
//     bannerImage: string | null | undefined,
//     aboutUs: string,
//     menu?: string
//   ) {
//     this.name = name;
//     this.email = email;
//     this.type = type;
//     this.colorSet = { primary: colorPrimary, secondary: colorSecondary };
//     this.phone = phone;
//     this.address = { address, city, state, zipcode };
//     this.website = website;
//     this.tags = tags;
//     this.profileImage = profileImage;
//     this.bannerImage = bannerImage;
//     this.aboutUs = aboutUs;
//     this.menu = menu;
//   }
// }

// export class BusinessAdapter extends Business {
//   constructor(business: BackendBusiness) {
//     super(
//       business.name,
//       business.email,
//       business.type as BusinessType,
//       business.primarycolor as Color,
//       business.secondarycolor as Color,
//       business.phone,
//       business.address,
//       business.city,
//       business.state,
//       business.zipcode,
//       business.website,
//       business.tags!,
//       business.profileImage,
//       business.bannerImage,
//       business.about,
//       business.menu ? business.menu : undefined
//     );
//   }
// }

export type FrontendBusinessField =
  | "name"
  | "type"
  | "phone"
  | "address"
  | "tags"
  | "about"
  | "website"
  | "menu"
  | "colorSet";

const DEFAULT_BUSINESS: Partial<Business> = {
  name: "",
  phone: "",
  tags: [],
  about: "",
  website: "",
  address: "",
  city: "",
  state: "",
  zipcode: "",
};

export class Editor {
  edits: Partial<Business>;
  business: Partial<Business>;

  constructor(business: Business | undefined) {
    // Received business is readonly; we make a copy.
    this.business = business ? { ...business } : DEFAULT_BUSINESS;
    this.edits = business ? { id: business.id } : DEFAULT_BUSINESS;
  }

  updateField(key: FrontendBusinessField, value: any) {
    if (key === "colorSet") {
      const { primary, secondary } = value as ColorSet;
      this.business.primarycolor = primary;
      this.edits.primarycolor = primary;
      this.business.secondarycolor = secondary;
      this.edits.secondarycolor = secondary;
    } else if (key === "address") {
      const { address, city, state, zipcode } = value as Address;
      this.business.address = address;
      this.edits.address = address;
      this.business.city = city;
      this.edits.city = city;
      this.business.state = state;
      this.edits.state = state;
      this.business.zipcode = zipcode;
      this.edits.zipcode = zipcode;
    } else {
      this.business[key] = value;
      this.edits[key] = value;
    }
  }
}
