// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Review, Business, Collection } = initSchema(schema);

export {
  Review,
  Business,
  Collection
};