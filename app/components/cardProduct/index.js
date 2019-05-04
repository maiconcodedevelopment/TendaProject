import React from "react";
//import liraries
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  Animated,
  LayoutAnimationAnim,
  Easing
} from "react-native";

import { TouchableHighlight, TouchableOpacity } from "react-native";

import { width, height, wp, itemProductHorizontal, colors } from "../../styles";

import love from "../../assets/icons/png/love_shash.png";
import loveactive from "../../assets/icons/png/love_shash_black.png";
import { LinearGradient } from "expo";
// create a component
export class CardProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(1)
    };
  }

  animateLike() {
    Animated.sequence([
      Animated.timing(this.state.animatedValue, {
        toValue: 1.5,
        duration: 1000,
        easing: Easing.bounce
      }),
      Animated.timing(this.state.animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce
      })
    ]).start();
  }

  activeLike(active) {
    if (active) {
      return require("../../assets/icons/png/love_shash_black.png");
    } else {
      return require("../../assets/icons/png/love_shash.png");
    }
  }

  descontActive(descont) {
    if (Number(descont) !== 0) {
      return (
        <View style={styles.productSpotlight}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              fontFamily: "Roboto",
              color: "white",
              height: 16
            }}
          >
            {Number(descont).toFixed(0)}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              fontFamily: "Roboto",
              color: "white",
              height: 16
            }}
          >
            OFF
          </Text>
        </View>
      );
    }
    return null;
  }

  priceFormat(price) {
      return new Intl.NumberFormat('pt-br',{ style : 'currency', currency : 'BRL' }).format(price)
  }

  render() {
    let animateLikeTransform = {
      transform: [{ scale: this.state.animatedValue }]
    };

    const {
      id,
      image,
      name,
      price,
      descont,
      product,
      like,
      onScreen,
      activeLikeProduct
    } = this.props;

    let images = image.length > 0 ? image[0] : null

    return (
      <View style={styles.cardProduct}>
        <TouchableHighlight onPress={() => onScreen(product)}>
          <ImageBackground
            source={{ uri: images }}
            resizeMode="cover"
            style={styles.productImage}
          >
            <LinearGradient
              colors={["transparent", "transparent", "rgba(0,0,0,0.6)"]}
              style={{
                flex: 1,
                alignSelf: "stretch",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View style={styles.productOn}>
                {this.descontActive(descont)}

                <TouchableOpacity
                  onPress={() => {
                    activeLikeProduct(id,product);
                  }}
                  onPressOut={this.animateLike.bind(this)}
                >
                  <Animated.View style={animateLikeTransform}>
                    <Image
                      style={{ width: 35, height: 35, marginLeft: "auto" }}
                      source={this.activeLike(like)}
                    />
                  </Animated.View>
                </TouchableOpacity>
              </View>

              <View style={styles.productDown}>
                <Text style={styles.textName} numberOfLines={2} >{name}</Text>

                <View style={styles.productPrice}>
                  <Text
                    style={{
                      fontSize: 12,
                      paddingRight: 2,
                      color: "white",
                      fontWeight: "500",
                      fontFamily: "Roboto"
                    }}
                  >
                    {" "}
                    R${" "}
                  </Text>
                  <Text style={styles.textPrice}>
                    {this.priceFormat(price)}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableHighlight>
      </View>
    );
  }
}

const itemproduct = itemProductHorizontal(45, 2);
const itemproductheight = 0.3;

// define your styles
const styles = StyleSheet.create({
  cardProduct: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: itemproduct.margin,
    marginBottom: 5,
    width: itemproduct.width,
    height: height * itemproductheight,
    overflow: "hidden",
    borderRadius: 4
  },
  productImage: {
    width: itemproduct.width,
    height: height * itemproductheight,
    justifyContent: "center",
    alignItems: "center"
  },
  productOn: {
    width: itemproduct.width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 5
  },
  productSpotlight: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: colors.lightGreen
  },
  productDown: {
    flexDirection: "row",
    alignItems: "stretch",
    height: "auto",
    padding: 5
  },
  textName: {
    flex: 1.5,
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 12
  },
  productPrice: {
    flex: 1.2,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  textPrice: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "500",
    alignItems: "center"
  }
});

//make this component available to the app
