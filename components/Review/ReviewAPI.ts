import { API, graphqlOperation } from "aws-amplify";
import { createReview, updateReview } from "../../src/graphql/mutations";
import { Review } from "../../src/API";

export default class ReviewAPI {
  static async create(reviewObj: Partial<Review>) {
    return API.graphql(graphqlOperation(createReview, { input: reviewObj }));
  }

  static async update(newReview: Omit<Review, "__typename">) {
    const { createdAt, updatedAt, ...trimReview } = newReview;
    return API.graphql(
      graphqlOperation(updateReview, {
        input: trimReview,
      })
    );
  }
}
