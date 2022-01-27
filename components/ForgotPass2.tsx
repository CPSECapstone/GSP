import React from "react";
import {View, Pressable, Text, TextInput, Image} from "react-native";
import LargeButton from "./LargeButton";
import { ForgotPass2Props } from "../route-settings";
import {styles} from "./Login";
import InverseLargeButton from "./InverseLargeButton";


const forgotPassStyle = {
   container: {
      margin: 50,
      paddingTop: 10
   },
   back: {
      fontSize: 15,
      fontWeight: "bold",
   },

   forgotPassword: {
      fontSize: 20,
      fontWeight: "bold",
   },
   navbar: {
      borderBottomColor:'#B1B1B3',
      borderBottomWidth: 2,
      marginBottom: 100
   },
   image: {
      width: 150,
      height: 150,
      alignSelf: "center",
      marginBottom: 200
   }
}
function ForgotPass2({ navigation }: ForgotPass2Props) {
   return (
      <View style={forgotPassStyle.container}>
         <View style={forgotPassStyle.navbar}>
            <Pressable onPress={()=> navigation.navigate("Login")}>
               <Text style={forgotPassStyle.back}>Back <Text style={forgotPassStyle.forgotPassword}>Forgot Password</Text>
               </Text>
            </Pressable>
         </View>

         
         <Text style={{marginTop: 20, marginBottom: 20, alignSelf: 'center', color: '#B1B1B3'}}>The link has been sent to your email.</Text>
         <InverseLargeButton label="Resend Email"></InverseLargeButton>
         <LargeButton label="Done"></LargeButton>

         
      </View>
   )
}

export default ForgotPass2;