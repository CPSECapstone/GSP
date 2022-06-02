/* eslint-disable @typescript-eslint/no-use-before-define */
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  createCollection,
  deleteCollection,
  updateBusiness,
} from "../../src/graphql/mutations";
import { Business, Collection } from "../../src/API";

export default class CollectionAPI {
  static async create(collection: Partial<Collection>) {
    const newCollection = (await API.graphql(
      graphqlOperation(createCollection, { input: collection })
    )) as GraphQLResult<any>;
    return newCollection;
  }

  static async addBusiness(collection: Collection, newBusiness: Business) {
    // const businesses = collection.Businesses?.items;
    // businesses?.push(newBusiness);
    // const updated = { id: collection.id, businesses };
    // return API.graphql({
    //   query: updateCollection,
    //   variables: { input: updated },
    // });
    const updatedBusiness = { id: newBusiness.id, collectionID: collection.id };

    return API.graphql({
      query: updateBusiness,
      variables: { input: updatedBusiness },
    }) as GraphQLResult<any>;
  }

  static async removeBusiness(business: Business) {
    const updatedBusiness = { id: business.id, collectionID: "none" };
    return API.graphql({
      query: updateBusiness,
      variables: { input: updatedBusiness },
    });
    // const index = collection.Businesses?.items.findIndex(
    //   (x) => x!.id === business.id
    // );

    // if (index !== undefined) {
    //   const updated = { ...collection };
    //   updated.Businesses?.items.splice(index);
    //   return API.graphql({
    //     query: updateCollection,
    //     variables: { input: updated },
    //   });
    // }
    // // If this business isn't in the collection, do nothing
    // return Promise.resolve();
  }

  static async delete(collection: Collection) {
    const collectionDetails = {
      id: collection.id,
    };
    return API.graphql({
      query: deleteCollection,
      variables: { input: collectionDetails },
    }) as GraphQLResult<any>;
  }
}
