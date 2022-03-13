import { Entypo } from "@expo/vector-icons";
import React, { Dispatch } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

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
        <ModalNavOption
          index={1}
          title="Edit Review"
          navaction={nextScreenIncr}
        />
        <ModalNavOption
          index={2}
          title="Delete Review"
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

interface DeleteReviewProps {
  modalVisibilitySetter: Dispatch<boolean>;
  nextScreenIncr: Dispatch<number>;
}

function DeleteView({
  modalVisibilitySetter,
  nextScreenIncr,
}: DeleteReviewProps) {
  return (
    <View style={styles.modalcontainer}>
      <View style={styles.modalView}>
        <Text
          style={{ fontFamily: "Poppins-Regular", fontSize: 14, opacity: 0.5 }}
        >
          Confirm Deletion of this Review
        </Text>
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
              backgroundColor: "#FA4A0C",
            }}
            onPress={() => {
              // 1. get all review data for user with: useAppSelector(selectAllReviews);
              // 2. pass this data into flatlist
              // 3. for each item in the flatlist, pass the review data
              // 4. pass ID for current review along to "delete review"
              // 5. on delete, call reducer to filter out current review ID
            }}
          >
            <Text style={styles.sendreqbutton}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

interface EditReviewProps {
  modalVisibilitySetter: Dispatch<boolean>;
  nextScreenIncr: Dispatch<number>;
}

function EditView({ modalVisibilitySetter, nextScreenIncr }: EditReviewProps) {
  return (
    <View style={styles.modalcontainer}>
      <View style={styles.modalView}>
        <Text
          style={{ fontFamily: "Poppins-Regular", fontSize: 14, opacity: 0.5 }}
        >
          Edit this Review
        </Text>

        <Text
          style={{
            paddingTop: 10,
            fontFamily: "Poppins-Regular",
            fontSize: 14,
            opacity: 0.5,
          }}
        >
          Rating
        </Text>
        <TextInput
          style={{ height: 20, borderWidth: 1, borderColor: "#EDEDED" }}
        ></TextInput>
        <Text
          style={{
            paddingTop: 10,
            fontFamily: "Poppins-Regular",
            fontSize: 14,
            opacity: 0.5,
          }}
        >
          Description
        </Text>
        <TextInput
          style={{ height: 80, borderWidth: 1, borderColor: "#EDEDED" }}
        ></TextInput>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
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
              backgroundColor: "#FA4A0C",
            }}
            onPress={() => {
              // 1. get all review data for user with: useAppSelector(selectAllReviews);
              // 2. pass this data into flatlist
              // 3. for each item in the flatlist, pass the review data
              // 4. pass ID for current review along to "delete review"
              // 5. on delete, call reducer to filter out current review ID
            }}
          >
            <Text style={styles.sendreqbutton}>Confirm Changes</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

interface FullModalProps {
  modalVisibilitySetter: Dispatch<boolean>;
  visible: boolean;
}

function ReviewModal({ modalVisibilitySetter, visible }: FullModalProps) {
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
        <EditView
          nextScreenIncr={setScreenindex}
          modalVisibilitySetter={modalVisibilitySetter}
        />
      )}
      {screenindex === 2 && (
        <DeleteView
          nextScreenIncr={setScreenindex}
          modalVisibilitySetter={modalVisibilitySetter}
        />
      )}
    </Modal>
  );
}

export default ReviewModal;