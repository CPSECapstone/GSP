import Business from "./Business";

export default interface Field {
  key: keyof Business;
  displayTitle: string;
  description: string;
  characterLimit?: number;
  characterMin?: number;
}

export const NameField: Field = {
  key: "name",
  displayTitle: "Name",
  description: "test1",
  characterLimit: 50,
  characterMin: 3,
};
export const TypeField: Field = {
  key: "businessType",
  displayTitle: "Business Type",
  description: "test4",
};
export const PhoneField: Field = {
  key: "phone",
  displayTitle: "Phone Number",
  description: "test2",
  characterLimit: 10,
  characterMin: 10,
};
export const AddressField: Field = {
  key: "address",
  displayTitle: "Address",
  description: "test3",
};
export const TagsField: Field = {
  key: "tags",
  displayTitle: "Tags",
  description: "test5",
};
export const AboutUsField: Field = {
  key: "aboutUs",
  displayTitle: "About Us",
  description: "test6",
  characterLimit: 300,
  characterMin: 50,
};
export const WebsiteField: Field = {
  key: "website",
  displayTitle: "Website",
  description: "test7",
};
export const ColorSetField: Field = {
  key: "colorSet",
  displayTitle: "Profile Colors",
  description: "test8",
};
