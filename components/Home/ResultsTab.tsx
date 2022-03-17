import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Pressable,
  FlatList,
  Text,
} from "react-native";
import BusinessCard from "../BusinessCard/BusinessCard";
import { getCoordinates } from "../../constants/location";

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#F5F5F8",
    paddingTop: "3%",
    paddingHorizontal: "3%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    minHeight: "40%",
    maxHeight: "70%",
    alignItems: "center",
  },
  sliderIndicatorRow: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderIndicator: {
    backgroundColor: "#CECECE",
    height: 4,
    width: 45,
  },
});

interface ResultsTabProps {
  onDismiss: () => void;
  visible: boolean;
  resultBusinesses: any;
  setselectedBusiness: any;
  setcoordinates: any;
}

function ResultsTab({
  onDismiss,
  visible,
  resultBusinesses,
  setselectedBusiness,
  setcoordinates,
}: ResultsTabProps) {
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 500,
    useNativeDriver: true,
  });

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const handleDismiss = () => {
    closeAnim.start(() => onDismiss());
  };

  useEffect(() => {
    resetPositionAnim.start();
  }, [resetPositionAnim]);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 0 && gs.vy > 2) {
          return handleDismiss();
        }
        return resetPositionAnim.start();
      },
    })
  ).current;

  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={handleDismiss}
      transparent
    >
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={styles.overlay}>
          <Animated.View
            style={{
              ...styles.container,
              transform: [{ translateY }],
            }}
            {...panResponders.panHandlers} // eslint-disable-line react/jsx-props-no-spreading
          >
            <View style={styles.sliderIndicatorRow}>
              <View style={styles.sliderIndicator} />
            </View>
            {resultBusinesses.length === 0 ? (
              <Text
                style={{
                  color: "#FA4A0C",
                  fontFamily: "Mada-Regular",
                  fontSize: 24,
                  textAlign: "center",
                  top: "40%",
                }}
              >
                No businesses returned.
              </Text>
            ) : (
              <FlatList
                data={resultBusinesses}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  if (item !== undefined && item !== null) {
                    return (
                      <View onStartShouldSetResponder={() => true}>
                        <Pressable
                          onPress={() => {
                            setselectedBusiness([item]);
                            getCoordinates(item.address).then((res) =>
                              setcoordinates(res)
                            );
                            handleDismiss();
                          }}
                        >
                          <BusinessCard
                            id={item.id}
                            name={item.name}
                            distance="4"
                            rating={
                              item.rating == null
                                ? "0 Reviews"
                                : String(item.rating)
                            }
                          />
                        </Pressable>
                      </View>
                    );
                  }
                  return <Text>Something went wrong</Text>;
                }}
                keyExtractor={(item, index) =>
                  item.toString() + index.toString()
                }
              />
            )}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default ResultsTab;
