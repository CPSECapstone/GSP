import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  returnBusinessTypeValue,
  returnMinorityGroupValue,
} from "../../../../constants/enumconverters";
import { Address, BUSINESS_COLORS, Color, Editor } from "../Business";
import { EditorContext, EditStackParamList } from "../EditRoutes";
import {
  ColorOption,
  ConfigureDoneButton,
  formatPhone,
  Line,
  Margin,
  styles,
} from "./FieldEditorHelpers";

export function TextEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "EditText">) {
  const { field } = route.params;
  const editor = useContext(EditorContext);
  const [text, setText] = useState(editor.business[field.key]);

  const validate = () => {
    if (
      text.length <= field.characterLimit! &&
      text.length >= field.characterMin!
    ) {
      editor.updateField(field.key, text);
      navigation.navigate("Base");
    }
  };

  useEffect(() =>
    navigation.setOptions({ headerRight: () => ConfigureDoneButton(validate) })
  );

  const lengthErr = text.length < field.characterMin!;
  return (
    <View style={{ flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10, flexDirection: "column", marginTop: 20 }}>
        <Text style={styles.editTitle}>{field.displayTitle}</Text>
        <TextInput
          multiline
          numberOfLines={10}
          maxLength={field.characterLimit}
          placeholder="Enter Text"
          onChangeText={setText}
          defaultValue={text}
        />
        <Line />
        <Text
          style={[styles.editDetails, { color: lengthErr ? "red" : "#7D7D7D" }]}
        >
          {`${text.length}\\${field.characterLimit}`}
        </Text>
        <Text style={styles.editDetails}>{field.description}</Text>
      </View>
      <Margin />
    </View>
  );
}

export function PhoneEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "EditPhone">) {
  const { field } = route.params;
  const editor = useContext(EditorContext);
  const [value, setValue] = useState(editor.business.phone);
  const [display, setDisplay] = useState(formatPhone(editor.business.phone));

  const validate = () => {
    if (value && value.length === 10) {
      editor.updateField("phone", value);
      navigation.navigate("Base");
    }
  };

  useEffect(() =>
    navigation.setOptions({ headerRight: () => ConfigureDoneButton(validate) })
  );

  const updatePhone = (newVal: string) => {
    setDisplay(formatPhone(newVal));
    setValue(newVal);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10, flexDirection: "column", marginTop: 20 }}>
        <Text style={styles.editTitle}>{field.displayTitle}</Text>
        <TextInput
          keyboardType="numeric"
          maxLength={field.characterLimit}
          placeholder="Enter Phone Number"
          onChangeText={(x) => updatePhone(x.replace(/[^0-9]/g, ""))}
          defaultValue={value}
        />
        <Line />
        <Text
          style={[
            styles.editDetails,
            { color: !value || value.length < 10 ? "red" : "#7D7D7D" },
          ]}
        >
          {display}
          {"\n"}
        </Text>
        <Text style={styles.editDetails}>{field.description}</Text>
      </View>
      <Margin />
    </View>
  );
}

export function URLEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "EditURL">) {
  const { field } = route.params;
  const editor = useContext(EditorContext);
  const [value, setValue] = useState(editor.business[field.key].toString());

  const validate = () => {
    editor.updateField(field.key, value);
    navigation.navigate("Base");
  };

  useEffect(() =>
    navigation.setOptions({ headerRight: () => ConfigureDoneButton(validate) })
  );

  return (
    <View style={{ flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10, flexDirection: "column", marginTop: 20 }}>
        <Text style={styles.editTitle}>{field.displayTitle}</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          maxLength={field.characterLimit}
          placeholder="Enter Site URL"
          onChangeText={setValue}
          defaultValue={value}
        />
        <Line />
        {/* <Text
          style={[
            styles.editDetails,
            { color: value.length < 10 ? "red" : "#7D7D7D" },
          ]}
        >
          {!validURL && "Invalid URL\n"}
        </Text> */}
        <Text style={styles.editDetails}>{field.description}</Text>
      </View>
      <Margin />
    </View>
  );
}

