import { API } from "aws-amplify";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppDispatch } from "../../redux/hooks";
import { notificationRemoval } from "../../redux/slices/notifications";
import { NotificationType } from "../../src/API";
import {
  createNotification,
  deleteNotification,
} from "../../src/graphql/mutations";

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
  notifID: string;
  userID: string;
  title: string;
  message: string;
  senderID: string;
  type: NotificationType;
}

// eslint-disable-next-line
function OwnershipNotif({
  notifID,
  userID,
  title,
  message,
  senderID,
  type,
}: NotifProps) {
  const dispatch = useAppDispatch();
  let buttons;

  const deleteNotif = async () => {
    const notifDetails = {
      id: notifID,
    };

    await API.graphql({
      query: deleteNotification,
      variables: { input: notifDetails },
    });
  };

  const postNotifDismissal = async () => {
    const rejectNotif = {
      message: "Your ownership request was rejected.",
      userID: senderID,
      type: NotificationType.OWNERSHIPDENIED,
      Sender: userID,
      title,
    };

    await API.graphql({
      query: createNotification,
      variables: { input: rejectNotif },
    });
  };

  switch (type) {
    case NotificationType.OWNERSHIPREQUEST:
      buttons = (
        <View>
          <Divider />
          <View style={styles.buttonscontainer}>
            <Pressable
              style={[styles.emptybutton, styles.button]}
              onPress={() => {
                try {
                  deleteNotif();
                  postNotifDismissal();
                  dispatch(notificationRemoval(notifID));
                } catch (e) {
                  console.error(`Error removing notification: ${e}`);
                }
              }}
            >
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
            <Pressable
              style={[styles.emptybutton, styles.button]}
              onPress={() => {
                try {
                  deleteNotif();
                  dispatch(notificationRemoval(notifID));
                } catch (e) {
                  console.error(`Error dismissing rejection notif: ${e}`);
                }
              }}
            >
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
      buttons = (
        <View>
          <Pressable
            style={[styles.button, styles.filledbutton]}
            onPress={() => {
              try {
                deleteNotif();
                dispatch(notificationRemoval(notifID));
              } catch (e) {
                console.error(`Error dismissing notif: ${e}`);
              }
            }}
          >
            <Text style={styles.buttontext}>Dismiss</Text>
          </Pressable>
        </View>
      );
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
