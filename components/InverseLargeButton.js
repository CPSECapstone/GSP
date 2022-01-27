import {Pressable, StyleSheet, Text } from "react-native";

const LoginButtonStyle = StyleSheet.create({
   LargeButton: {
      height: 70,
      width: 314,
      backgroundColor: 'white',
      borderRadius: 50,
      alignSelf: 'center'

   },
   text: {
      fontSize: 30,
      color: 'rgb(250, 74, 12)',
      alignSelf: 'center',
      fontWeight: 'bold',
      paddingTop: 15,
   }
})

function InverseLargeButton(props) {

   return (
      <Pressable style = {LoginButtonStyle.LargeButton}
       onPress={props.function}>
          <Text style={LoginButtonStyle.text}>{props.label}</Text>
       </Pressable>


   );
}

export default InverseLargeButton;