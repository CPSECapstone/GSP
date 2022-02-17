import Business, { Address, ColorSet } from "./Business";
import Field from "./Field";

export type EditStackParamList = {
  Base: { key: keyof Business; value: any } | undefined;
  EditText: { field: Field; currentValue: string };
  EditPhone: { field: Field; currentValue: string };
  EditAddress: { field: Field; currentValue: Address };
  EditSelection: { field: Field; currentValue: string; options: Array<any> };
  EditList: { field: Field; currentValue: string[] };
  EditURL: { field: Field; currentValue: URL };
  EditColorSet: { field: Field; currentValue: ColorSet };
};
