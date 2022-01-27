import React from "react";
import {View, Pressable, Text, TextInput, Image} from "react-native";
import LargeButton from "./LargeButton";
import { ForgotPassProps } from "../route-settings";
import {styles} from "./Login";


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
function ForgotPass({ navigation }: ForgotPassProps) {
   return (
      <View style={forgotPassStyle.container}>
         <View style={forgotPassStyle.navbar}>
            <Pressable onPress={()=> navigation.navigate("Login")}>
               <Text style={forgotPassStyle.back}>Back <Text style={forgotPassStyle.forgotPassword}>Forgot Password</Text>
               </Text>
            </Pressable>
         </View>

         <Image source={require('../assets/default-avatar.jpeg')}
               style={forgotPassStyle.image}
            ></Image>


         <Text style={styles.emailText}>Email address</Text>
            <TextInput style={styles.email}
               placeholder="Enter your email"/>

         <Text style={{marginTop: 20, marginBottom: 20, alignSelf: 'center', color: '#B1B1B3'}}>Enter your email and we will send you a link to reset your password</Text>
         <LargeButton label="Reset Password"></LargeButton>

         
      </View>
   )
}

export default ForgotPass;