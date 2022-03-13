/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Ionicons } from "@expo/vector-icons";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Color, Editor } from "./Business";

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
import { MinorityGroups, BusinessType, Business } from "../../../src/API";
import { S3Image, S3ImageBackground } from "../../Misc/S3Util";

const EditStack = createNativeStackNavigator<EditStackParamList>();

type BusinessEditorProps = {
  business: Business;
  submit: (edits: Partial<Business>, pImg?: string, bImg?: string) => void;
};

// eslint-disable-next-line prettier/prettier
export default function BusinessEditor({
  business,
  submit,
}: BusinessEditorProps) {
  const navigation = useNavigation();

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
      >
        {(props) => (
          <BaseEditor {...props} submit={submit} business={business} />
        )}
      </EditStack.Screen>
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

type BaseEditorRouteProps = NativeStackScreenProps<EditStackParamList, "Base">;
interface BaseEditorProps extends BaseEditorRouteProps {
  business: Business;
  submit: (edits: Partial<Business>, pImg?: string, bImg?: string) => void;
}
function BaseEditor({ navigation, route, business, submit }: BaseEditorProps) {
  const editor = new Editor(business);

  if (route.params) {
    editor.updateField(route.params.key, route.params.value);
  }

  const [pImg, setPImg] = useState<string>();
  const [bImg, setBImg] = useState<string>();

  const trySubmit = () => {
    if (Object.keys(editor.edits).length < 2 && !(pImg || bImg)) {
      navigation.goBack();
    } else {
      submit(editor.edits, pImg, bImg);
    }
  };

  React.useEffect(() =>
    navigation.setOptions({
      headerRight: () => ConfigureDoneButton(trySubmit),
    })
  );

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
          currentValue: editor.business.name,
        }),
    },
    {
      field: TypeField,
      function: () =>
        navigation.navigate("EditSelection", {
          field: TypeField,
          currentValue: editor.business.type,
          options: Array.from(enumToArray(BusinessType)),
        }),
    },
    {
      field: PhoneField,
      function: () =>
        navigation.navigate("EditPhone", {
          field: PhoneField,
          currentValue: editor.business.phone,
        }),
    },
    {
      field: AddressField,
      function: () =>
        navigation.navigate("EditAddress", {
          field: AddressField,
          currentValue: {
            address: editor.business.address,
            city: editor.business.city,
            state: editor.business.state,
            zipcode: editor.business.zipcode,
          },
        }),
    },
    {
      field: TagsField,
      function: () =>
        navigation.navigate("EditList", {
          field: TagsField,
          currentValue: editor.business.tags as string[],
          options: enumToArray(MinorityGroups),
        }),
    },
    {
      field: AboutUsField,
      function: () =>
        navigation.navigate("EditText", {
          field: AboutUsField,
          currentValue: editor.business.about,
        }),
    },
    {
      field: WebsiteField,
      function: () =>
        navigation.navigate("EditURL", {
          field: WebsiteField,
          currentValue: editor.business.website || "",
        }),
    },
    {
      field: ColorSetField,
      function: () =>
        navigation.navigate("EditColorSet", {
          field: ColorSetField,
          currentValue: {
            primary: editor.business.primarycolor as Color,
            secondary: editor.business.secondarycolor as Color,
          },
        }),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 5, width: "100%", zIndex: 1 }}>
        {bImg ? (
          <ImageBackground
            source={{ uri: bImg }}
            resizeMode="cover"
            style={styles.banner}
          />
        ) : (
          <S3ImageBackground
            S3key={`${editor.business.id}/banner`}
            style={styles.banner}
          />
        )}
        <View style={styles.darkness} />

        <Margin />
        <View
          style={[styles.avatar, { borderColor: editor.business.primarycolor }]}
        >
          {pImg ? (
            <Image
              style={{ width: "100%", aspectRatio: 1, borderRadius: 100 }}
              source={{
                uri: pImg,
              }}
            />
          ) : (
            <S3Image
              style={{ width: "100%", aspectRatio: 1, borderRadius: 100 }}
              S3key={`${editor.business.id}/profile`}
            />
          )}
          <EditButton
            position={{ bottom: -7, right: -7 }}
            onPress={() => pickImage(setPImg)}
          />
        </View>
        <Margin />
        <EditButton
          position={{ bottom: -25, right: 5 }}
          onPress={() => pickImage(setBImg)}
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
              business={editor.business}
            />
          ))}
        </View>
        <Margin />
      </View>
    </View>
  );
}

function enumToArray(enumObj: object): string[] {
  return Object.values(enumObj).filter((value) => typeof value === "string");
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

function getDisplay(business: Business, field: Field, onPress: Function) {
  let displayData: string | number | undefined | null;
  if (field.key === "address") {
    displayData = `${business.address}, ${business.city}`;
  } else if (field.key === "tags") {
    const tags = business.tags!;
    displayData = tags[0] as string;
    for (let i = 1; i < business.tags!.length; i += 1) {
      displayData += `, ${business.tags![i]}`;
    }
  } else if (field.key === "phone") {
    displayData = formatPhone(business.phone);
  } else if (field.key === "colorSet") {
    return (
      <Pressable style={{ flexDirection: "row", marginTop: 10 }}>
        <ColorOption color={business.primarycolor} onPress={() => onPress()} />
        <ColorOption
          color={business.secondarycolor}
          onPress={() => onPress()}
        />
      </Pressable>
    );
  } else {
    displayData = business[field.key];
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

type DataRowProps = { onPress: Function; field: Field; business: Business };
function DataRow({ onPress, field, business }: DataRowProps) {
  return (
    <View style={styles.dataRow}>
      <View style={styles.dataRowTitleContainer}>
        <Text style={styles.dataRowTitle}>{field.displayTitle}</Text>
      </View>
      <View style={styles.dataRowContainer}>
        {getDisplay(business, field, onPress)}
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
