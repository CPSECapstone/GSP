import { Entypo } from "@expo/vector-icons";
import { API } from "aws-amplify";
import React, { Dispatch } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/selectors/user";
import { createNotification } from "../../src/graphql/mutations";
import { NotificationType } from "../../src/models";

const styles = StyleSheet.create({
  navoptionpressable: {
    backgroundColor: "#EDEDED",
    maxWidth: "80%",
    minWidth: "80%",
    padding: 12,
    borderRadius: 15,
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  navoptiontext: {
    fontFamily: "Mada-SemiBold",
    fontSize: 18,
  },
  modalcanceltext: {
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    opacity: 0.5,
  },
  modalcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 10,
  },
  sendreqbutton: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
  },
});

interface NavOptionProps {
  title: string;
  navaction: Dispatch<number>;
  index: number;
}

function ModalNavOption({ title, navaction, index }: NavOptionProps) {
  return (
    <Pressable
      style={styles.navoptionpressable}
      onPress={() => navaction(index)}
    >
      <Text style={styles.navoptiontext}>{title}</Text>
      <Entypo name="chevron-right" size={25} />
    </Pressable>
  );
}

interface ModalProps {
  modalVisibilitySetter: Dispatch<boolean>;
  nextScreenIncr: Dispatch<number>;
}

function OptionsView({ modalVisibilitySetter, nextScreenIncr }: ModalProps) {
  return (
    <View style={styles.modalcontainer}>
      <View style={styles.modalView}>
        <ModalNavOption index={0} title="Share Business" navaction={() => {}} />
        <ModalNavOption
          index={1}
          title="Request Ownership"
          navaction={nextScreenIncr}
        />
        <Pressable
          style={{ alignItems: "center", padding: 5 }}
          onPress={() => modalVisibilitySetter(false)}
        >
          <Text style={styles.modalcanceltext}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

interface RequestProps {
  modalVisibilitySetter: Dispatch<boolean>;
  nextScreenIncr: Dispatch<number>;
  businessOwnerID: string;
  businessTitle: string;
  businessID: string;
}

function RequestView({
  modalVisibilitySetter,
  nextScreenIncr,
  businessOwnerID,
  businessTitle,
  businessID,
}: RequestProps) {
  const [reqMessage, setReqMessage] = React.useState("");
  const [postDisabled, setPostDisabled] = React.useState(false);
  const currentUser = useAppSelector(selectUser);

  const postNewRequest = async (ownerID: string, message: string) => {
    const notifObject = {
      message,
      userID: ownerID,
      type: NotificationType.OWNERSHIPREQUEST,
      Sender: currentUser?.id,
      title: `Ownership Request for ${businessTitle}`,
      businessRequestID: businessID,
    };

    const newNotif = await API.graphql({
      query: createNotification,
      variables: { input: notifObject },
    });

    return newNotif;
  };

  return (
    <View style={styles.modalcontainer}>
      <View style={styles.modalView}>
        <Text
          style={{ fontFamily: "Poppins-Regular", fontSize: 14, opacity: 0.5 }}
        >
          Write a short message to go with your request:
        </Text>
        <TextInput
          numberOfLines={2}
          multiline
          style={{
            borderColor: "#6E6E6E",
            borderWidth: 1,
            borderRadius: 15,
            padding: 10,
            margin: 10,
          }}
          placeholder="Message"
          value={reqMessage}
          onChangeText={setReqMessage}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              nextScreenIncr(0);
              modalVisibilitySetter(false);
            }}
          >
            <Text style={styles.modalcanceltext}>Cancel</Text>
          </Pressable>
          <Pressable
            style={{
              marginHorizontal: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 25,
              backgroundColor: "#7300ff",
            }}
            disabled={postDisabled}
            onPress={async () => {
              if (currentUser?.id === businessOwnerID) {
                Alert.alert(
                  "Unable to Send Request",
                  "You already own this business.",
                  [{ text: "OK" }]
                );
              } else if (reqMessage.length < 5) {
                Alert.alert(
                  "Invalid Message",
                  "Please type a message to accompany your request.",
                  [{ text: "OK" }]
                );
              } else {
                setPostDisabled(true);
                postNewRequest(businessOwnerID, reqMessage).then(() =>
                  modalVisibilitySetter(false)
                );
                setPostDisabled(false);
              }
            }}
          >
            <Text style={styles.sendreqbutton}>Send</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

interface FullModalProps {
  modalVisibilitySetter: Dispatch<boolean>;
  visible: boolean;
  ownerID: string;
  title: string;
  businessID: string;
}

function BusinessProfileModal({
  modalVisibilitySetter,
  visible,
  ownerID,
  title,
  businessID,
}: FullModalProps) {
  const [screenindex, setScreenindex] = React.useState(0);

  return (
    <Modal transparent animationType="slide" visible={visible}>
      {screenindex === 0 && (
        <OptionsView
          nextScreenIncr={setScreenindex}
          modalVisibilitySetter={modalVisibilitySetter}
        />
      )}
      {screenindex === 1 && (
        <RequestView
          businessID={businessID}
          businessTitle={title}
          businessOwnerID={ownerID}
          nextScreenIncr={setScreenindex}
          modalVisibilitySetter={modalVisibilitySetter}
        />
      )}
    </Modal>
  );
}

export default BusinessProfileModal;
