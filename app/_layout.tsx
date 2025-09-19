import LoadingIndicator from "@/components/LoadingIndicator";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const scale = useSharedValue(1);
  useEffect(() => {
    NavigationBar.setButtonStyleAsync("light");
    const timer = setTimeout(() => {
      // 👇 start zoom-out
      scale.value = withTiming(5, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });

      // 👇 wait for animation to finish, then hide loader
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: 1 - (scale.value - 1) / 4,
  }));

  if (loading)
    return (
      <>
        <StatusBar backgroundColor={"#FFD700"} barStyle="dark-content" />
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <LoadingIndicator />
        </Animated.View>
      </>
    );
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: {
              paddingBottom: insets.bottom,
              backgroundColor: "#fff",
            },
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
