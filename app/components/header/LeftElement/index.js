import React from "react";
import { View, Animated, Easing, Platform, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default class LeftElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftElement: "menu",
      spinValue: new Animated.Value(0)
    };
  }

  componentWillReceiveProps(nextprops) {
    console.log(this.props.isSearchActive);
    console.log("----");
    console.log(nextprops.isSearchActive);

    

    if (nextprops.isSearchActive && !this.props.isSearchActive && !this.props.onPressBack ) {
      this.animate({ toValue: 1, leftElement: "arrow-forward" });
    }

    if (!nextprops.isSearchActive && this.props.isSearchActive && !this.props.onPressBack ) {
      this.animate({ toValue: 0, leftElement: "menu" });
    }
  }

  animate = ({ toValue, leftElement }) => {
    Animated.timing(this.state.spinValue, {
      toValue: 0.5,
      duration: 112,
      easing: Easing.linear,
      useNativeDriver: Platform.OS === "android"
    }).start(() => {
      this.setState({ leftElement });

      Animated.timing(this.state.spinValue, {
        toValue,
        duration: 112,
        easing: Easing.linear,
        useNativeDriver: Platform.OS === "android"
      }).start();
    });
  };

  render() {
    const { leftElement, spinValue } = this.state;
    const { isSearchActive, onSearchClose , onPressBack , onPress } = this.props;

    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"]
    });

    return (
      <Animated.View
        style={[styles.container, { transform: [{ rotate: onPressBack ? "180deg" :spin }] }]}
      >
        <Icon
          name={onPressBack ? "arrow-forward" : leftElement }
          color={isSearchActive ? "black" : "white"}
          onPress={isSearchActive ? onSearchClose : onPress ? onPress : onPressBack}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
