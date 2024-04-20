import { Tabs } from "expo-router";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" size={32} color="#2B70E4" />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="home/home"
        options={{
          tabBarIcon: () => <Entypo name="home" size={32} color="#2B70E4" />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="redirect"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="share-square" size={32} color="#2B70E4" />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="camera/cameraViewFinder"
        options={{
          tabBarButton: () => null,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="camera/cameraPreview"
        options={{
          tabBarButton: () => null,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="form/form"
        options={{
          tabBarButton: () => null,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
};
