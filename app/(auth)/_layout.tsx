import { useAuthStore } from "@/lib/store/authStore";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthLayout() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  if (user) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            paddingBottom: insets.bottom,
            backgroundColor: "#fff",
          },
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </>
  );
}
