import { Stack } from "expo-router";

export default function UsersLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerTitle: "Users" }} />
      <Stack.Screen
        name="details/[id]"
        options={{
          headerTitle: "User Details",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerTitle: "Create User",
        }}
      />
    </Stack>
  );
}
