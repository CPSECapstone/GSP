/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVerificationRequest = /* GraphQL */ `
  subscription OnCreateVerificationRequest {
    onCreateVerificationRequest {
      id
      businessID
      message
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVerificationRequest = /* GraphQL */ `
  subscription OnUpdateVerificationRequest {
    onUpdateVerificationRequest {
      id
      businessID
      message
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVerificationRequest = /* GraphQL */ `
  subscription OnDeleteVerificationRequest {
    onDeleteVerificationRequest {
      id
      businessID
      message
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview {
    onCreateReview {
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
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview {
    onUpdateReview {
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
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview {
    onDeleteReview {
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
export const onCreateBusiness = /* GraphQL */ `
  subscription OnCreateBusiness {
    onCreateBusiness {
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
export const onUpdateBusiness = /* GraphQL */ `
  subscription OnUpdateBusiness {
    onUpdateBusiness {
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
export const onDeleteBusiness = /* GraphQL */ `
  subscription OnDeleteBusiness {
    onDeleteBusiness {
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
export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection {
    onCreateCollection {
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
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection {
    onUpdateCollection {
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
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection {
    onDeleteCollection {
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
