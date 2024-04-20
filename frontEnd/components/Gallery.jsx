import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import { useDispatch } from "react-redux";
import { setImage } from "../redux/features/imageSlice";

export default function Gallery() {
  const dispatch = useDispatch();
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      dispatch(setImage(result.assets[0].uri));
    }
  };
  return (
    <>
      <Link href="../camera/cameraPreview" asChild>
        <TouchableOpacity onPress={pickImageAsync}>
          <View style={styles.blackContainer}>
            <MaterialIcons name="insert-photo" size={100} color="#2B70E4" />
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
