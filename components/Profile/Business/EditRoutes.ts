import { Address, ColorSet, FrontendBusinessField } from "./Business";
import Field from "./Field";

export type EditStackParamList = {
  Base: { key: FrontendBusinessField; value: any } | undefined;
  EditText: { field: Field; currentValue: string };
  EditPhone: { field: Field; currentValue: string };
  EditAddress: { field: Field; currentValue: Address };
  EditSelection: { field: Field; currentValue: string; options: Array<any> };
  EditList: { field: Field; currentValue: string[]; options: Array<any> };
  EditURL: { field: Field; currentValue: string };
  EditColorSet: { field: Field; currentValue: ColorSet };
};
