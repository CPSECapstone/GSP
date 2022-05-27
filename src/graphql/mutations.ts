/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
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
export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
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
export const deleteReview = /* GraphQL */ `
  mutation DeleteReview(
    $input: DeleteReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    deleteReview(input: $input, condition: $condition) {
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
export const createBusiness = /* GraphQL */ `
  mutation CreateBusiness(
    $input: CreateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    createBusiness(input: $input, condition: $condition) {
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
      userID
      createdAt
      updatedAt
    }
  }
`;
export const updateBusiness = /* GraphQL */ `
  mutation UpdateBusiness(
    $input: UpdateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    updateBusiness(input: $input, condition: $condition) {
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
      userID
      createdAt
      updatedAt
    }
  }
`;
export const deleteBusiness = /* GraphQL */ `
  mutation DeleteBusiness(
    $input: DeleteBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    deleteBusiness(input: $input, condition: $condition) {
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
      userID
      createdAt
      updatedAt
    }
  }
`;
export const createCollection = /* GraphQL */ `
  mutation CreateCollection(
    $input: CreateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    createCollection(input: $input, condition: $condition) {
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
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection(
    $input: UpdateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    updateCollection(input: $input, condition: $condition) {
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
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection(
    $input: DeleteCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    deleteCollection(input: $input, condition: $condition) {
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
