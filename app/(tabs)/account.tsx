import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MyAccountScreen = () => {
  const [email, setEmail] = useState("johndoe@email.com");
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

  const handleSave = () => {
    Alert.alert("Profile Updated", `New email: ${email}`);
    // 🔗 here you can integrate API call to update user details
  };

  const details = [
    { label: "Email", value: email },
    { label: "Phone", value: "123-456-7890" },
    { label: "Role", value: "Admin" },
    { label: "Member Since", value: "Jan 2023" },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
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

      {/* Editable Fields */}
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

        <Button label="Save Changes" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

export default MyAccountScreen;
