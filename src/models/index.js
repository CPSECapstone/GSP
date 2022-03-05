// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const BusinessType = {
  "RESTAURANT": "RESTAURANT",
  "SHOPPING": "SHOPPING",
  "MARKET": "MARKET",
  "BEAUTY": "BEAUTY"
};

const MinorityGroups = {
  "ASIANAMERICAN": "ASIANAMERICAN",
  "AFRICANAMERICAN": "AFRICANAMERICAN",
  "LATINX": "LATINX",
  "MIDDLEEASTERN": "MIDDLEEASTERN",
  "NATIVEAMERICAN": "NATIVEAMERICAN",
  "PACIFICISLANDER": "PACIFICISLANDER",
  "ALASKANATIVE": "ALASKANATIVE",
  "MUSLIM": "MUSLIM",
  "HALAL": "HALAL",
  "JEWISH": "JEWISH",
  "KOSHER": "KOSHER",
  "HINDU": "HINDU",
  "SIKH": "SIKH"
};

const { Review, Business, Collection } = initSchema(schema);

export {
  Review,
  Business,
  Collection,
  BusinessType,
  MinorityGroups
};