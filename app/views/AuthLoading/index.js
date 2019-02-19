import React from "react";
import {
  View,
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  Dimensions
} from "react-native";
import { navigationAppAction } from "../../router/actions/App";
import { navigationAuthAction } from "../../router/actions/Auth";

const height = Dimensions.get("screen").height;

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    console.log("sim esta");
    this._vetifyAuthLoading();
  }

  async _vetifyAuthLoading() {
    await AsyncStorage.getItem("user").then(item => {
      console.log("este >:");
      console.log(item);
      if (item) {
        this.props.navigation.dispatch(navigationAppAction);
      } else {
        this.props.navigation.dispatch(navigationAuthAction);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: height
  }
});