export function ListEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "EditList">) {
  const { field } = route.params;
  let { options } = route.params;
  const editor = useContext(EditorContext);
  const currentList = editor.business[field.key];
  options = options.filter((x) => !currentList.includes(x));
  const [list, setList] = useState(currentList);
  const [selectedValue, setSelectedValue] = useState<string>();

  const addToList = (newItem: string) => {
    setList((arr: any) => [...arr, newItem]);
    setSelectedValue(undefined);
  };

  const removeFromList = (index: number) => {
    setList((arr: any) => arr.filter((item, i) => index !== i));
  };

  const validate = () => {
    editor.updateField(field.key, list);
    navigation.navigate("Base");
  };

  useEffect(() =>
    navigation.setOptions({ headerRight: () => ConfigureDoneButton(validate) })
  );

  return (
    <View style={{ flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10, flexDirection: "column", marginTop: 20 }}>
        <Text style={styles.editTitle}>{field.displayTitle}</Text>
        {list.map((x, index) => (
          <View key={x} style={{ height: 30, flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>{returnMinorityGroupValue(x)!}</Text>
            <Pressable key={x} onPress={() => removeFromList(index)}>
              <Ionicons name="close-circle" color="grey" size={15} />
            </Pressable>
          </View>
        ))}
        <Pressable
          style={{ height: 30, flexDirection: "row" }}
          onPress={() => setSelectedValue(options[0])}
        >
          <Text style={{ flex: 1, color: "gray" }}>
            {returnMinorityGroupValue(selectedValue) || "Enter New Tag"}
          </Text>
        </Pressable>
        {selectedValue && (
          <View style={{ alignItems: "center" }}>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 230, width: "100%" }}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              {options.map((x) => (
                <Picker.Item
                  key={x}
                  label={returnMinorityGroupValue(x)!}
                  value={x}
                />
              ))}
            </Picker>
          </View>
        )}
        {selectedValue && (
          <Pressable
            style={styles.confirmButton}
            onPress={() => addToList(selectedValue!)}
          >
            <Text style={{ fontSize: 18 }}>Confirm</Text>
          </Pressable>
        )}
        <Line />
        <Text style={styles.editDetails}>{field.description}</Text>
      </View>
      <Margin />
    </View>
  );
}

export function ListEditor2({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "EditList">) {
  const { field, options } = route.params;
  const editor = useContext(EditorContext);
  const [selectedValue, setSelectedValue] = useState(
    (editor.business.tags as string[])[0]
  );

  const validate = () => {
    if (selectedValue) {
      editor.updateField(field.key, [selectedValue]);
      navigation.navigate("Base");
    }
  };

  useEffect(() =>
    navigation.setOptions({ headerRight: () => ConfigureDoneButton(validate) })
  );

  return (
    <View style={{ flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10, flexDirection: "column", marginTop: 20 }}>
        <Text style={styles.editTitle}>{field.displayTitle}</Text>
        <View style={{ alignItems: "center" }}>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 230, width: "100%" }}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            {options.map((x) => (
              <Picker.Item
                key={x}
                label={returnMinorityGroupValue(x)!}
                value={x}
              />
            ))}
          </Picker>
        </View>

        <Line />
        <Text style={styles.editDetails}>{field.description}</Text>
      </View>
      <Margin />
    </View>
  );
}

