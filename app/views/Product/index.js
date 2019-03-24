import React from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  StyleSheet,
  Animated,
  Easing
} from "react-native";

import { connect } from "react-redux";

import { IconNode } from "react-native-elements";
import { width, colors } from "../../styles";
import ContainerLayout from "../../components/containerLayout";

HEIGHT_CARD_PRODUCTS = 300;
HEIGHT_CARD_PRODUCTS_MIN = 100;

SIZE_BUTTON_LIKE = 60;

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  componentWillUpdate(nextProps) {
    console.warn(nextProps);
  }

  getProduct() {}

  render() {
    const { navigation } = this.props;
    const { images } = navigation.state.params;

    const heightProduct = {
      height: HEIGHT_CARD_PRODUCTS
    };

    const heightAnimtedScroll = this.state.scrollY.interpolate({
      inputRange: [0, HEIGHT_CARD_PRODUCTS - HEIGHT_CARD_PRODUCTS_MIN],
      outputRange: [HEIGHT_CARD_PRODUCTS, HEIGHT_CARD_PRODUCTS_MIN],
      extrapolate: "clamp"
    });

    const topAnimtedScroll = this.state.scrollY.interpolate({
      inputRange: [0, HEIGHT_CARD_PRODUCTS - HEIGHT_CARD_PRODUCTS_MIN],
      outputRange: [
        HEIGHT_CARD_PRODUCTS - (SIZE_BUTTON_LIKE + 15),
        HEIGHT_CARD_PRODUCTS_MIN - SIZE_BUTTON_LIKE / 2
      ],
      extrapolate: "clamp"
    });

    const rightAnimtedScroll = this.state.scrollY.interpolate({
      inputRange: [0, HEIGHT_CARD_PRODUCTS - HEIGHT_CARD_PRODUCTS_MIN],
      outputRange: [width / 2 - SIZE_BUTTON_LIKE / 2, 20],
      extrapolate: "clamp"
    });

    return (
      <ContainerLayout style={{ flex: 1 }}>
        <Animated.View
          style={{
            width: SIZE_BUTTON_LIKE,
            height: SIZE_BUTTON_LIKE,
            backgroundColor: colors.lightSlash,
            position: "absolute",
            top: topAnimtedScroll,
            right: rightAnimtedScroll,
            zIndex: 2,
            borderRadius: SIZE_BUTTON_LIKE / 2,
            marginLeft: 10
          }}
        />

        <Animated.ScrollView
          style={[
            {
              height: heightAnimtedScroll,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1
            }
          ]}
          //   onScrollBeginDrag={() => console.warn("sim")}
          contentOffset={c => console.warn(c)}
          horizontal={true}
          pagingEnabled={true}
        >
          {images.map((image, index) => (
            <Animated.View
              key={index}
              style={[{ width, flex: 1, backgroundColor: "white" }]}
            >
              <ImageBackground
                source={{ uri: image }}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </Animated.View>
          ))}
        </Animated.ScrollView>

        <Animated.ScrollView
          style={{
            paddingTop: heightAnimtedScroll,
            flex: 1
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          <Text style={{ fontSize: 30 }}>
            NÃO SEJA UM DICKENS NO NATAL (03/05) - UMA FAMÍLIA DA PESADA 16ª
            TEMPORADA - S16E09NÃO SEJA UM DICKENS NO NATAL (03/05) - UMA FAMÍLIA
            DA PESADA 16ª TEMPORADA - S16E09NÃO SEJA UM DICKENS NO NATAL (03/05)
            - UMA FAMÍLIA DA PESADA 16ª TEMPORADA - S16E09NÃO SEJA UM DICKENS NO
            NATAL (03/05) - UMA FAMÍLIA DA PESADA 16ª TEMPORADA - S16E09NÃO SEJA
            UM DICKENS NO NATAL (03/05) - UMA FAMÍLIA DA PESADA 16ª TEMPORADA -
            S16E09NÃO SEJA UM DICKENS NO NATAL (03/05) - UMA FAMÍLIA DA PESADA
            16ª TEMPORADA - S16E09NÃO SEJA UM DICKENS NO NATAL (03/05) - UMA
            FAMÍLIA DA PESADA 16ª TEMPORADA - S16E09NÃO SEJA UM DICKENS NO NATAL
            (03/05) - UMA FAMÍLIA DA PESADA 16ª TEMPORADA - S16E09NÃO SEJA UM
            DICKENS NO NATAL (03/05) - UMA FAMÍLIA DA PESADA 16ª TEMPORADA -
            S16E09NÃO SEJA UM DICKENS NO NATAL (03/05) - UMA FAMÍLIA DA PESADA
            16ª TEMPORADA - S16E09NÃO SEJA UM DICKENS NO NATAL (03/05) - UMA
            FAMÍLIA DA PESADA 16ª TEMPORADA - S16E09
          </Text>
        </Animated.ScrollView>
      </ContainerLayout>
    );
  }
}

const mapStateProps = state => ({
  product: state.products.products
});

export default connect(mapStateProps)(Product);

const styles = StyleSheet.create({
  cardProductView: {
    flex: 1,
    width
  },
  likeLove: {}
});
