import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { NotificationType } from "../../src/API";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginVertical: 15,
  },
  buttonscontainer: {
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    justifyContent: "center",
    borderRadius: 30,
    marginHorizontal: 5,
  },
  emptybutton: {
    borderColor: "#FA4A0C",
    borderWidth: 1,
  },
  buttontext: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
  },
  filledbutton: {
    backgroundColor: "#FA4A0C",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 5,
  },
});

function Divider() {
  return (
    <View
      style={{
        width: "95%",
        height: 1,
        backgroundColor: "black",
        opacity: 0.3,
      }}
    />
  );
}

interface NotifProps {
  title: string;
  message: string;
  senderID: string;
  type: NotificationType;
  // switch type to enum when working on backend
  // REQUEST, IGNORE, RESPONSE, OR ACCEPT notif types
}

// eslint-disable-next-line
function OwnershipNotif({ title, message, senderID, type }: NotifProps) {
  let buttons;

  switch (type) {
    case NotificationType.OWNERSHIPREQUEST:
      buttons = (
        <View>
          <Divider />
          <View style={styles.buttonscontainer}>
            <Pressable style={[styles.emptybutton, styles.button]}>
              <Text style={[styles.buttontext, { color: "#FA4A0C" }]}>
                Ignore
              </Text>
            </Pressable>
            <Pressable style={[styles.emptybutton, styles.button]}>
              <Text style={[styles.buttontext, { color: "#FA4A0C" }]}>
                Reply
              </Text>
            </Pressable>
            <Pressable style={[styles.filledbutton, styles.button]}>
              <Text style={[styles.buttontext, { color: "white" }]}>
                Accept
              </Text>
            </Pressable>
          </View>
        </View>
      );
      break;

    case NotificationType.OWNERSHIPDENIED:
      buttons = (
        <View>
          <Divider />
          <View style={styles.buttonscontainer}>
            <Pressable style={[styles.emptybutton, styles.button]}>
              <Text style={[styles.buttontext, { color: "#FA4A0C" }]}>
                Dismiss
              </Text>
            </Pressable>
            <Pressable style={[styles.emptybutton, styles.button]}>
              <Text style={[styles.buttontext, { color: "#FA4A0C" }]}>
                Appeal
              </Text>
            </Pressable>
          </View>
        </View>
      );
      break;
    default:
      buttons = <View />;
  }

  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={{ fontFamily: "Mada-Medium", fontSize: 17, padding: 5 }}>
        {title}
      </Text>
      <Divider />
      <Text style={{ fontFamily: "Mada-Regular", fontSize: 15, padding: 10 }}>
        {message}
      </Text>
      {buttons}
    </View>
  );
}

export default OwnershipNotif;
