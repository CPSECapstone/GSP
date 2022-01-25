import React from "react";
import {View, Pressable, Text, TextInput, Image} from "react-native";
import LargeButton from "./LargeButton";


function ForgotPass() {
   return (
      <View>
         <Pressable>
            <Text>Back</Text>
         </Pressable>

         <Text>Forgot Password</Text>


         <Text>Email address</Text>
            <TextInput
               placeholder="Enter your email"/>

         <Text>Enter your email and we will send you a link to reset your password</Text>
         <LargeButton label="Reset Password"></LargeButton>

         
      </View>
   )
}

export default ForgotPass;