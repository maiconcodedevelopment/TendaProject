import React from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Easing,
  TouchableNativeFeedback,
  StyleSheet
} from "react-native";

import { colors, width, height } from "../../../../../../styles";

export default class CardColor extends React.Component {
  state = {
    animateScale: new Animated.Value(1)
  };

  _animatecolor() {
    Animated.sequence([
      Animated.timing(this.state.animateScale, {
        toValue: 1.5,
        duration: 500,
        easing: Easing.bounce
      }),
      Animated.timing(this.state.animateScale, {
        toValue: 1,
        duration: 500,
        easing: Easing.bounce
      })
    ]).start();
  }

  render() {
    const { id, color, active, onTouchColor } = this.props;

    let tranformAnimated = {
      transform: [{ scale: this.state.animateScale }]
    };

    return (
      <TouchableNativeFeedback
        onPress={() => onTouchColor(id)}
        onPressOut={this._animatecolor.bind(this)}
      >
        <View style={styles.cardColor}>
          <Animated.View
            style={[
              styles.colorCashier,
              { backgroundColor: color },
              tranformAnimated
            ]}
          >
            {active ? (
              <Image
                style={styles.carColorImage}
                source={require("../../../../../../assets/icons/png/active_white.png")}
              />
            ) : null}
          </Animated.View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cardColor: {
    width: width / 4,
    padding: 15,
    height: height * 0.2,
    alignItems: "center",
    justifyContent: "center"
  },
  colorCashier: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  carColorImage: {
    width: 15,
    height: 15
  }
});
