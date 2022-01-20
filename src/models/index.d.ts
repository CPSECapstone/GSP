import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





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
  readonly about?: string;
  readonly phone?: string;
  readonly address?: string;
  readonly url?: string;
  readonly tags?: (string | null)[];
  readonly type?: string;
  readonly primarycolor?: string;
  readonly secondarycolor?: string;
  readonly rating?: number;
  readonly Reviews?: (Review | null)[];
  readonly collectionID?: string;
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