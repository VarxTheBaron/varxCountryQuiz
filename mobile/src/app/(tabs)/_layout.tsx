import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Start",
          tabBarIcon: (props) => (
            <MaterialIcons name="home-filled" size={24} color={props.color} />
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
              size={24}
              color={props.color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
