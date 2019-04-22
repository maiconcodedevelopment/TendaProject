import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient, Font } from "expo";

let color1 =  "#130e1b/#1f0322"

export default class ContainerLayout extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../../assets/fonts/roboto/Roboto-Medium.ttf")
    });
  }

  render() {
    // console.warn(this.props);
    return (
      <View style={styles.containerCenter}>
        <LinearGradient
          colors={["#130e1b", "#560a5f"]}
          style={this.props.style}
        >
          {this.props.children}
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerCenter: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});
