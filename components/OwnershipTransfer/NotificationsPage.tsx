import { FlatList, View, Text } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import selectAllUserNotifs from "../../redux/selectors/notifications";
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
  const notifs = useAppSelector(selectAllUserNotifs);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "flex-start", marginTop: 25 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          if (item !== null && item !== undefined) {
            if (
              item.Sender !== undefined &&
              item.Sender !== null &&
              item.message !== undefined
            ) {
              return (
                <OwnershipNotif
                  title={item.title}
                  message={item.message}
                  senderID={item.Sender}
                  type={item.type}
                />
              );
            } else {
              return <Text>Invalid notification data.</Text>;
            }
          } else {
            return <Text>Error fetching notification data.</Text>;
          }
        }}
        data={notifs}
        keyExtractor={(item, index) =>
          item?.Sender
            ? item.Sender
            : "NO_SENDER" + item?.userID + index.toString()
        }
      />
    </View>
  );
}

export default Notifications;
