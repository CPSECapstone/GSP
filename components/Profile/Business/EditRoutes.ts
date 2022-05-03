import { createContext } from "react";
import { Editor } from "./Business";
import Field from "./Field";

export const EditorContext = createContext<Editor>(undefined!);

export type EditStackParamList = {
  Base: undefined;
  EditText: { field: Field };
  EditPhone: { field: Field };
  EditAddress: { field: Field };
  EditSelection: { field: Field; options: Array<any> };
  EditList: { field: Field; options: Array<any> };
  EditURL: { field: Field };
  EditColorSet: { field: Field };
};
