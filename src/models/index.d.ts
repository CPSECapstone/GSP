import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum BusinessType {
  RESTAURANT = "RESTAURANT",
  SHOPPING = "SHOPPING",
  MARKET = "MARKET",
  BEAUTY = "BEAUTY"
}

export enum MinorityGroups {
  ASIANAMERICAN = "ASIANAMERICAN",
  AFRICANAMERICAN = "AFRICANAMERICAN",
  LATINX = "LATINX",
  MIDDLEEASTERN = "MIDDLEEASTERN",
  NATIVEAMERICAN = "NATIVEAMERICAN",
  PACIFICISLANDER = "PACIFICISLANDER",
  ALASKANATIVE = "ALASKANATIVE",
  MUSLIM = "MUSLIM",
  HALAL = "HALAL",
  JEWISH = "JEWISH",
  KOSHER = "KOSHER",
  HINDU = "HINDU",
  SIKH = "SIKH"
}



type ReviewMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BusinessMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CollectionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Review {
  readonly id: string;
  readonly rating?: number;
  readonly comments?: string;
  readonly businessID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Review, ReviewMetaData>);
  static copyOf(source: Review, mutator: (draft: MutableModel<Review, ReviewMetaData>) => MutableModel<Review, ReviewMetaData> | void): Review;
}

export declare class Business {
  readonly id: string;
  readonly name: string;
  readonly about: string;
  readonly phone: string;
  readonly address: string;
  readonly website?: string;
  readonly tags?: MinorityGroups[] | keyof typeof MinorityGroups;
  readonly type: BusinessType | keyof typeof BusinessType;
  readonly primarycolor: string;
  readonly secondarycolor: string;
  readonly rating?: number;
  readonly Reviews?: (Review | null)[];
  readonly collectionID?: string;
  readonly email: string;
  readonly city: string;
  readonly state: string;
  readonly zipcode: number;
  readonly menu?: string;
  readonly profileImage: string;
  readonly bannerImage?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Business, BusinessMetaData>);
  static copyOf(source: Business, mutator: (draft: MutableModel<Business, BusinessMetaData>) => MutableModel<Business, BusinessMetaData> | void): Business;
}

export declare class Collection {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly color?: string;
  readonly Businesses?: (Business | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Collection, CollectionMetaData>);
  static copyOf(source: Collection, mutator: (draft: MutableModel<Collection, CollectionMetaData>) => MutableModel<Collection, CollectionMetaData> | void): Collection;
}