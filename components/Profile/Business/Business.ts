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

// const DEFAULT_BUSINESS: Partial<Business> = {
//   name: "",
//   primarycolor: "#F81515",
//   secondarycolor: "#DA3025",
//   phone: "",
//   tags: [],
//   about: "",
//   website: "",
//   address: "",
//   city: "",
//   state: "",
//   zipcode: "",
// };

const DEFAULT_BUSINESS: Partial<Business> = {
  name: "",
  primarycolor: "#F81515",
  secondarycolor: "#DA3025",
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

  updateField(key: keyof Business, value: any) {
    this.business[key] = value;
    this.edits[key] = value;
  }
}
