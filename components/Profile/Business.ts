/* eslint-disable @typescript-eslint/lines-between-class-members */
export enum BusinessCategory {
  Restaurant = "Restaurant",
  Store = "Store",
  Market = "Market",
  Beauty = "Beauty",
  Automotive = "Automotive",
  Education = "Education",
  EventPlanning = "EventPlanning",
  Financial = "Financial",
  Medical = "Medical",
  HomeServices = "HomeServices",
  Pets = "Pets",
  ProfessionalServices = "ProfessionalServices",
  Other = "Other",
}

export enum ColorOption {
  red1 = "#F81515",
  red2 = "#DA3025",
  blue1 = "#0394fc",
  grey = "grey",
}

export class Business {
  name: string;
  email: string;
  category: BusinessCategory;
  colorPrimary: ColorOption;
  colorSecondary: ColorOption;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: Number;
  website: URL;
  tags: Array<string>;
  profileImage: string;
  bannerImage: string;
  customFields: Object;
  aboutUs: string;

  constructor(
    name: string,
    email: string,
    category: string,
    colorPrimary: string,
    colorSecondary: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zipcode: Number,
    website: string,
    tags: Array<string>,
    profileImage: string,
    bannerImage: string,
    customFields: Object,
    aboutUs: string
  ) {
    this.name = name;
    this.email = email;
    this.category = (<any>BusinessCategory)[category];
    this.colorPrimary = (<any>ColorOption)[colorPrimary];
    this.colorSecondary = (<any>ColorOption)[colorSecondary];
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
    this.website = new URL(website);
    this.tags = tags;
    this.profileImage = profileImage;
    this.bannerImage = bannerImage;
    this.customFields = customFields;
    this.aboutUs = aboutUs;
    this.email = email;
  }
}
