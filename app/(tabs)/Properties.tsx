import PaginatedList from "@/components/PaginatedList";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

// dummy mock 100 users
const mockUsers = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Property ${i + 1}`,
  email: `property${i + 1}@example.com`,
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

export default function Properties() {
  const [showModal, setShowModal] = useState({ id: "", visible: false });
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const openAddModal = (id?: string) => {
    setSelectedUser(null);
    setName("");
    setEmail("");
    setShowModal({
      id: id as string,
      visible: true,
    });
  };

  const openUserDetails = (user: any) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    // setShowModal(true);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="relative"
      onPress={() =>
        router.push({
          pathname: "/(tabs)/Users/details/[id]",
          params: { id: item.id },
        })
      }
    >
      <View
        className={`flex-row items-center  bg-white p-4 rounded-2xl shadow-none`}
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

  const handleSaveUser = () => {
    if (selectedUser) {
      console.log("Updating user:", { id: selectedUser.id, name, email });
    } else {
      console.log("Adding new user:", { name, email });
    }
    // setShowModal(false);
    setName("");
    setEmail("");
    setSelectedUser(null);
  };

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">Properties</Text>
      <PaginatedList
        fetchData={fetchUsers}
        renderItem={renderItem}
        pageSize={10}
        maxItems={100}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => openAddModal()}
        className="absolute bottom-20 mb-5 right-6 bg-[#FFD700] rounded-full p-4 shadow-lg"
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={28} color="#151312" />
      </TouchableOpacity>

      {/* Popup Modal */}
      {showModal.visible && (
        <Animated.View
          entering={FadeInUp.duration(300)}
          exiting={FadeOutDown.duration(300)}
          className="absolute inset-0 bg-black/50 justify-center items-center px-6"
        >
          <View className="bg-white w-full rounded-2xl p-6 shadow-lg">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              {selectedUser ? "User Details" : "Add New User"}
            </Text>

            <TextInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              editable={!selectedUser} // disable editing when viewing
              className="border border-gray-300 min-h-14 rounded-lg px-4 py-2 mb-3"
            />

            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              editable={!selectedUser} // disable editing when viewing
              className="border border-gray-300 min-h-14 rounded-lg px-4 py-2 mb-5"
            />

            <View className="flex-row justify-end gap-3">
              <TouchableOpacity
                onPress={() => setShowModal({ id: "", visible: false })}
                className="px-4 py-2 rounded-lg bg-gray-200 min-h-14 min-w-20"
              >
                <Text className="text-gray-700 font-semibold m-auto">
                  Close
                </Text>
              </TouchableOpacity>

              {!selectedUser && (
                <TouchableOpacity
                  onPress={handleSaveUser}
                  className="px-4 py-2 rounded-lg bg-blue-600 min-h-14 min-w-20"
                >
                  <Text className="text-white font-semibold m-auto">Save</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
