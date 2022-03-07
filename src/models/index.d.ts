import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum NotificationType {
  OWNERSHIPREQUEST = "OWNERSHIPREQUEST",
  OWNERSHIPAPPROVED = "OWNERSHIPAPPROVED",
  OWNERSHIPDENIED = "OWNERSHIPDENIED"
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

export enum BusinessType {
  RESTAURANT = "RESTAURANT",
  SHOPPING = "SHOPPING",
  MARKET = "MARKET",
  BEAUTY = "BEAUTY"
}



type NotificationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CollectionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BusinessMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReviewMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Notification {
  readonly id: string;
  readonly message: string;
  readonly type: NotificationType | keyof typeof NotificationType;
  readonly Sender?: User;
  readonly Receiver: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly notificationSenderId?: string;
  readonly notificationReceiverId: string;
  constructor(init: ModelInit<Notification, NotificationMetaData>);
  static copyOf(source: Notification, mutator: (draft: MutableModel<Notification, NotificationMetaData>) => MutableModel<Notification, NotificationMetaData> | void): Notification;
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly ownedBusinesses?: string;
  readonly profilePic?: string;
  readonly Collections?: (Collection | null)[];
  readonly name?: string;
  readonly notifications?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Collection {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly color?: string;
  readonly Businesses?: (Business | null)[];
  readonly userID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Collection, CollectionMetaData>);
  static copyOf(source: Collection, mutator: (draft: MutableModel<Collection, CollectionMetaData>) => MutableModel<Collection, CollectionMetaData> | void): Collection;
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