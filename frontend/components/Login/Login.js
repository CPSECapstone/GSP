import {Text, Image, TextInput, StyleSheet} from "react-native";
import {View} from "react-native";

import LargeButton from "../Misc/LargeButton";

function createAccount() {
   console.log("creating account");
}

const styles = StyleSheet.create({
   login: {
      fontSize: 30,
      textAlign: 'left',
      position: "absolute",
   },

   account: {
      width: 150,
      height: 150,
      marginTop: 10,
      alignSelf: 'center'
   },

   email: {
      marginTop: 10,
      paddingBottom: 5,
      marginBottom: 50,
      
      borderBottomColor:'grey',
      borderBottomWidth: 2
   },

   password: {
      marginTop: 10,
      marginBottom: 50,
      paddingBottom: 5,
      
      borderBottomColor:'grey',
      borderBottomWidth: 2
   },
   emailText: {
      fontSize: 15,
      paddingTop: 50,
      fontWeight: 'bold',
      color: '#B1B1B3'
      
   },
   passwordText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#B1B1B3',
   }
});

function Login(props) {

   function handleChange() {
      // code to handle change in email and password
   }
   return (
      <View className="Login">
            <Text style={styles.login}>Log In</Text>


            <Image source={require('../assets/default-avatar.jpeg')}
               style={styles.account}
            ></Image>

            <Text style={styles.emailText}>Email address</Text>
            <TextInput
               style={styles.email}
               placeholder="Enter your email"
            />

            <Text style={styles.passwordText}>Password</Text>
            <TextInput
               style={styles.password}
               placeholder="Enter your password"
            />
         
         <Text style={{color: 'rgb(250, 74, 12)', paddingBottom: 20, textAlign: 'right', fontWeight: 'bold'}}>Forgot Password?</Text>
         <LargeButton label="login" style={styles.loginButton}></LargeButton>

         <Text 
         style={{marginTop: 20, alignSelf: 'center'}}>Don't have an Account? <Text onClick={createAccount} style={{color: 'rgb(250, 74, 12)', textDecorationLine: 'underline'}}>Sign Up</Text></Text>
      </View>
   )
}

export default Login;