import {Text, Image, TextInput, StyleSheet} from "react-native";
import {View} from "react-native";
import { LoginProps } from "../route-settings";
import LargeButton from "../components/LargeButton";

function createAccount() {
   console.log("creating account");
}


const styles = StyleSheet.create({
   login: {
      fontSize: 30,
      textAlign: 'left',
      marginTop: 40,
      marginLeft: 10
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
      marginLeft: 20,
      marginRight: 20,
      borderBottomColor:'grey',
      borderBottomWidth: 2
   },

   password: {
      marginTop: 10,
      marginBottom: 50,
      paddingBottom: 5,
      marginLeft: 20,
      marginRight: 20,
      borderBottomColor:'grey',
      borderBottomWidth: 2
   },
   emailText: {
      fontSize: 15,
      paddingTop: 50,
      marginLeft: 20,
      marginRight: 20,
      fontWeight: 'bold',
      color: '#B1B1B3'
      
   },
   passwordText: {
      fontSize: 15,
      marginLeft: 20,
      marginRight: 20,
      fontWeight: 'bold',
      color: '#B1B1B3',
   }
});

function Login({ navigation }: LoginProps) {

   function handleChange() {
      // code to handle change in email and password
   }
   return (
      <View>
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
               secureTextEntry
               style={styles.password}
               placeholder="Enter your password"
            />
         
         <Text style={{color: 'rgb(250, 74, 12)', paddingBottom: 20, marginLeft: 20, marginRight: 20, textAlign: 'right', fontWeight: 'bold'}}>Forgot Password?</Text>
         <LargeButton label="Login" function={() => navigation.navigate("App")}></LargeButton>

         <Text 
         style={{marginTop: 20, alignSelf: 'center'}}>Don't have an Account? <Text style={{color: 'rgb(250, 74, 12)', textDecorationLine: 'underline'}}>Sign Up</Text></Text>
      </View>
   )
}

export default Login;