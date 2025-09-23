import LoadingIndicator from "@/components/LoadingIndicator";
import { useAuthStore } from "@/lib/store/authStore";
import * as NavigationBar from "expo-navigation-bar";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  const { restoreUser, setLoading } = useAuthStore();
  const [loadingIndicatorVisible, setLoadingIndicatorVisible] = useState(true);

  useEffect(() => {
    NavigationBar.setButtonStyleAsync("light");
    restoreUser();
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
        <Slot />
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
