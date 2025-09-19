import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function UserDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 py-10">
      {/* Back button */}
      <View className=" justify-between items-center mb-6 flex-row">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-6 flex-row items-center"
        >
          <Ionicons name="arrow-back-sharp" size={20} color="#151312" />
          {/* <Text className="ml-2 text-base text-gray-700">Back</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-6 flex-row items-center"
        >
          <Ionicons name="pencil" size={20} color="#151312" />
        </TouchableOpacity>
      </View>

      {/* User Avatar */}
      <View className="items-center">
        <Image
          source={{
            uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
          }}
          className="w-32 h-32 rounded-full bg-gray-200"
        />
        <Text className="mt-4 text-2xl font-bold text-gray-900">User {id}</Text>
        <Text className="text-gray-500 text-sm">user{id}@example.com</Text>
      </View>

      {/* User Info Section */}
      <View className="mt-10 space-y-4">
        <View className="flex-row items-center justify-between border-b border-gray-100 pb-3">
          <Text className="text-gray-600">Role</Text>
          <Text className="font-medium text-gray-900">Admin</Text>
        </View>

        <View className="flex-row items-center justify-between border-b border-gray-100 pb-3">
          <Text className="text-gray-600">Status</Text>
          <Text className="font-medium text-green-600">Active</Text>
        </View>

        <View className="flex-row items-center justify-between border-b border-gray-100 pb-3">
          <Text className="text-gray-600">Created</Text>
          <Text className="font-medium text-gray-900">Jan 15, 2025</Text>
        </View>
      </View>
    </View>
  );
}
