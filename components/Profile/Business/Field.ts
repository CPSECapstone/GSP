import { FrontendBusinessField } from "./Business";

export default interface Field {
  key: FrontendBusinessField;
  displayTitle: string;
  description: string;
  characterLimit?: number;
  characterMin?: number;
}

export const NameField: Field = {
  key: "name",
  displayTitle: "Name",
  description:
    "Help people discover your business by using the name your business is known by. You can only change your business name once a month.",
  characterLimit: 50,
  characterMin: 3,
};
export const TypeField: Field = {
  key: "type",
  displayTitle: "Business Type",
  description: "Select which category your business falls under.",
};
export const PhoneField: Field = {
  key: "phone",
  displayTitle: "Phone Number",
  description:
    "Include the main phone number customers can reach your business at.",
  characterLimit: 10,
  characterMin: 10,
};
export const AddressField: Field = {
  key: "address",
  displayTitle: "Address",
  description: "Direct customers to your business with its address.",
};
export const TagsField: Field = {
  key: "tags",
  displayTitle: "Tags",
  description:
    "Help people discover and understand your business by adding tags.",
};
export const AboutUsField: Field = {
  key: "about",
  displayTitle: "About Us",
  description:
    "Include a description about your business to convey your history and values as a minority owned business.",
  characterLimit: 300,
  characterMin: 50,
};
export const WebsiteField: Field = {
  key: "website",
  displayTitle: "Website",
  description: "Share your link to your businesses website here.",
};
export const ColorSetField: Field = {
  key: "colorSet",
  displayTitle: "Profile Colors",
  description:
    "Customize your profile’s color accents to match your business’s branding.",
};
