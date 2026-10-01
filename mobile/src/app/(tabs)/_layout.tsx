import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Start",
          tabBarIcon: (props) => (
            <MaterialIcons
              name="home-filled"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: (props) => (
            <MaterialIcons
              name="account-circle"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
