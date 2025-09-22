import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function CreateUserScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    if (!name || !email) {
      alert("Name and Email are required!");
      return;
    }
    // TODO: Replace with API call
    console.log({ name, email, role });
    router.back(); // 👈 go back to Users list
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Create User
        </Text>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Role</Text>
          <TextInput
            value={role}
            onChangeText={setRole}
            placeholder="Enter role"
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#FFD700] rounded-xl py-4 items-center"
        >
          <Text className="text-black font-semibold text-lg">
            Save User
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 py-3 items-center"
        >
          <Text className="text-gray-500">Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
