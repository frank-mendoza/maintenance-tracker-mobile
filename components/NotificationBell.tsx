// components/NotificationBell.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotificationBell({ count = 3 }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="relative mr-4"
      onPress={() => router.push("/Notifications")}
      activeOpacity={0.7}
    >
      <Ionicons name="notifications-outline" size={26} color="#1f2937" />

      {count > 0 && (
        <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
          <Text className="text-white text-[10px] font-bold">{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
