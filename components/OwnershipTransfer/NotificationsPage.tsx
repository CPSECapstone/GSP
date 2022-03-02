import { FlatList, View } from "react-native";
import OwnershipNotif from "./OwnershipNotif";

const testData = [
  {
    title: "Ownership Request for @Bites",
    message:
      "Hello, this is Marvis , the owner of @Bites. Could you possibly transfer ownership of this to me so I can manage our profile? Thanks!",
    senderID: "whatev",
    type: "REQUEST",
  },
];

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center", marginTop: 25 }}
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
