import Button from "@/components/Button";
import { images } from "@/constants/images";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const LoginScreen = () => {
  const router = useRouter();
  const { handleLogin, loading } = useAuthStore();
  const [email, setEmail] = useState("fm.tenant@gmail.com");
  const [password, setPassword] = useState("12345678");

  const handleSubmit = async () => {
    try {
      await handleLogin(email, password);
      router.replace("/(tabs)");
    } catch (err) {
      console.log("Login failed", err);
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login pressed");
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log("Facebook login pressed");
  };

  const socialButtonStyles: StyleProp<ViewStyle> = {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2faff",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    borderWidth: 0,
    flex: 1,
    justifyContent: "center",
  };
  const { LoginIcon } = images;
  return (
    <View className="flex-1 justify-center p-5  items-center">
      <LoginIcon width={80} height={80} />
      <Text className="text-2xl my-8">Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="border border-gray-400 bg-white mb-2 p-4 rounded w-full"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-400 bg-white mb-2 p-4 rounded w-full"
      />
      <Button label="Login" onPress={() => handleSubmit()} disabled={loading} />
      <Text className="my-5 text-md">Or login with</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={socialButtonStyles}
          onPress={handleGoogleLogin}
        >
          <Icon
            name="google"
            size={20}
            color="#EA4335"
            style={{ marginRight: 8 }}
          />

          <Text style={{ color: "#333" }}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={socialButtonStyles}
          onPress={handleFacebookLogin}
        >
          <Icon
            name="facebook"
            size={20}
            color="#4267B2"
            style={{ marginRight: 8 }}
          />
          <Text style={{ color: "#333" }}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <Text
        className="absolute bottom-0 mt-5"
        style={{ marginVertical: 20, fontSize: 16 }}
      >
        Don&apos;t have an account?{" "}
        <Text
          className="font-semibold text-red-500"
          onPress={() => router.push("./register")}
        >
          {" "}
          Signup
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
