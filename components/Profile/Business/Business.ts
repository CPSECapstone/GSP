/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/lines-between-class-members */

import { Business as BackendBusiness } from "../../../src/API";

export const BUSINESS_TYPES = [
  "Restaurant",
  "Store",
  "Market",
  "Beauty",
  "Automotive",
  "Education",
  "EventPlanning",
  "Financial",
  "Medical",
  "HomeServices",
  "Pets",
  "ProfessionalServices",
  "Other",
] as const;
export type BusinessType = typeof BUSINESS_TYPES[number];

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
  zipcode: Number;
};

export default class Business {
  name: string;
  email: string;
  businessType: BusinessType;
  colorSet: ColorSet;
  phone: string;
  address: Address;
  website?: URL;
  tags: Array<string>;
  profileImage: string;
  bannerImage: string;
  aboutUs: string;
  menu?: string;

  constructor(
    name: string,
    email: string,
    businessType: BusinessType,
    colorPrimary: Color,
    colorSecondary: Color,
    phone: string,
    address: string,
    city: string,
    state: string,
    zipcode: Number,
    website: string | undefined | null,
    tags: Array<string>,
    profileImage: string,
    bannerImage: string,
    aboutUs: string,
    menu?: string
  ) {
    this.name = name;
    this.email = email;
    this.businessType = businessType;
    this.colorSet = { primary: colorPrimary, secondary: colorSecondary };
    this.phone = phone;
    this.address = { address, city, state, zipcode };
    this.website = website ? new URL(website) : undefined;
    this.tags = tags;
    this.profileImage = profileImage;
    this.bannerImage = bannerImage;
    this.menu = menu;
    this.aboutUs = aboutUs;
  }
}

export class BusinessAdapter extends Business {
  constructor(business: BackendBusiness) {
    super(
      business.name,
      "needs backend implementation",
      business.type as BusinessType,
      `#${business.primarycolor}` as Color,
      `#${business.secondarycolor}` as Color,
      business.phone!,
      business.address!,
      "nan",
      "nan",
      0,
      business.url,
      business.tags ? (business.tags as string[]) : new Array<string>(),
      "nan",
      "nan",
      business.about!,
      "nan"
    );
  }
}
