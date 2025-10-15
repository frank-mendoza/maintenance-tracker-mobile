import CustomButton from "@/components/CustomButton";
import { useAuthStore } from "@/lib/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MyAccountScreen = () => {
  const { user, handleLogout, loading, setLoading } = useAuthStore();
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=12");

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result?.assets && !result.canceled) {
      setAvatar(result?.assets[0]?.uri);
    } else {
      console.log("   User cancelled image picker");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    await handleLogout();
  };

  const details = [
    { label: "Email", value: email },
    { label: "Phone", value: "123-456-7890" },
    { label: "Role", value: "Admin" },
    { label: "Member Since", value: "Jan 2023" },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center p-6 bg-[#FFD700] rounded-b-3xl">
        <TouchableOpacity onPress={handlePickImage} activeOpacity={0.7}>
          <Image
            source={{ uri: avatar }}
            className="w-28 h-28 rounded-full mb-3 border-4 border-white"
          />
          <View className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full">
            <Ionicons name="camera-outline" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text className="text-xl font-bold text-[#151312]">John Doe</Text>
        <Text className="text-gray-700">{email}</Text>
      </View>

      <View className="mt-8 px-6 space-y-6 gap-6">
        {details.map((detail) => (
          <View key={detail.label}>
            <Text className="text-gray-500 mb-2">{detail.label}</Text>
            <TextInput
              value={detail.value}
              editable={false}
              className="border border-gray-300 rounded-xl px-4 py-3 text-base bg-gray-100"
            />
          </View>
        ))}

        <CustomButton
          label="Save Changes"
          onPress={handleSave}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

export default MyAccountScreen;
