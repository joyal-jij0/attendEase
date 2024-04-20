import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { useFocusEffect, Link } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../redux/features/imageSlice";

export default function CameraViewFinderComponent() {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [imageCaptured, setImageCaptured] = useState(false);
  const ref = useRef(null);
  const image = useSelector((state) => state.image.image);

  const takePicture = async () => {
    if (!ref.current) return;
    try {
      const photo = await ref.current.takePictureAsync();
      dispatch(setImage(photo.uri));
      setImageCaptured(true);
      console.log("Image dispatched successfully.");
    } catch (error) {
      console.error("Error dispatching image:", error);
      console.log("Failed to dispatch image.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
        setCameraEnabled(true); // Enable the camera when the screen regains focus
      })();

      // Disable the camera when the screen loses focus
      return () => {
        setCameraEnabled(false);
      };
    }, [])
  );

  useEffect(() => {
    return () => {
      setCameraEnabled(false); // Disable the camera when the component is unmounted
    };
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {!imageCaptured && cameraEnabled && (
        <Camera ref={ref} style={styles.camera} ratio="16:9" />
      )}

      {!imageCaptured && (
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      )}

      {imageCaptured && (
        <View style={styles.fullScreenPreview}>
          <Image style={styles.previewImage} source={{ uri: image }} />
          <View style={styles.actionButtonsContainer}>
            <Link href="../form/form" asChild>
              <TouchableOpacity>
                <AntDesign name="check" size={30} color="white" />
              </TouchableOpacity>
            </Link>
            <Link href="../home/home" asChild>
              <TouchableOpacity onPress={() => setImageCaptured(false)}>
                <AntDesign name="close" size={30} color="white" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
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
