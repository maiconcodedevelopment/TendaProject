import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackgroundComponent,
  ImageBackgroundBase,
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { colors } from "../../styles";
import { BoxShadow, BorderShadow } from "expo-react-native-shadow";
import { ImagePicker, Svg } from "expo";

const shadowStyle = {
  width: 130,
  height: 180,
  color: colors.slashStrong,
  border: 2,
  radius: 3,
  opacity: 1,
  x: -3,
  y: 3,
  style: { marginVertical: 0, marginRight: 25 }
};

const shadowCategoryType = {
  width: 40,
  height: 40,
  color: "#000000",
  border: 12,
  radius: 6,
  opacity: 0.1,
  x: 10,
  y: -9,
  style: {
    marginVertical: 0,
    position: "absolute",
    bottom: 5,
    left: 5
  }
};

export default class CardCategorySpotlight extends React.Component {
  render() {
    const { icon, spotlight, onTouchSpotlight } = this.props;

    return (
      <BoxShadow setting={shadowStyle}>
        <TouchableWithoutFeedback onPress={onTouchSpotlight}>
          <ImageBackground
            source={spotlight}
            resizeMode="cover"
            resizeMethod="resize"
            style={styles.cardCategorySpotlight}
          >
            <BoxShadow setting={shadowCategoryType}>
              <View style={styles.cardCategoryType}>
                <Image style={{ width: 28, height: 28 }} source={icon} />
              </View>
            </BoxShadow>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </BoxShadow>
    );
  }
}

const styles = StyleSheet.create({
  cardCategorySpotlight: {
    width: shadowStyle.width,
    height: shadowStyle.height,
    borderRadius: 2,
    backgroundColor: "white",
    marginRight: 20,
    position: "relative"
  },
  cardCategoryType: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 5,
    bottom: 5,
    width: 50,
    height: 50,
    borderRadius: 2,
    backgroundColor: "white"
  }
});
