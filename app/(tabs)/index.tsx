import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

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
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }
  return (
    <View className="flex-1 bg-gray-50 px-6 pt-10">
      <Text className="text-2xl font-bold text-gray-900 mb-6">
        Welcome to Maintenance Tracker
      </Text>
      <Text className="text-base text-gray-600 mb-8">
        Choose a section to manage your tasks:
      </Text>

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
    </View>
  );
}
