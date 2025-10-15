import LoadingIndicator from "@/components/LoadingIndicator";
import { useAuthStore } from "@/lib/store/authStore";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  const { restoreUser, error, setLoading } = useAuthStore();
  const [loadingIndicatorVisible, setLoadingIndicatorVisible] = useState(true);

  useEffect(() => {
    NavigationBar.setButtonStyleAsync("light");
    restoreUser();

    if (error) {
      console.log("Auth error:", error);
    }
    // deactivateKeepAwake(); // 👈 disable it in dev
    setLoading(false);
  }, []);

  if (loadingIndicatorVisible)
    return <LoadingIndicator setLoading={setLoadingIndicatorVisible} />;

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
