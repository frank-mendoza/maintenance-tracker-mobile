import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Tabs } from "expo-router";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TabIcon({ focused, name }: { focused: boolean; name: any }) {
  if (focused) {
    return (
      <View className="flex flex-row w-full flex-1 min-w-20 min-h-14 mt-10 justify-center items-center rounded-full overflow-hidden bg-[#FFD700]">
        <Ionicons name={name} size={24} color="#151312" />
      </View>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-10 rounded-full">
      <Ionicons name={name} size={22} color="#A8B5DB" />
    </View>
  );
}

const tabConfig: Record<
  string,
  { title: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  index: { title: "Home", icon: "home-outline" },
  Users: { title: "Users", icon: "people-outline" },
  Tickets: { title: "Tickets", icon: "ticket-outline" },
  Properties: { title: "Properties", icon: "business-outline" },
  account: { title: "My Account", icon: "accessibility-outline" },
  // notifications: { title: "Notifications", icon: "notifications-outline" },
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const isLogged = true; // Replace with auth logic

  if (!isLogged) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <StatusBar backgroundColor={"#FFD700"} barStyle="dark-content" />
      <Tabs
        screenOptions={({ route }) => {
          const isNotifications = route.name === "notifications";
          const config = tabConfig[route.name];
          return {
            tabBarShowLabel: false,
            headerTitle: "",
            headerLeft: () => (
              <Image
                source={images.logo as any}
                style={{
                  width: 150,
                  height: 150,
                  marginTop: 10,
                  resizeMode: "contain",
                }}
              />
            ),
            headerRight: () =>
              !isNotifications && (
                <TouchableOpacity
                  className="mr-4"
                  onPress={() => router.push("/notifications")}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="#151312"
                  />
                </TouchableOpacity>
              ),
            tabBarButton: (props: any) => (
              <TouchableOpacity activeOpacity={1} {...props} />
            ),
            tabBarIcon: ({ focused }) =>
              config ? <TabIcon focused={focused} name={config.icon} /> : null,
            tabBarStyle: {
              paddingHorizontal: 20,
              position: "absolute",
              bottom: insets.bottom || 0,
              left: 0,
              right: 0,
              height: 70 + insets.bottom,
              backgroundColor: "#fff",
              elevation: 0,
              shadowOpacity: 0,
              borderTopWidth: 0,
            },
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: "#FFD700",
              height: 70 + insets.top,
            },
          };
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="Users" />
        <Tabs.Screen name="Tickets" />
        <Tabs.Screen name="Properties" />
        <Tabs.Screen name="account" />
        <Tabs.Screen
          name="notifications"
          options={{
            href: null,
            headerShown: true,
          }}
        />
      </Tabs>
    </>
  );
}
