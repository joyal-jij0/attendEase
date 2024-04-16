import { StyleSheet, View, Text, Image } from "react-native";

const RohanImage = require("../../assets/img_3.jpg");

export default function Profile() {
  return (
    <View style={styles.blackContainer}>
      <View style={styles.flexbox}>
        <View>
          <Image source={RohanImage} style={styles.imgStyles} />
        </View>
        <View style={styles.marginLeft}>
          <Text style={[styles.text, styles.bold]}>Rohan Singh Jadoan</Text>
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
    width: 100,
    height: 100,
    borderRadius: 50,
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
  },
  marginLeft: {
    marginLeft: 10,
  },
});
