/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateNotificationInput = {
  id?: string | null,
  message: string,
  type: NotificationType,
  Sender?: string | null,
  userID: string,
  title: string,
};

export enum NotificationType {
  OWNERSHIPREQUEST = "OWNERSHIPREQUEST",
  OWNERSHIPAPPROVED = "OWNERSHIPAPPROVED",
  OWNERSHIPDENIED = "OWNERSHIPDENIED",
}


export type ModelNotificationConditionInput = {
  message?: ModelStringInput | null,
  type?: ModelNotificationTypeInput | null,
  Sender?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelNotificationTypeInput = {
  eq?: NotificationType | null,
  ne?: NotificationType | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  message: string,
  type: NotificationType,
  Sender?: string | null,
  userID: string,
  title: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateNotificationInput = {
  id: string,
  message?: string | null,
  type?: NotificationType | null,
  Sender?: string | null,
  userID?: string | null,
  title?: string | null,
};

export type DeleteNotificationInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  email: string,
  profilePic?: string | null,
  name?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  profilePic?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  profilePic?: string | null,
  Collections?: ModelCollectionConnection | null,
  name?: string | null,
  Notifications?: ModelNotificationConnection | null,
  Businesses?: ModelBusinessConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCollectionConnection = {
  __typename: "ModelCollectionConnection",
  items:  Array<Collection | null >,
  nextToken?: string | null,
};

export type Collection = {
  __typename: "Collection",
  id: string,
  title: string,
  description?: string | null,
  color?: string | null,
  Businesses?: ModelBusinessConnection | null,
  userID: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelBusinessConnection = {
  __typename: "ModelBusinessConnection",
  items:  Array<Business | null >,
  nextToken?: string | null,
};

export type Business = {
  __typename: "Business",
  id: string,
  name: string,
  about: string,
  phone: string,
  address: string,
  website?: string | null,
  tags?: Array< MinorityGroups > | null,
  type: BusinessType,
  primarycolor: string,
  secondarycolor: string,
  rating?: number | null,
  Reviews?: ModelReviewConnection | null,
  collectionID?: string | null,
  email: string,
  city: string,
  state: string,
  zipcode: number,
  menu?: string | null,
  profileImage: string,
  bannerImage?: string | null,
  userID: string,
  createdAt: string,
  updatedAt: string,
};

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
  SIKH = "SIKH",
}


export enum BusinessType {
  RESTAURANT = "RESTAURANT",
  SHOPPING = "SHOPPING",
  MARKET = "MARKET",
  BEAUTY = "BEAUTY",
}


export type ModelReviewConnection = {
  __typename: "ModelReviewConnection",
  items:  Array<Review | null >,
  nextToken?: string | null,
};

export type Review = {
  __typename: "Review",
  id: string,
  rating?: number | null,
  comments?: string | null,
  businessID?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  profilePic?: string | null,
  name?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateReviewInput = {
  id?: string | null,
  rating?: number | null,
  comments?: string | null,
  businessID?: string | null,
};

export type ModelReviewConditionInput = {
  rating?: ModelIntInput | null,
  comments?: ModelStringInput | null,
  businessID?: ModelIDInput | null,
  and?: Array< ModelReviewConditionInput | null > | null,
  or?: Array< ModelReviewConditionInput | null > | null,
  not?: ModelReviewConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateReviewInput = {
  id: string,
  rating?: number | null,
  comments?: string | null,
  businessID?: string | null,
};

export type DeleteReviewInput = {
  id: string,
};

export type CreateBusinessInput = {
  id?: string | null,
  name: string,
  about: string,
  phone: string,
  address: string,
  website?: string | null,
  tags?: Array< MinorityGroups > | null,
  type: BusinessType,
  primarycolor: string,
  secondarycolor: string,
  rating?: number | null,
  collectionID?: string | null,
  email: string,
  city: string,
  state: string,
  zipcode: number,
  menu?: string | null,
  profileImage: string,
  bannerImage?: string | null,
  userID: string,
};

export type ModelBusinessConditionInput = {
  name?: ModelStringInput | null,
  about?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  address?: ModelStringInput | null,
  website?: ModelStringInput | null,
  tags?: ModelMinorityGroupsListInput | null,
  type?: ModelBusinessTypeInput | null,
  primarycolor?: ModelStringInput | null,
  secondarycolor?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  collectionID?: ModelIDInput | null,
  email?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  zipcode?: ModelIntInput | null,
  menu?: ModelStringInput | null,
  profileImage?: ModelStringInput | null,
  bannerImage?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelBusinessConditionInput | null > | null,
  or?: Array< ModelBusinessConditionInput | null > | null,
  not?: ModelBusinessConditionInput | null,
};

export type ModelMinorityGroupsListInput = {
  eq?: Array< MinorityGroups | null > | null,
  ne?: Array< MinorityGroups | null > | null,
  contains?: MinorityGroups | null,
  notContains?: MinorityGroups | null,
};

export type ModelBusinessTypeInput = {
  eq?: BusinessType | null,
  ne?: BusinessType | null,
};

export type UpdateBusinessInput = {
  id: string,
  name?: string | null,
  about?: string | null,
  phone?: string | null,
  address?: string | null,
  website?: string | null,
  tags?: Array< MinorityGroups > | null,
  type?: BusinessType | null,
  primarycolor?: string | null,
  secondarycolor?: string | null,
  rating?: number | null,
  collectionID?: string | null,
  email?: string | null,
  city?: string | null,
  state?: string | null,
  zipcode?: number | null,
  menu?: string | null,
  profileImage?: string | null,
  bannerImage?: string | null,
  userID?: string | null,
};

export type DeleteBusinessInput = {
  id: string,
};

export type CreateCollectionInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  color?: string | null,
  userID: string,
};

export type ModelCollectionConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  color?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelCollectionConditionInput | null > | null,
  or?: Array< ModelCollectionConditionInput | null > | null,
  not?: ModelCollectionConditionInput | null,
};

export type UpdateCollectionInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  color?: string | null,
  userID?: string | null,
};

export type DeleteCollectionInput = {
  id: string,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  message?: ModelStringInput | null,
  type?: ModelNotificationTypeInput | null,
  Sender?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  profilePic?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelReviewFilterInput = {
  id?: ModelIDInput | null,
  rating?: ModelIntInput | null,
  comments?: ModelStringInput | null,
  businessID?: ModelIDInput | null,
  and?: Array< ModelReviewFilterInput | null > | null,
  or?: Array< ModelReviewFilterInput | null > | null,
  not?: ModelReviewFilterInput | null,
};

export type ModelBusinessFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  about?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  address?: ModelStringInput | null,
  website?: ModelStringInput | null,
  tags?: ModelMinorityGroupsListInput | null,
  type?: ModelBusinessTypeInput | null,
  primarycolor?: ModelStringInput | null,
  secondarycolor?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  collectionID?: ModelIDInput | null,
  email?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  zipcode?: ModelIntInput | null,
  menu?: ModelStringInput | null,
  profileImage?: ModelStringInput | null,
  bannerImage?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelBusinessFilterInput | null > | null,
  or?: Array< ModelBusinessFilterInput | null > | null,
  not?: ModelBusinessFilterInput | null,
};

export type ModelCollectionFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  color?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelCollectionFilterInput | null > | null,
  or?: Array< ModelCollectionFilterInput | null > | null,
  not?: ModelCollectionFilterInput | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    type: NotificationType,
    Sender?: string | null,
    userID: string,
    title: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    type: NotificationType,
    Sender?: string | null,
    userID: string,
    title: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    type: NotificationType,
    Sender?: string | null,
    userID: string,
    title: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profilePic?: string | null,
    Collections?:  {
      __typename: "ModelCollectionConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profilePic?: string | null,
    Collections?:  {
      __typename: "ModelCollectionConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profilePic?: string | null,
    Collections?:  {
      __typename: "ModelCollectionConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateReviewMutationVariables = {
  input: CreateReviewInput,
  condition?: ModelReviewConditionInput | null,
};

export type CreateReviewMutation = {
  createReview?:  {
    __typename: "Review",
    id: string,
    rating?: number | null,
    comments?: string | null,
    businessID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateReviewMutationVariables = {
  input: UpdateReviewInput,
  condition?: ModelReviewConditionInput | null,
};

export type UpdateReviewMutation = {
  updateReview?:  {
    __typename: "Review",
    id: string,
    rating?: number | null,
    comments?: string | null,
    businessID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteReviewMutationVariables = {
  input: DeleteReviewInput,
  condition?: ModelReviewConditionInput | null,
};

export type DeleteReviewMutation = {
  deleteReview?:  {
    __typename: "Review",
    id: string,
    rating?: number | null,
    comments?: string | null,
    businessID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateBusinessMutationVariables = {
  input: CreateBusinessInput,
  condition?: ModelBusinessConditionInput | null,
};

export type CreateBusinessMutation = {
  createBusiness?:  {
    __typename: "Business",
    id: string,
    name: string,
    about: string,
    phone: string,
    address: string,
    website?: string | null,
    tags?: Array< MinorityGroups > | null,
    type: BusinessType,
    primarycolor: string,
    secondarycolor: string,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
    } | null,
    collectionID?: string | null,
    email: string,
    city: string,
    state: string,
    zipcode: number,
    menu?: string | null,
    profileImage: string,
    bannerImage?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBusinessMutationVariables = {
  input: UpdateBusinessInput,
  condition?: ModelBusinessConditionInput | null,
};

export type UpdateBusinessMutation = {
  updateBusiness?:  {
    __typename: "Business",
    id: string,
    name: string,
    about: string,
    phone: string,
    address: string,
    website?: string | null,
    tags?: Array< MinorityGroups > | null,
    type: BusinessType,
    primarycolor: string,
    secondarycolor: string,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
    } | null,
    collectionID?: string | null,
    email: string,
    city: string,
    state: string,
    zipcode: number,
    menu?: string | null,
    profileImage: string,
    bannerImage?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBusinessMutationVariables = {
  input: DeleteBusinessInput,
  condition?: ModelBusinessConditionInput | null,
};

export type DeleteBusinessMutation = {
  deleteBusiness?:  {
    __typename: "Business",
    id: string,
    name: string,
    about: string,
    phone: string,
    address: string,
    website?: string | null,
    tags?: Array< MinorityGroups > | null,
    type: BusinessType,
    primarycolor: string,
    secondarycolor: string,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
    } | null,
    collectionID?: string | null,
    email: string,
    city: string,
    state: string,
    zipcode: number,
    menu?: string | null,
    profileImage: string,
    bannerImage?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCollectionMutationVariables = {
  input: CreateCollectionInput,
  condition?: ModelCollectionConditionInput | null,
};

export type CreateCollectionMutation = {
  createCollection?:  {
    __typename: "Collection",
    id: string,
    title: string,
    description?: string | null,
    color?: string | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCollectionMutationVariables = {
  input: UpdateCollectionInput,
  condition?: ModelCollectionConditionInput | null,
};

export type UpdateCollectionMutation = {
  updateCollection?:  {
    __typename: "Collection",
    id: string,
    title: string,
    description?: string | null,
    color?: string | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCollectionMutationVariables = {
  input: DeleteCollectionInput,
  condition?: ModelCollectionConditionInput | null,
};

export type DeleteCollectionMutation = {
  deleteCollection?:  {
    __typename: "Collection",
    id: string,
    title: string,
    description?: string | null,
    color?: string | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    type: NotificationType,
    Sender?: string | null,
    userID: string,
    title: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      message: string,
      type: NotificationType,
      Sender?: string | null,
      userID: string,
      title: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profilePic?: string | null,
    Collections?:  {
      __typename: "ModelCollectionConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      profilePic?: string | null,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReviewQueryVariables = {
  id: string,
};

export type GetReviewQuery = {
  getReview?:  {
    __typename: "Review",
    id: string,
    rating?: number | null,
    comments?: string | null,
    businessID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListReviewsQueryVariables = {
  filter?: ModelReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReviewsQuery = {
  listReviews?:  {
    __typename: "ModelReviewConnection",
    items:  Array< {
      __typename: "Review",
      id: string,
      rating?: number | null,
      comments?: string | null,
      businessID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBusinessQueryVariables = {
  id: string,
};

export type GetBusinessQuery = {
  getBusiness?:  {
    __typename: "Business",
    id: string,
    name: string,
    about: string,
    phone: string,
    address: string,
    website?: string | null,
    tags?: Array< MinorityGroups > | null,
    type: BusinessType,
    primarycolor: string,
    secondarycolor: string,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
    } | null,
    collectionID?: string | null,
    email: string,
    city: string,
    state: string,
    zipcode: number,
    menu?: string | null,
    profileImage: string,
    bannerImage?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBusinessesQueryVariables = {
  filter?: ModelBusinessFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBusinessesQuery = {
  listBusinesses?:  {
    __typename: "ModelBusinessConnection",
    items:  Array< {
      __typename: "Business",
      id: string,
      name: string,
      about: string,
      phone: string,
      address: string,
      website?: string | null,
      tags?: Array< MinorityGroups > | null,
      type: BusinessType,
      primarycolor: string,
      secondarycolor: string,
      rating?: number | null,
      collectionID?: string | null,
      email: string,
      city: string,
      state: string,
      zipcode: number,
      menu?: string | null,
      profileImage: string,
      bannerImage?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCollectionQueryVariables = {
  id: string,
};

export type GetCollectionQuery = {
  getCollection?:  {
    __typename: "Collection",
    id: string,
    title: string,
    description?: string | null,
    color?: string | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCollectionsQueryVariables = {
  filter?: ModelCollectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCollectionsQuery = {
  listCollections?:  {
    __typename: "ModelCollectionConnection",
    items:  Array< {
      __typename: "Collection",
      id: string,
      title: string,
      description?: string | null,
      color?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    type: NotificationType,
    Sender?: string | null,
    userID: string,
    title: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    type: NotificationType,
    Sender?: string | null,
    userID: string,
    title: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    type: NotificationType,
    Sender?: string | null,
    userID: string,
    title: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profilePic?: string | null,
    Collections?:  {
      __typename: "ModelCollectionConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profilePic?: string | null,
    Collections?:  {
      __typename: "ModelCollectionConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profilePic?: string | null,
    Collections?:  {
      __typename: "ModelCollectionConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateReviewSubscription = {
  onCreateReview?:  {
    __typename: "Review",
    id: string,
    rating?: number | null,
    comments?: string | null,
    businessID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateReviewSubscription = {
  onUpdateReview?:  {
    __typename: "Review",
    id: string,
    rating?: number | null,
    comments?: string | null,
    businessID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteReviewSubscription = {
  onDeleteReview?:  {
    __typename: "Review",
    id: string,
    rating?: number | null,
    comments?: string | null,
    businessID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateBusinessSubscription = {
  onCreateBusiness?:  {
    __typename: "Business",
    id: string,
    name: string,
    about: string,
    phone: string,
    address: string,
    website?: string | null,
    tags?: Array< MinorityGroups > | null,
    type: BusinessType,
    primarycolor: string,
    secondarycolor: string,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
    } | null,
    collectionID?: string | null,
    email: string,
    city: string,
    state: string,
    zipcode: number,
    menu?: string | null,
    profileImage: string,
    bannerImage?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBusinessSubscription = {
  onUpdateBusiness?:  {
    __typename: "Business",
    id: string,
    name: string,
    about: string,
    phone: string,
    address: string,
    website?: string | null,
    tags?: Array< MinorityGroups > | null,
    type: BusinessType,
    primarycolor: string,
    secondarycolor: string,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
    } | null,
    collectionID?: string | null,
    email: string,
    city: string,
    state: string,
    zipcode: number,
    menu?: string | null,
    profileImage: string,
    bannerImage?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBusinessSubscription = {
  onDeleteBusiness?:  {
    __typename: "Business",
    id: string,
    name: string,
    about: string,
    phone: string,
    address: string,
    website?: string | null,
    tags?: Array< MinorityGroups > | null,
    type: BusinessType,
    primarycolor: string,
    secondarycolor: string,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
    } | null,
    collectionID?: string | null,
    email: string,
    city: string,
    state: string,
    zipcode: number,
    menu?: string | null,
    profileImage: string,
    bannerImage?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCollectionSubscription = {
  onCreateCollection?:  {
    __typename: "Collection",
    id: string,
    title: string,
    description?: string | null,
    color?: string | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCollectionSubscription = {
  onUpdateCollection?:  {
    __typename: "Collection",
    id: string,
    title: string,
    description?: string | null,
    color?: string | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCollectionSubscription = {
  onDeleteCollection?:  {
    __typename: "Collection",
    id: string,
    title: string,
    description?: string | null,
    color?: string | null,
    Businesses?:  {
      __typename: "ModelBusinessConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
