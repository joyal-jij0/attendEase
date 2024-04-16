import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";

const cameraImg = require("../../assets/photo-camera-interface-symbol-for-button.png");
const galleryImg = require("../../assets/image-2.png");

export default function Middle() {
  const [showCamera, setShowCamera] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, setPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      setCapturedImage(uri);
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  const savePicture = () => {
    // Save the captured image
    // You can implement this functionality according to your requirements
  };

  return (
    <>
      {!showCamera && (
        <>
          <TouchableOpacity onPress={() => setShowCamera(true)}>
            <View style={styles.blackContainer}>
              <Image style={styles.img} source={cameraImg} />
            </View>
          </TouchableOpacity>
          <View style={styles.blackContainer}>
            <Image style={styles.img} source={galleryImg} />
          </View>
        </>
      )}
      {showCamera && !capturedImage && (
        <>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.camera}
            type={type}
            ratio="16:9"
            autoFocus="on"
          />
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.captureButton}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {capturedImage && (
        <View style={styles.fullScreenPreview}>
          <Image style={styles.previewImage} source={{ uri: capturedImage }} />
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity onPress={savePicture}>
              <AntDesign name="check" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={retakePicture}>
              <AntDesign name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  blackContainer: {
    backgroundColor: "#000000",
    height: 150,
    width: 150,
    marginLeft: 108,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  img: {
    height: 80,
    width: 80,
  },
  camera: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  captureButtonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 35,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
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
