import React from "react";
import {View, Pressable, Text, TextInput, Image} from "react-native";
import LargeButton from "./LargeButton";


function ForgotPass2() {
   return (
      <View>
         <Pressable>
            <Text>Back</Text>
         </Pressable>

         <Text>Forgot Password</Text>

         <Image source={require('../assets/questionmark.jpg')}></Image>

         <Text>The link has been sent to your email.</Text>
         <LargeButton label="Resend Email"/>
         <LargeButton label="Done"/>

         
      </View>
   )
}