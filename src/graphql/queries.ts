/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVerificationRequest = /* GraphQL */ `
  query GetVerificationRequest($id: ID!) {
    getVerificationRequest(id: $id) {
      id
      businessID
      message
      createdAt
      updatedAt
    }
  }
`;
export const listVerificationRequests = /* GraphQL */ `
  query ListVerificationRequests(
    $filter: ModelVerificationRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVerificationRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        businessID
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      message
      type
      Sender
      userID
      title
      businessRequestID
      createdAt
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        type
        Sender
        userID
        title
        businessRequestID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      profilePic
      Collections {
        nextToken
      }
      name
      isModerator
      Notifications {
        nextToken
      }
      Businesses {
        nextToken
      }
      Reviews {
        nextToken
      }
      defaultAddress
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        profilePic
        name
        isModerator
        defaultAddress
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      rating
      comments
      businessID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rating
        comments
        businessID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBusiness = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      name
      about
      phone
      address
      website
      tags
      type
      primarycolor
      secondarycolor
      rating
      Reviews {
        nextToken
      }
      collectionID
      email
      city
      state
      zipcode
      menu
      profileImage
      bannerImage
      isVerified
      verificationPending
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listBusinesses = /* GraphQL */ `
  query ListBusinesses(
    $filter: ModelBusinessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBusinesses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        about
        phone
        address
        website
        tags
        type
        primarycolor
        secondarycolor
        rating
        collectionID
        email
        city
        state
        zipcode
        menu
        profileImage
        bannerImage
        isVerified
        verificationPending
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      id
      title
      description
      color
      Businesses {
        nextToken
      }
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        color
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
