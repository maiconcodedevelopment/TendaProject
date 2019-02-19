import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";

import { wp, colors, height, sliderHeight } from "../../styles";

export default class CardCarrosel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description } = this.props;

    return (
      <ImageBackground
        source={require("../../assets/img/cardCarrosel/sexo.png")}
        resizeMode="cover"
        resizeMethod="resize"
        style={styles.cardCarrosel}
      >
        <View style={styles.cardDown}>
          <View style={{ flex: 1, paddingRight: 15 }}>
            <Text style={styles.cardTitle}> {title} </Text>
            <Text style={styles.cardDesc}> {description} </Text>
          </View>
          <View style={styles.cardTouch}>
            <Image
              source={require("../../assets/icons/png/touch_shash.png")}
              style={styles.iconTouch}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const cardwidth = wp(80);
const cardheight = height * 0.35;

const styles = StyleSheet.create({
  cardCarrosel: {
    width: cardwidth,
    height: sliderHeight,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 4,
    overflow: "hidden"
  },
  cardDown: {
    width: cardwidth,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingBottom: 15
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8
  },
  cardDesc: {
    fontSize: 12,
    color: "white",
    fontWeight: "300",
    paddingRight: 15
  },
  cardTouch: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: colors.slashStrong
  },
  iconTouch: {
    width: 14,
    height: 17
  }
});
