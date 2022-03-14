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
} from "react-native";

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
  children: React.ReactNode;
}

function ResultsTab({ onDismiss, visible, children }: ResultsTabProps) {
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
            {children}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default ResultsTab;

/* <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
          padding: 10,
          minHeight: 350,
        }}
      >
        {resultBusinesses.length === 0 ? (
          <Text
            style={{
              color: "#FA4A0C",
              fontFamily: "Mada-Regular",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            No businesses returned from selected filters.
          </Text>
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 25, width: "100%" }}
            data={resultBusinesses}
            renderItem={({ item }) => {
              if (
                item?.name !== undefined &&
                item.type !== undefined &&
                item.type !== null &&
                item.primarycolor !== null &&
                item.primarycolor !== undefined &&
                item.tags !== null &&
                item.tags !== undefined
              ) {
                return (
                  <View />
                  <ExploreResultCell
                    title={item.name}
                    distance={3}
                    category={item.type}
                    minoritygroups={item.tags}
                    primarycolor={item.primarycolor}
                  />
                );
              }
              return <Text>Something went wrong</Text>;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        )} */
