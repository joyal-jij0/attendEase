import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useSelector } from "react-redux";

export default function CameraPreviewComponent() {
  const image = useSelector((state) => state.image.image);
  return (
    <>
      <View style={styles.fullScreenPreview}>
        <Image style={styles.previewImage} source={{ uri: image }} />
        <View style={styles.actionButtonsContainer}>
          <Link href="../form/form" asChild>
            <TouchableOpacity>
              <AntDesign name="check" size={30} color="white" />
            </TouchableOpacity>
          </Link>
          <Link href="../home/home" asChild>
            <TouchableOpacity>
              <AntDesign name="close" size={30} color="white" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fullScreenPreview: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  actionButtonsContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
});
