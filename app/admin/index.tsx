import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AdminPage() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold mb-4 text-gray-900">
        Admin Dashboard
      </Text>
      <Text className="text-base text-gray-600 mb-8 text-center">
        Manage users, view reports, and configure settings.
      </Text>
      <TouchableOpacity className="bg-blue-600 px-8 py-3 rounded-lg">
        <Text className="text-white text-base font-bold">
          Go to User Management
        </Text>
      </TouchableOpacity>
    </View>
  );
}
