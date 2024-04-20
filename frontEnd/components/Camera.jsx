import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Link } from "expo-router";

export default function Camera() {
  return (
    <>
      <Link href="../camera/cameraViewFinder" asChild>
        <TouchableOpacity>
          <View style={styles.blackContainer}>
            <FontAwesome name="camera" size={80} color="#2B70E4" />
          </View>
        </TouchableOpacity>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  blackContainer: {
    backgroundColor: "#000000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    borderRadius: 20,
  },
});
