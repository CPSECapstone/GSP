/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Ionicons } from "@expo/vector-icons";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Storage } from "@aws-amplify/storage";
import { Address, BusinessType, BUSINESS_TYPES, ColorSet } from "./Business";
import { ProfileEditorProps } from "../../../route-settings";
import Field, {
  AboutUsField,
  AddressField,
  ColorSetField,
  NameField,
  PhoneField,
  TagsField,
  TypeField,
  WebsiteField,
} from "./Field";
import { EditStackParamList } from "./EditRoutes";
import {
  ColorOption,
  ConfigureBackButton,
  ConfigureDoneButton,
  formatPhone,
  Margin,
} from "./FieldEditors/FieldEditorHelpers";
import {
  TextEditor,
  PhoneEditor,
  AddressEditor,
  SelectionEditor,
  ListEditor,
  URLEditor,
  ColorSetEditor,
} from "./FieldEditors/FieldEditors";
import dummyBusiness from "./tempdata";

const EditStack = createNativeStackNavigator<EditStackParamList>();

export default function ProfileEditor({ navigation }: ProfileEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const submit = (): void => {};

  return (
    <EditStack.Navigator
      initialRouteName="Base"
      // eslint-disable-next-line @typescript-eslint/no-shadow
      screenOptions={({ navigation, route }) => ({
        title:
          route.params && "field" in route.params
            ? route.params.field.displayTitle
            : "Edit Profile",
        headerStyle: { backgroundColor: "#f2f2f2" },
        headerLeft: () => ConfigureBackButton("Back", navigation.goBack),
      })}
    >
      <EditStack.Screen
        name="Base"
        options={{
          headerLeft: () => ConfigureBackButton("Cancel", navigation.goBack),
        }}
        component={BaseEditor}
      />
      <EditStack.Screen name="EditText" component={TextEditor} />
      <EditStack.Screen name="EditPhone" component={PhoneEditor} />
      <EditStack.Screen name="EditAddress" component={AddressEditor} />
      <EditStack.Screen name="EditSelection" component={SelectionEditor} />
      <EditStack.Screen name="EditList" component={ListEditor} />
      <EditStack.Screen name="EditURL" component={URLEditor} />
      <EditStack.Screen name="EditColorSet" component={ColorSetEditor} />
    </EditStack.Navigator>
  );
}

async function S3ImageUpload(file: string) {
  const photo = await fetch(file);
  const photoBlob = await photo.blob();

  const { key } = await Storage.put("examples.png", photoBlob, {
    level: "protected",
    contentType: "image/png",
  });

  console.log("S3 Object key", key);
}

function BaseEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "Base">) {
  const business = dummyBusiness;

  if (route.params) {
    business[route.params.key] = route.params.value;
  }

  // const [profileImage, setProfileImage] = useState(business.profileImage);
  const [bannerImage, setBannerImage] = useState(business.bannerImage);

  useEffect(() =>
    navigation.setOptions({ headerRight: () => ConfigureDoneButton(submit) })
  );

  const submit = (): void => {};

  const pickImage = async (setImage: Function) => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      S3ImageUpload(result.uri);
      setImage(result.uri);
    }
  };

  const FieldRouteList: { field: Field; function: Function }[] = [
    {
      field: NameField,
      function: () =>
        navigation.navigate("EditText", {
          field: NameField,
          currentValue: business.name,
        }),
    },
    {
      field: TypeField,
      function: () =>
        navigation.navigate("EditSelection", {
          field: TypeField,
          currentValue: business.businessType,
          options: Array.from(BUSINESS_TYPES),
        }),
    },
    {
      field: PhoneField,
      function: () =>
        navigation.navigate("EditPhone", {
          field: PhoneField,
          currentValue: business.phone,
        }),
    },
    {
      field: AddressField,
      function: () =>
        navigation.navigate("EditAddress", {
          field: AddressField,
          currentValue: business.address,
        }),
    },
    {
      field: TagsField,
      function: () =>
        navigation.navigate("EditList", {
          field: TagsField,
          currentValue: business.tags,
        }),
    },
    {
      field: AboutUsField,
      function: () =>
        navigation.navigate("EditText", {
          field: AboutUsField,
          currentValue: business.aboutUs,
        }),
    },
    {
      field: WebsiteField,
      function: () =>
        navigation.navigate("EditURL", {
          field: WebsiteField,
          currentValue: business.website || "",
        }),
    },
    {
      field: ColorSetField,
      function: () =>
        navigation.navigate("EditColorSet", {
          field: ColorSetField,
          currentValue: business.colorSet,
        }),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 5, width: "100%", zIndex: 1 }}>
        <ImageBackground
          source={{ uri: bannerImage }}
          resizeMode="cover"
          style={styles.banner}
        />
        <View style={styles.darkness} />

        <Margin />
        <View
          style={[styles.avatar, { borderColor: business.colorSet.primary }]}
        >
          <Image
            style={{ width: "100%", aspectRatio: 1, borderRadius: 100 }}
            source={{
              uri: "https://minoritymarket-imagestore24817-staging.s3.us-west-1.amazonaws.com/protected/us-west-1%3A9ee32d90-5911-41ef-85a5-e6240c050c8d/example.png?AWSAccessKeyId=ASIAW6COXMO5LC2EJOBT&Expires=1646443204&Signature=prPQ1vWGb8MP5mlDZG%2B73chdPcg%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMSJIMEYCIQCIjTlXTyH8vXsAsZBqKMFQ9QmF%2Fqs2w0ClHffHjvLLjAIhAOninvIHDmzbydZIWTLw2KhlCowwW8Yh2h%2BdihELWG5JKsQECGoQABoMNDc2OTA2NDgwNTcwIgy681%2Fswhz1xAMF2L0qoQQDZ5%2BO8jroSPAy53%2BiBwFaORI7u7v2s1LexGRCDV6yYMUr6vNpLu9n6Z%2BhB0B%2BmhrtnirODvVDXTs%2B8Xvlzx80iN7WNvED9blhlsyaNwN%2B2LdoE8gm2tlIlhCI1sCapfzUWwoQrquEamNhulcZ62lmNs25EmLlj%2B3dt0NzjdZ4xSqoQA9j6ZeWfBkT6vGKzGA39F8zl%2BT706gqYF5JRt1c5KjtgeX%2FzykCM%2BOGMynouNt1YFvY26IbOdUjQTTxcGT2JsZldx8rt0wKrgFh7N8UzdQDAUcVjDqdYu85RmaQ4uOx6W6JDSLe1xmG2R2YYKYErNKQA8hXrxYoNYqhZz3qy%2FfUIJtPM1fz4toyjl5aAWoIFn2eUKIY232qzHcPmHnQyCs%2BerslUrlXkAQjZagaY1yKe2ulbw46tfkxKgXKO9vw4eKYneVNjH19%2FBuNl9ke7vKiLuJ8WyvQ1h11LHNtC7l2qb%2Bgwnsxgdbx%2B7xqlu662CLI9RZpWiRG6vYoL9c6QpA38siVUq7p%2Bx79zgp3GS1hp0MDJ09Z4UD70fu6zLsKA7nyEumLhdV0N7IONKXClfYutL0fuig1f3lgUjTRgoqadwDS8IatvduWFR1wBSlUlb%2F60vuSRt7yZNfUaWVLALrIQeCfCHbpfuEDnN%2FTF%2Bv2%2BbEpPBaEm%2FjkQL2jS42BQVoEHiAKgl1zryrap4E3L2d6%2FCJDrHFbARAU3AKnrzCV84qRBjqEAgSGf6PczzLArwfXoToiLyxUF569NOD%2FKePMZwrJ74OvwObQO12Jd2ATLvhTzFEKBzHSp%2BBMy%2FSCkKT9idxw7AfOy5a8MNXqpnmEsDjebbbu8jv5dTToxqUFq4WYWdnWBH17qXIJi5xEH7dnkR1O9SM8p9%2FtDpoFR5rqggH2Hsm0TcRRWDjl%2BxNGXP2WuAWtz%2B4mgAVKK4%2FI9M36nX2YNkWXIljrsPoleVp4pGcJaafzmYeHLWuqBisyIRZJUNJWbGtxUOvfMp7XE2kaMwsIPSUYadcg6dWYWdzpJq3LHNCwpwje4ANdkfpDQDlfeqFzBD2Jpio5O7KAN0OYCcGdnsN54OfI",
            }}
          />
          <EditButton
            position={{ bottom: -7, right: -7 }}
            onPress={() => pickImage(setProfileImage)}
          />
        </View>
        <Margin />
        <EditButton
          position={{ bottom: -25, right: 5 }}
          onPress={() => pickImage(setBannerImage)}
        />
      </View>

      <View style={{ flex: 10, flexDirection: "row" }}>
        <Margin />
        <View style={{ flex: 10, flexDirection: "column", marginTop: 20 }}>
          {FieldRouteList.map((x) => (
            <DataRow
              key={x.field.displayTitle}
              onPress={x.function}
              field={x.field}
              data={business[x.field.key]}
            />
          ))}
        </View>
        <Margin />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  darkness: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
  },
  editButton: {
    width: 50,
    position: "absolute",
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
  avatar: {
    flex: 5,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 4,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  dataRow: {
    height: 50,
    flexDirection: "row",
  },
  dataRowTitleContainer: {
    flex: 4,
    width: "100%",
    justifyContent: "center",
  },
  dataRowTitle: {
    fontFamily: "Mada-Black",
    color: "#7D7D7D",
  },
  dataRowContainer: {
    flex: 6,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  dataRowText: {
    fontFamily: "Mada-Black",
    color: "#4F4F4F",
  },
});

function DataLine() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: -15,
        width: "120%",
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1,
      }}
    />
  );
}

