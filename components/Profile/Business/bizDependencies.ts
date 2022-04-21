import { createContext } from "react";
import { Business } from "../../../src/API";

// Context
export const BusinessContext = createContext<Business>(undefined!);

// Route Param List
export type BProfileStackParamList = {
  BusinessProfile: undefined;
  BusinessEditor: undefined;
  Reviews: undefined;
};
