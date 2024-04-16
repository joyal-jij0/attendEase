import { StyleSheet, View, Text, Image } from "react-native";

const profileImage = require("../../assets/user.png");
const homeImage = require("../../assets/home.png");
const redirectImage = require("../../assets/export.png");

export default function BottomBar() {
  return (
    <>
      <View style={styles.blackContainer}>
        <View style={styles.flexbox}>
          <View>
            <Image style={styles.image} source={profileImage} />
          </View>
          <View>
            <Image style={styles.image} source={homeImage} />
          </View>
          <View>
            <Image source={redirectImage} />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  blackContainer: {
    backgroundColor: "#000000",
    height: 50,
    padding: 20,
  },
  flexbox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: 25,
  },
  text: {
    color: "#2B70E4",
  },
});
