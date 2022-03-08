/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      message
      type
      Sender
      userID
      title
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      name
      Notifications {
        nextToken
        startedAt
      }
      Businesses {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      name
      Notifications {
        nextToken
        startedAt
      }
      Businesses {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      name
      Notifications {
        nextToken
        startedAt
      }
      Businesses {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      collectionID
      email
      city
      state
      zipcode
      menu
      profileImage
      bannerImage
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      collectionID
      email
      city
      state
      zipcode
      menu
      profileImage
      bannerImage
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      collectionID
      email
      city
      state
      zipcode
      menu
      profileImage
      bannerImage
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
