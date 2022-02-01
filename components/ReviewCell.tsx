import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export const styles = StyleSheet.create({
   reviewCell: {
      width: 200,
      backgroundColor: 'white'
   },
   description: {
      flex: 1,
      flexWrap: 'wrap'
   }

});

interface ReviewCellProps {
   restaurant: String;
   rating: Number;
   srcImage: String;
   description: String;
 }

function ReviewCell({restaurant, rating, srcImage, description}: ReviewCellProps) {
   return (
      <View style={styles.reviewCell}>

         <Text style={styles.description}>{description}</Text>
      </View>
   )
}