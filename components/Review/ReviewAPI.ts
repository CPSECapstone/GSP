import { API, graphqlOperation } from "aws-amplify";
import { createReview, updateReview } from "../../src/graphql/mutations";
import { Review } from "../../src/API";

export default class ReviewAPI {
  static async create(reviewObj: Partial<Review>) {
    return API.graphql(graphqlOperation(createReview, { input: reviewObj }));
  }

  static async update(review: Review) {
    return API.graphql(
      graphqlOperation(updateReview, {
        input: {
          id: review.id,
          website: "https://direct.chownow.com/order/26027/locations/38533",
        },
      })
    );
  }
}
