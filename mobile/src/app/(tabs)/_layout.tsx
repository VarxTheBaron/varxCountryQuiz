import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
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
          title: "Profile",
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
