import React from "react";
import { FlatList, View, Text } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import selectAllUserNotifs from "../../redux/selectors/notifications";
import { NotificationsProps } from "../../route-settings";
import OwnershipNotif from "./OwnershipNotif";

// eslint-disable-next-line
function Notifications({ route, navigation }: NotificationsProps) {
  const notifs = useAppSelector(selectAllUserNotifs);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {notifs.length > 0 ? (
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={{ flex: 1, marginTop: 25 }}
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
                    userID={item.userID}
                    notifID={item.id}
                    title={item.title}
                    message={item.message}
                    senderID={item.Sender}
                    type={item.type}
                    businessID={item.businessRequestID}
                  />
                );
              }
              return <Text>Invalid notification data.</Text>;
            }
            return <Text>Error fetching notification data.</Text>;
          }}
          data={notifs}
          keyExtractor={(item, index) =>
            item?.Sender
              ? item.Sender + index.toString()
              : `NO_SENDER${item?.userID}${index.toString()}`
          }
        />
      ) : (
        <Text
          style={{
            color: "#7300ff",
            fontFamily: "Mada-Regular",
            fontSize: 24,
            textAlign: "center",
          }}
        >
          No notifications to display
        </Text>
      )}
    </View>
  );
}

export default Notifications;