export function SelectionEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "EditSelection">) {
  const { field, options } = route.params;
  const editor = useContext(EditorContext);
  const [selectedValue, setSelectedValue] = useState(
    editor.business[field.key] || options[0]
  );

  const validate = () => {
    if (selectedValue) {
      editor.updateField(field.key, selectedValue);
      navigation.navigate("Base");
    }
  };

  useEffect(() =>
    navigation.setOptions({ headerRight: () => ConfigureDoneButton(validate) })
  );

  return (
    <View style={{ flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10, flexDirection: "column", marginTop: 20 }}>
        <Text style={styles.editTitle}>{field.displayTitle}</Text>
        <View style={{ alignItems: "center" }}>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 230, width: "100%" }}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            {options.map((x) => (
              <Picker.Item
                key={x}
                label={returnBusinessTypeValue(x)!}
                value={x}
              />
            ))}
          </Picker>
        </View>

        <Line />
        <Text style={styles.editDetails}>{field.description}</Text>
      </View>
      <Margin />
    </View>
  );
}

export function AddressEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "EditAddress">) {
  const { field } = route.params;
  const editor = useContext(EditorContext);
  const [street, setStreet] = useState(editor.business.address);
  const [city, setCity] = useState(editor.business.city);
  const [st, setSt] = useState(editor.business.state);
  const [zip, setZip] = useState(editor.business.zipcode?.toString());

  const validate = () => {
    if (street && city && st && zip) {
      editor.updateField("address", street);
      editor.updateField("city", city);
      editor.updateField("state", st);
      editor.updateField("zipcode", zip);
      navigation.navigate("Base");
    }
  };

  useEffect(() =>
    navigation.setOptions({ headerRight: () => ConfigureDoneButton(validate) })
  );

  return (
    <View style={{ flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10, flexDirection: "column", marginTop: 20 }}>
        <Text style={styles.editTitle}>{field.displayTitle}</Text>
        <TextInput
          placeholder="Enter Street Address"
          onChangeText={setStreet}
          defaultValue={street}
        />
        <Line />
        <TextInput
          placeholder="Enter City"
          onChangeText={setCity}
          defaultValue={city}
        />
        <Line />
        <TextInput
          placeholder="Enter State"
          onChangeText={setSt}
          defaultValue={st}
        />
        <Line />
        <TextInput
          placeholder="Enter Zipcode"
          onChangeText={setZip}
          defaultValue={zip}
        />
        <Line />
        <Text style={styles.editDetails}>{field.description}</Text>
      </View>
      <Margin />
    </View>
  );
}

export function ColorSelector({
  current,
  submit,
}: {
  current: string | undefined;
  submit: Function;
}) {
  if (current) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <ColorOption large color={current} onPress={() => {}} />
        </View>

        <Pressable onPress={() => submit(undefined)}>
          <Ionicons name="close-circle" color="grey" size={15} />
        </Pressable>
      </View>
    );
  }
  return (
    <View>
      <Text style={[styles.editDetails, { color: "red" }]}>
        {!current && "Selection Required"}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          flexWrap: "wrap",
        }}
      >
        {BUSINESS_COLORS.map((x) => (
          <ColorOption large key={x} color={x} onPress={() => submit(x)} />
        ))}
      </View>
    </View>
  );
}

export function ColorSetEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "EditColorSet">) {
  const { field } = route.params;
  const editor = useContext(EditorContext);
  const [primary, setPrimary] = useState(editor.business.primarycolor);
  const [secondary, setSecondary] = useState(editor.business.secondarycolor);

  const validate = () => {
    if (primary && secondary) {
      editor.updateField("primarycolor", primary);
      editor.updateField("secondarycolor", secondary);
      navigation.navigate("Base");
    }
  };

  useEffect(() =>
    navigation.setOptions({ headerRight: () => ConfigureDoneButton(validate) })
  );

  return (
    <View style={{ flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10, flexDirection: "column", marginTop: 20 }}>
        <Text style={styles.editTitle}>Primary Color</Text>
        <ColorSelector current={primary} submit={setPrimary} />
        <Line />

        <Text style={styles.editTitle}>Secondary Color</Text>
        <ColorSelector current={secondary} submit={setSecondary} />
        <Line />
        <Text style={styles.editDetails}>{field.description}</Text>
      </View>
      <Margin />
    </View>
  );
}
