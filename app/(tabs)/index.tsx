import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Dashboard menu
const menuItems = [
  {
    title: "Users",
    icon: "people-outline",
    route: "/Users",
    color: "bg-blue-100",
    iconColor: "#2563EB",
  },
  {
    title: "Tickets",
    icon: "ticket-outline",
    route: "/Tickets",
    color: "bg-green-100",
    iconColor: "#059669",
  },
  {
    title: "Properties",
    icon: "home-outline",
    route: "/Properties",
    color: "bg-purple-100",
    iconColor: "#7C3AED",
  },
];

// Dummy recent actions (e.g., from tickets)
const recentActions = [
  {
    id: "1",
    type: "Ticket Updated",
    description: "Leaking pipe in Room 204 marked as Resolved",
    time: "2h ago",
  },
  {
    id: "2",
    type: "New Ticket",
    description: "Broken window reported in Unit 12B",
    time: "5h ago",
  },
  {
    id: "3",
    type: "Ticket Assigned",
    description: "Electric issue assigned to John Doe",
    time: "1d ago",
  },
];

export default function Home() {
  return (
    <View className="flex-1 bg-gray-50 px-6 pt-10">
      {/* Header */}
      <Text className="text-2xl font-bold text-gray-900 mb-6">
        Welcome to Maintenance Tracker
      </Text>
      <Text className="text-base text-gray-600 mb-8">
        Choose a section to manage your tasks:
      </Text>

      {/* Dashboard Menu */}
      <View className="gap-4 mb-6">
        {menuItems.map((item) => (
          <Link key={item.title} href={item.route as any} asChild>
            <TouchableOpacity
              // activeOpacity={0.8}
              className="flex-row items-center p-5 rounded-2xl bg-white shadow-sm"
            >
              <View
                className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${item.color}`}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.iconColor}
                />
              </View>
              <Text className="text-lg font-semibold text-gray-900">
                {item.title}
              </Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      {/* Recent Actions */}
      {/* <Text className="text-lg font-bold text-gray-900 mb-3">
        Recent Actions
      </Text>
      <FlatList
        data={recentActions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white px-4 py-3 rounded-xl mb-3 shadow-sm">
            <Text className="text-sm font-semibold text-blue-600">
              {item.type}
            </Text>
            <Text className="text-gray-800 mt-1">{item.description}</Text>
            <Text className="text-gray-400 text-xs mt-1">{item.time}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      /> */}
    </View>
  );
}