type BusinessProperty =
  | string
  | ColorSet
  | BusinessType
  | Address
  | URL
  | string[]
  | undefined;
function getDisplay(data: BusinessProperty, field: Field, onPress: Function) {
  let displayData;
  if (field.key === "address") {
    const { address, city } = data as Address;
    displayData = `${address}, ${city}`;
  } else if (field.key === "website" || field.key === "menu") {
    displayData = data?.toString();
  } else if (field.key === "tags") {
    const arr = data as string[];
    displayData = `${arr[0]}, ${arr[1]}`;
  } else if (field.key === "phone") {
    displayData = formatPhone(data as string);
  } else if (field.key === "colorSet") {
    const { primary, secondary } = data as ColorSet;
    return (
      <Pressable style={{ flexDirection: "row", marginTop: 10 }}>
        <ColorOption color={primary} onPress={() => onPress()} />
        <ColorOption color={secondary} onPress={() => onPress()} />
      </Pressable>
    );
  } else {
    displayData = data;
  }
  return (
    <Pressable onPress={() => onPress()}>
      <Text numberOfLines={1} style={styles.dataRowText}>
        {displayData}
      </Text>
      <DataLine />
    </Pressable>
  );
}

type DataRowProps = { onPress: Function; field: Field; data: BusinessProperty };
function DataRow({ onPress, field, data }: DataRowProps) {
  return (
    <View style={styles.dataRow}>
      <View style={styles.dataRowTitleContainer}>
        <Text style={styles.dataRowTitle}>{field.displayTitle}</Text>
      </View>
      <View style={styles.dataRowContainer}>
        {getDisplay(data, field, onPress)}
      </View>
    </View>
  );
}

type EditButtonProps = { position: Object; onPress: Function };
export function EditButton({ position, onPress }: EditButtonProps) {
  return (
    <Pressable style={[styles.editButton, position]} onPress={() => onPress()}>
      <Ionicons name="pencil" size={30} color="black" />
    </Pressable>
  );
}
