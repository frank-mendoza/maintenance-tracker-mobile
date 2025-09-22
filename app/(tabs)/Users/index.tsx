import PaginatedList from "@/components/PaginatedList";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// dummy mock 100 users
const mockUsers = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

// fake API call (simulates network delay)
async function fetchUsers(page: number, pageSize: number) {
  return new Promise<typeof mockUsers>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      resolve(mockUsers.slice(start, end));
    }, 600);
  });
}

export default function Users() {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      // activeOpacity={0.7}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/Users/details/[id]",
          params: { id: item.id },
        })
      }
    >
      <View
        className={`relative flex-row items-center bg-white px-4 py-3 gap-3 rounded-2xl shadow-sm`}
      >
        {/* Avatar */}
        <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-4">
          <Text className="text-blue-600 font-semibold text-lg">
            {item.name.charAt(0)}
          </Text>
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text className="text-gray-900 font-medium">{item.name}</Text>
          <Text className="text-gray-500 text-sm">{item.email}</Text>
        </View>

        {/* Action button */}
        <TouchableOpacity>
          <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">Users</Text>
      <PaginatedList
        fetchData={fetchUsers}
        renderItem={renderItem}
        pageSize={10}
        maxItems={100}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/Users/create")}
        className="absolute bottom-20 mb-5 right-6 bg-[#FFD700] rounded-full p-4 shadow-lg"
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={28} color="#151312" />
      </TouchableOpacity>
    </View>
  );
}
