import Camera from "./Camera";
import Gallery from "./Gallery";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function Action() {
  return (
    <>
      <View style={styles.blueContainer}>
        <Camera />
        <Provider store={store}>
          <Gallery />
        </Provider>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  blueContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2B70E4",
    height: " 100%",
  },
});
