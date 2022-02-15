/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateReviewInput = {
  id?: string | null,
  rating?: number | null,
  comments?: string | null,
  businessID?: string | null,
  _version?: number | null,
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

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
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

export type Review = {
  __typename: "Review",
  id: string,
  rating?: number | null,
  comments?: string | null,
  businessID?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateReviewInput = {
  id: string,
  rating?: number | null,
  comments?: string | null,
  businessID?: string | null,
  _version?: number | null,
};

export type DeleteReviewInput = {
  id: string,
  _version?: number | null,
};

export type CreateBusinessInput = {
  id?: string | null,
  name: string,
  about?: string | null,
  phone?: string | null,
  address?: string | null,
  url?: string | null,
  tags?: Array< string | null > | null,
  type?: string | null,
  primarycolor?: string | null,
  secondarycolor?: string | null,
  rating?: number | null,
  collectionID?: string | null,
  _version?: number | null,
};

export type ModelBusinessConditionInput = {
  name?: ModelStringInput | null,
  about?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  address?: ModelStringInput | null,
  url?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  type?: ModelStringInput | null,
  primarycolor?: ModelStringInput | null,
  secondarycolor?: ModelStringInput | null,
  rating?: ModelFloatInput | null,
  collectionID?: ModelIDInput | null,
  and?: Array< ModelBusinessConditionInput | null > | null,
  or?: Array< ModelBusinessConditionInput | null > | null,
  not?: ModelBusinessConditionInput | null,
};

export type ModelFloatInput = {
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

export type Business = {
  __typename: "Business",
  id: string,
  name: string,
  about?: string | null,
  phone?: string | null,
  address?: string | null,
  url?: string | null,
  tags?: Array< string | null > | null,
  type?: string | null,
  primarycolor?: string | null,
  secondarycolor?: string | null,
  rating?: number | null,
  Reviews?: ModelReviewConnection | null,
  collectionID?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelReviewConnection = {
  __typename: "ModelReviewConnection",
  items:  Array<Review | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateBusinessInput = {
  id: string,
  name?: string | null,
  about?: string | null,
  phone?: string | null,
  address?: string | null,
  url?: string | null,
  tags?: Array< string | null > | null,
  type?: string | null,
  primarycolor?: string | null,
  secondarycolor?: string | null,
  rating?: number | null,
  collectionID?: string | null,
  _version?: number | null,
};

export type DeleteBusinessInput = {
  id: string,
  _version?: number | null,
};

export type CreateCollectionInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  color?: string | null,
  _version?: number | null,
};

export type ModelCollectionConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  color?: ModelStringInput | null,
  and?: Array< ModelCollectionConditionInput | null > | null,
  or?: Array< ModelCollectionConditionInput | null > | null,
  not?: ModelCollectionConditionInput | null,
};

export type Collection = {
  __typename: "Collection",
  id: string,
  title: string,
  description?: string | null,
  color?: string | null,
  Businesses?: ModelBusinessConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelBusinessConnection = {
  __typename: "ModelBusinessConnection",
  items:  Array<Business | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateCollectionInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  color?: string | null,
  _version?: number | null,
};

export type DeleteCollectionInput = {
  id: string,
  _version?: number | null,
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
  url?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  type?: ModelStringInput | null,
  primarycolor?: ModelStringInput | null,
  secondarycolor?: ModelStringInput | null,
  rating?: ModelFloatInput | null,
  collectionID?: ModelIDInput | null,
  and?: Array< ModelBusinessFilterInput | null > | null,
  or?: Array< ModelBusinessFilterInput | null > | null,
  not?: ModelBusinessFilterInput | null,
};

export type ModelCollectionFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  color?: ModelStringInput | null,
  and?: Array< ModelCollectionFilterInput | null > | null,
  or?: Array< ModelCollectionFilterInput | null > | null,
  not?: ModelCollectionFilterInput | null,
};

export type ModelCollectionConnection = {
  __typename: "ModelCollectionConnection",
  items:  Array<Collection | null >,
  nextToken?: string | null,
  startedAt?: number | null,
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
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    about?: string | null,
    phone?: string | null,
    address?: string | null,
    url?: string | null,
    tags?: Array< string | null > | null,
    type?: string | null,
    primarycolor?: string | null,
    secondarycolor?: string | null,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    collectionID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    about?: string | null,
    phone?: string | null,
    address?: string | null,
    url?: string | null,
    tags?: Array< string | null > | null,
    type?: string | null,
    primarycolor?: string | null,
    secondarycolor?: string | null,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    collectionID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    about?: string | null,
    phone?: string | null,
    address?: string | null,
    url?: string | null,
    tags?: Array< string | null > | null,
    type?: string | null,
    primarycolor?: string | null,
    secondarycolor?: string | null,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    collectionID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncReviewsQueryVariables = {
  filter?: ModelReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncReviewsQuery = {
  syncReviews?:  {
    __typename: "ModelReviewConnection",
    items:  Array< {
      __typename: "Review",
      id: string,
      rating?: number | null,
      comments?: string | null,
      businessID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
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
    about?: string | null,
    phone?: string | null,
    address?: string | null,
    url?: string | null,
    tags?: Array< string | null > | null,
    type?: string | null,
    primarycolor?: string | null,
    secondarycolor?: string | null,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    collectionID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
      about?: string | null,
      phone?: string | null,
      address?: string | null,
      url?: string | null,
      tags?: Array< string | null > | null,
      type?: string | null,
      primarycolor?: string | null,
      secondarycolor?: string | null,
      rating?: number | null,
      collectionID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncBusinessesQueryVariables = {
  filter?: ModelBusinessFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncBusinessesQuery = {
  syncBusinesses?:  {
    __typename: "ModelBusinessConnection",
    items:  Array< {
      __typename: "Business",
      id: string,
      name: string,
      about?: string | null,
      phone?: string | null,
      address?: string | null,
      url?: string | null,
      tags?: Array< string | null > | null,
      type?: string | null,
      primarycolor?: string | null,
      secondarycolor?: string | null,
      rating?: number | null,
      collectionID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
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
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCollectionsQueryVariables = {
  filter?: ModelCollectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCollectionsQuery = {
  syncCollections?:  {
    __typename: "ModelCollectionConnection",
    items:  Array< {
      __typename: "Collection",
      id: string,
      title: string,
      description?: string | null,
      color?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateReviewSubscriptionVariables = {
  owner?: string | null,
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
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateReviewSubscriptionVariables = {
  owner?: string | null,
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
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteReviewSubscriptionVariables = {
  owner?: string | null,
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
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateBusinessSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateBusinessSubscription = {
  onCreateBusiness?:  {
    __typename: "Business",
    id: string,
    name: string,
    about?: string | null,
    phone?: string | null,
    address?: string | null,
    url?: string | null,
    tags?: Array< string | null > | null,
    type?: string | null,
    primarycolor?: string | null,
    secondarycolor?: string | null,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    collectionID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateBusinessSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateBusinessSubscription = {
  onUpdateBusiness?:  {
    __typename: "Business",
    id: string,
    name: string,
    about?: string | null,
    phone?: string | null,
    address?: string | null,
    url?: string | null,
    tags?: Array< string | null > | null,
    type?: string | null,
    primarycolor?: string | null,
    secondarycolor?: string | null,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    collectionID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteBusinessSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteBusinessSubscription = {
  onDeleteBusiness?:  {
    __typename: "Business",
    id: string,
    name: string,
    about?: string | null,
    phone?: string | null,
    address?: string | null,
    url?: string | null,
    tags?: Array< string | null > | null,
    type?: string | null,
    primarycolor?: string | null,
    secondarycolor?: string | null,
    rating?: number | null,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    collectionID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateCollectionSubscriptionVariables = {
  owner?: string | null,
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
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateCollectionSubscriptionVariables = {
  owner?: string | null,
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
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteCollectionSubscriptionVariables = {
  owner?: string | null,
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
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};
