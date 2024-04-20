import { StyleSheet, View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
  return (
    <View style={styles.blackContainer}>
      <View style={styles.flexbox}>
        <View style={styles.imgStyles}>
          <MaterialIcons name="account-circle" size={100} color="#2B70E4" />
        </View>
        <View style={[styles.marginLeft, styles.imgStyles]}>
          <Text style={[styles.text, styles.bold]}>Proff. XYZ</Text>
          <Text style={styles.text}>Asst. Prof. AI & DS</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blackContainer: {
    backgroundColor: "#000000",
    height: 170,
    padding: 20,
  },
  imgStyles: {
    marginTop: 20,
  },
  text: {
    color: "white",
  },
  flexbox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
    fontSize: 23,
    color: "#2B70E4",
  },
  marginLeft: {
    marginLeft: 10,
  },
});
