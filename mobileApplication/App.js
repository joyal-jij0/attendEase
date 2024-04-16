import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Profile from "./src/components/Profile";
import BottomBar from "./src/components/BottomBar";
import Middle from "./src/components/Middle";

export default function App() {
  return (
    <View style={styles.container}>
      <Profile />
      <Middle />
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B70E4",
    height: "100%",
    justifyContent: "space-between",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
