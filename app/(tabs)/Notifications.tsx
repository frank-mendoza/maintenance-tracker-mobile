import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";

// Dummy notification data
const mockNotifications = [
  {
    id: "1",
    title: "New Ticket Assigned",
    description: "Ticket #204 assigned to you",
    time: "2h ago",
  },
  {
    id: "2",
    title: "Ticket Resolved",
    description: "Leaking pipe in Room 204 resolved",
    time: "5h ago",
  },
  {
    id: "3",
    title: "System Update",
    description: "New version of Maintenance Tracker available",
    time: "1d ago",
  },
];

export default function Notifications() {
  return (
    <>
      <View className="flex-1 bg-gray-50 px-6 pt-6">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Notifications
        </Text>

        <FlatList
          data={mockNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-start bg-white px-4 py-3 rounded-xl mb-3 shadow-sm">
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#2563EB"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold">
                  {item.title}
                </Text>
                <Text className="text-gray-600 text-sm">
                  {item.description}
                </Text>
                <Text className="text-gray-400 text-xs mt-1">{item.time}</Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}
