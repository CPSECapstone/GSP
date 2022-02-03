/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Ionicons } from "@expo/vector-icons";
// import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  TextInput,
} from "react-native";
import { Business } from "./Business"
import { ProfileEditorProps } from "../../route-settings";

const profileData = new Business(
  "Milk In It",
  "Milkinit@gmail.com",
  "Restaurant",
  "#0394fc",
  "grey",
  "(805) 645-2301",
  "195 N Santa Rosa St",
  "San Luis Obispo",
  "California",
  93405,
  "https://www.milk-in-it.com/",
  ["Asian-American", "American Fusion", "Family-owned", "Small business"],
  "https://www.milk-in-it.com/uploads/b/815c5b9666f8d1247820b963f62921ff010e53ce81ca60cc0f303331f5d83f1a/Milk%20in%20it_Sticker-01_1586286751.png",
  "https://www.milk-in-it.com/uploads/1/3/1/4/131411053/s823200538205006002_p76_i2_w2077.jpeg",
  {menu : "https://www.milk-in-it.com/signature"},
  "Tea house serving milk tea, boba and more. We use authentic recipes for our tapioca and import the highest quality black, oolong, and green teas. We are a small, locally-owned business with a small team dedicated to making you awesome drinks to brighten your day",
);

function Margin() {
  return <View style={{ flex: 1 }} />;
}

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

function Line() {
  return (
    <View
      style={{
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom: 10,
        marginRight: "-10%",
        marginLeft: "-10%",
      }}
    />
  );
}


type DataRowProps = {title: string, data: any, setEdit: Function}
function DataRow({ title, data, setEdit } : DataRowProps) {
  return(
    <View style={{height: 50, flexDirection: "row"}}>
      <View style={{ flex: 4,  width: "100%", justifyContent: "center"}}>
        <Text style={{fontFamily: "Mada-Black", color: "#7D7D7D"}}>{title}</Text>
      </View>
      
      <View style={{flex: 6,  width: "100%", height: "100%",justifyContent: "center"}}>
        <Pressable onPress={() => setEdit(title)}>
          <Text numberOfLines={1} style={{fontFamily: "Mada-Black", color: "#4F4F4F"}}>{data}</Text>
          <DataLine/>
        </Pressable>
      </View>
    </View>
  )
}

function EditButton({ position } : any) {
  return(
    <Pressable style={[styles.editButton, position]}>
      <Ionicons name="pencil" size={30} color="black" />
    </Pressable>
  )
}

function HeaderButton({ title, onPress } : {title: string, onPress : Function}) {
  return(
    <Pressable onPress={() => onPress()}>
      <Text>{title}</Text>
    </Pressable>
  )
}

function DoneButton({ onPress } : {onPress : Function}) {
  return(
    <Pressable onPress={() => onPress()}>
      <Text style={{fontWeight: "bold", color: "#DA5125"}}>Done</Text>
    </Pressable>
  )
}

const headerOptions : Partial<BottomTabNavigationOptions> = {
  headerShown: true,
  headerTitle: "Edit Profile",
  headerLeft: () => <HeaderButton title="Cancel" onPress={() => {}}/>,
  headerRight: () => <DoneButton onPress={alert}/>,
}

function getEditHeaderOptions(edit: string, onBack: Function, onDone: Function) : Partial<BottomTabNavigationOptions> {
  return {
    headerShown: true,
  headerTitle: edit,
  headerLeft: () => <HeaderButton title="Back" onPress={onBack}/>,
  headerRight: () => <DoneButton onPress={onDone}/>,
  }
}

export default function ProfileEditor({ navigation } : ProfileEditorProps) {

  const [edit, setEdit] = useState("");
  const [text, setText] = useState("");

  const updateEdit = (editValue: string) => {
    setEdit(editValue)
    setText(profileData.name)
  }

  const updateField = (value: string) => {
    setEdit("")
    profileData.name = value
  }

  if (!edit) {

    useEffect(() => {
      navigation.setOptions(headerOptions)
    });

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 5, width: "100%", zIndex: 1}}>
          <ImageBackground
            source={{uri: profileData.bannerImage}}
            resizeMode="cover"
            style={styles.banner}
          />
          <View style={styles.darkness} />
  
          <Margin/>
            <View style={styles.avatar}>
              <Image style={{width: "100%", aspectRatio: 1}}source={{uri: profileData.profileImage}} />
              <EditButton position={{bottom: -7, right: -7}} />
            </View>
          <Margin/>
          <EditButton position={{bottom: -25, right: 5}} />
        </View>
  
        <View style={{flex: 10, flexDirection: "row"}}>
          <Margin/>
          <View style={{flex: 10, flexDirection: "column", marginTop: 20}}>
            <DataRow title="Name" setEdit={updateEdit} data={profileData.name} />
            <DataRow title="Business Type" setEdit={updateEdit} data={profileData.category} />
            <DataRow title="Phone" setEdit={updateEdit} data={profileData.phone} />
            <DataRow title="Address" setEdit={updateEdit} data={profileData.address} />
            <DataRow title="Website" setEdit={updateEdit} data={profileData.website.href} />
            <DataRow title="Tags" setEdit={updateEdit} data={profileData.tags.reduce((acc, curr) => `${acc}, ${curr}`)} />
            <DataRow title="About Us" setEdit={updateEdit} data={profileData.aboutUs} />
          </View>
          <Margin/>
        </View>
        
  
      </View>
    )
  }
  useEffect(() => {
    navigation.setOptions(getEditHeaderOptions(edit, () => setEdit(""), () => updateField(text)));
  });
  // return(<EditScreen value={profileData[edit]} onFinish={(x: string) => {profileData.name = x; setEdit("")}}/>)

  return(
    <View style={{flex: 1}}>
      <View style={{flex: 10, flexDirection: "row"}}>
        <Margin/>
        <View style={{flex: 10, flexDirection: "column", marginTop: 20}}>
          <Text style={{fontFamily: "Mada-Bold", color: "#7D7D7D", marginBottom: 10}}>{edit}</Text>
          <TextInput
            style={{}}
            placeholder="Enter your email"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
          />
          <Line/>
          <Text style={{fontFamily: "Mada-Regular", fontSize: 12, color: "#7D7D7D"}}>
            {`Help people discover your business by using the name your business is known by. \n\nYou can only change your business name once a month.`}
          </Text>
        </View>
        <Margin/>
      </View>
    </View>
  )
}

// type EditScreenProps = {value: string, onFinish: Function}
// function EditScreen({ value, onFinish } : EditScreenProps) {
  
// }


const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  darkness: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%"
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
    borderColor: profileData.colorPrimary,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
