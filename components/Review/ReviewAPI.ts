import { API, graphqlOperation } from "aws-amplify";
import { createReview, updateReview } from "../../src/graphql/mutations";
import { Review } from "../../src/API";

export default class ReviewAPI {
  static async create() {
    const ratingObj = {
      rating: 4,
      comments: "",
      business: "022b427c-bf22-4f96-afd0-9823ee47071d",
    };

    return API.graphql(graphqlOperation(createReview, { input: ratingObj }));
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
