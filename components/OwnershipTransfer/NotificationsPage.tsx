import { FlatList, View } from "react-native";
import { NotificationsProps } from "../../route-settings";
import OwnershipNotif from "./OwnershipNotif";

const testData = [
  {
    title: "Ownership Request for @Bites",
    message:
      "Hello, this is Marvis , the owner of @Bites. Could you possibly transfer ownership of this to me so I can manage our profile? Thanks!",
    senderID: "whatev",
    type: "REQUEST",
  },
  {
    title: "Ownership Request for @Bites",
    message:
      "Hello, this is Marvis , the owner of @Bites. Could you possibly transfer ownership of this to me so I can manage our profile? Thanks!",
    senderID: "whatev",
    type: "REJECTED",
  },
  {
    title: "Ownership Request for @Bites",
    message:
      "Hello, this is Marvis , the owner of @Bites. Could you possibly transfer ownership of this to me so I can manage our profile? Thanks!",
    senderID: "whatev",
    type: "APPROVE",
  },
];

// eslint-disable-next-line
function Notifications({ route, navigation }: NotificationsProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "flex-start", marginTop: 25 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <OwnershipNotif
            title={item.title}
            message={item.message}
            senderID={item.senderID}
            type={item.type}
          />
        )}
        data={testData}
        keyExtractor={(item, index) =>
          item.senderID + item.title + item.type + index.toString()
        }
      />
    </View>
  );
}

export default Notifications;
