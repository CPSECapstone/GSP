/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview($owner: String) {
    onCreateReview(owner: $owner) {
      id
      rating
      comments
      businessID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview($owner: String) {
    onUpdateReview(owner: $owner) {
      id
      rating
      comments
      businessID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview($owner: String) {
    onDeleteReview(owner: $owner) {
      id
      rating
      comments
      businessID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateBusiness = /* GraphQL */ `
  subscription OnCreateBusiness($owner: String) {
    onCreateBusiness(owner: $owner) {
      id
      name
      about
      phone
      address
      url
      tags
      type
      primarycolor
      secondarycolor
      rating
      Reviews {
        nextToken
        startedAt
      }
      collectionID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateBusiness = /* GraphQL */ `
  subscription OnUpdateBusiness($owner: String) {
    onUpdateBusiness(owner: $owner) {
      id
      name
      about
      phone
      address
      url
      tags
      type
      primarycolor
      secondarycolor
      rating
      Reviews {
        nextToken
        startedAt
      }
      collectionID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteBusiness = /* GraphQL */ `
  subscription OnDeleteBusiness($owner: String) {
    onDeleteBusiness(owner: $owner) {
      id
      name
      about
      phone
      address
      url
      tags
      type
      primarycolor
      secondarycolor
      rating
      Reviews {
        nextToken
        startedAt
      }
      collectionID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection($owner: String) {
    onCreateCollection(owner: $owner) {
      id
      title
      description
      color
      Businesses {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection($owner: String) {
    onUpdateCollection(owner: $owner) {
      id
      title
      description
      color
      Businesses {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection($owner: String) {
    onDeleteCollection(owner: $owner) {
      id
      title
      description
      color
      Businesses {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
