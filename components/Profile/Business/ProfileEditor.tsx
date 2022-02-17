/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable prettier/prettier */
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

function BaseEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "Base">) {
  const business = dummyBusiness;

  if (route.params) {
    business[route.params.key] = route.params.value;
  }

  const [profileImage, setProfileImage] = useState(business.profileImage);
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
          currentValue: business.website,
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
            source={{ uri: profileImage }}
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
function EditButton({ position, onPress }: EditButtonProps) {
  return (
    <Pressable style={[styles.editButton, position]} onPress={() => onPress()}>
      <Ionicons name="pencil" size={30} color="black" />
    </Pressable>
  );
}
