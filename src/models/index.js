// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const NotificationType = {
  "OWNERSHIPREQUEST": "OWNERSHIPREQUEST",
  "OWNERSHIPAPPROVED": "OWNERSHIPAPPROVED",
  "OWNERSHIPDENIED": "OWNERSHIPDENIED"
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

const BusinessType = {
  "RESTAURANT": "RESTAURANT",
  "SHOPPING": "SHOPPING",
  "MARKET": "MARKET",
  "BEAUTY": "BEAUTY"
};

const { Notification, User, Collection, Business, Review } = initSchema(schema);

export {
  Notification,
  User,
  Collection,
  Business,
  Review,
  NotificationType,
  MinorityGroups,
  BusinessType
};