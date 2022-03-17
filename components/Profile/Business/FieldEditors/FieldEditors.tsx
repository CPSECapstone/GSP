import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Picker } from "react-native";
import {
  returnBusinessTypeValue,
  returnMinorityGroupValue,
} from "../../../../constants/enumconverters";
import { Address, BUSINESS_COLORS, Color } from "../Business";
import { EditStackParamList } from "../EditRoutes";
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
  const { field, currentValue } = route.params;
  const [text, setText] = useState(currentValue);

  const validate = () => {
    if (
      text.length <= field.characterLimit! &&
      text.length >= field.characterMin!
    ) {
      navigation.navigate("Base", { key: field.key, value: text });
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
  const { field, currentValue } = route.params;
  const [value, setValue] = useState(currentValue);
  const [display, setDisplay] = useState(formatPhone(currentValue));

  const validate = () => {
    if (value.length === 10) {
      navigation.navigate("Base", { key: field.key, value });
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
            { color: value.length < 10 ? "red" : "#7D7D7D" },
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
  const { field, currentValue } = route.params;
  const [value, setValue] = useState(currentValue.toString());

  const validate = () => {
    navigation.navigate("Base", { key: field.key, value });
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

/*
export function ListEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "EditList">) {
  const { field, currentValue } = route.params;
  const [list, setList] = useState(currentValue);
  const [text, setText] = useState("");

  const addToList = (newItem: string) => {
    setList((arr) => [...arr, newItem]);
    setText("");
  };

  const removeFromList = (index: number) => {
    setList((arr) => arr.filter((item, i) => index !== i));
  };

  const validate = () => {
    navigation.navigate("Base", { key: field.key, value: list });
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
            <Text style={{ flex: 1 }}>{x}</Text>
            <Pressable key={x} onPress={() => removeFromList(index)}>
              <Ionicons name="close-circle" color="grey" size={15} />
            </Pressable>
          </View>
        ))}
        <TextInput
          onSubmitEditing={() => addToList(text)}
          maxLength={field.characterLimit}
          placeholder="Enter New Tag"
          onChangeText={setText}
          defaultValue={text}
        />
        <Line />
        <Text style={styles.editDetails}>{field.description}</Text>
      </View>
      <Margin />
    </View>
  );
}
*/

export function ListEditor({
  navigation,
  route,
}: NativeStackScreenProps<EditStackParamList, "EditList">) {
  const { field, currentValue, options } = route.params;
  const [selectedValue, setSelectedValue] = useState(currentValue[0]);

  const validate = () => {
    if (selectedValue) {
      navigation.navigate("Base", { key: field.key, value: [selectedValue] });
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
  const { field, currentValue, options } = route.params;
  const [selectedValue, setSelectedValue] = useState(currentValue);

  const validate = () => {
    if (selectedValue) {
      navigation.navigate("Base", { key: field.key, value: selectedValue });
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
  const { field, currentValue } = route.params;
  const [street, setStreet] = useState(currentValue.address);
  const [city, setCity] = useState(currentValue.city);
  const [st, setSt] = useState(currentValue.state);
  const [zip, setZip] = useState(currentValue.zipcode.toString());

  const validate = () => {
    if (street && city && st && zip) {
      const newAddress: Address = {
        address: street,
        city,
        state: st,
        zipcode: zip as unknown as number,
      };
      navigation.navigate("Base", { key: field.key, value: newAddress });
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
  current: Color | undefined;
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
  const { field, currentValue } = route.params;
  const [primary, setPrimary] = useState<Color | undefined>(
    currentValue.primary
  );
  const [secondary, setSecondary] = useState<Color | undefined>(
    currentValue.secondary
  );

  const validate = () => {
    if (primary && secondary) {
      navigation.navigate("Base", {
        key: field.key,
        value: { primary, secondary },
      });
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
