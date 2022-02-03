import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const styles = StyleSheet.create({
   reviewCell: {
      width: 250,
      backgroundColor: 'white'
   },
   restauraunt: {
      fontWeight: 'bold',
      paddingBottom: 10
   },
   description: {
      paddingTop: 10
   },
   image: {
      height: 40,
      width: 40
   }

});

function Star() {
   return (
     <Ionicons
       name="star"
       style={{ marginRight: 2 }}
       size={22}
       color="#DA5125"
     />
   );
 }

 function StarOutline() {
   return (
     <Ionicons
       name="star-outline"
       style={{ marginRight: 5 }}
       size={22}
       color="#DA5125"
     />
   );
 }

interface ReviewCellProps {
   restaurant: String;
   rating: Number;
   srcImage: String;
   description: String;
 }

 // react native vector icons. Carter has stars on the profile page.

 // maybe hardcode height in case you want to press 'more'


 /**
  * <ReviewCell restaurant={"Taqueria Santa Cruz"}
        description={"One of my favorite restaurants in San Luis Obispo. They are always consistent with their food. While it is not the most amazing value out there, they never fail to deliver and have an amazing family atmosphere."}
        srcImage={"myTestImage.png"}
        rating={2.0}
        
        ></ReviewCell> 
  * 
  */

function ReviewCell({restaurant, rating, srcImage, description}: ReviewCellProps) {
   // can't call require with srcImage string here
   // how do I make this dang image inline with Text?
   return (
      <View style={styles.reviewCell}>
   
         <Text style={styles.restauraunt}>{restaurant}</Text>
         <Image style={styles.image} source={require('../assets/default-avatar.jpeg')}></Image>
         {rating == 1 &&
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Star />
            <StarOutline />
            <StarOutline />
            <StarOutline />
            <StarOutline />

            <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
              {" "}
              • {rating} Stars
            </Text>
          </View>
         }
         {rating == 2 &&
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Star />
              <Star />
              <StarOutline />
              <StarOutline />
              <StarOutline />

              <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
                {" "}
                • {rating} Stars
              </Text>
            </View>
         }
         {rating == 3 &&
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Star />
              <Star />
              <Star />
              <StarOutline />
              <StarOutline />

              <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
                {" "}
                • {rating} Stars
              </Text>
            </View>
         }
         {rating == 4 &&
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Star />
              <Star />
              <Star />
              <Star />
              <StarOutline />

              <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
                {" "}
                • {rating} Stars
              </Text>
            </View>
         }
         {rating == 5 &&
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />

              <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
                {" "}
                • {rating} Stars
              </Text>
            </View>
         }
         <Text style={styles.description}>{description}</Text>
      </View>
   )
}

export default ReviewCell;