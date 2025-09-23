import Button from "@/components/Button";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

const RegistrationScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { SignupIcon } = images;
  const handleSubmit = () => {
    // Handle registration logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View className="flex-1 justify-center p-5  items-center">
      <SignupIcon width={100} height={100} />
      <Text className="text-2xl my-8">Signup</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="border border-gray-300 mb-2 p-4 rounded w-full"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 mb-2 p-4 rounded w-full"
      />
      <TextInput
        placeholder="Confirm Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 mb-2 p-4 rounded w-full"
      />
      <Button label="Register" onPress={() => router.push("/")} />

      <Text
        className="absolute bottom-0"
        style={{ marginVertical: 20, fontSize: 16 }}
      >
        Already have an account?{" "}
        <Text
          className="font-semibold text-red-500"
          onPress={() => router.push("./login")}
        >
          {" "}
          Login
        </Text>
      </Text>
    </View>
  );
};

export default RegistrationScreen;
