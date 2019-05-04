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

import { connect } from "react-redux";

import { navigationAppAction } from "../../router/actions/App";
import { navigationAuthAction } from "../../router/actions/Auth";
import { requestUserGet } from "../../redux/actions/Users/request";
import { userSetState } from "../../redux/actions/Users";

const height = Dimensions.get("screen").height;

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    console.log("sim esta");
    this._vetifyAuthLoading();
  }

  async _vetifyAuthLoading() {
    await AsyncStorage.getItem("user").then(item => {
      console.log(item)
      // console.log("este >:");
      // console.log(item);
      if (item) {
        console.log("sim sim ")
        console.log(item)
        requestUserGet({ iduser  : parseInt(item) }).then(({ response }) =>{
          this.props.dispatch(userSetState(response))
        }).then(() => {
          this.props.navigation.dispatch(navigationAppAction);
        }).catch((error) => {
           console.log(error)
           this.props.navigation.dispatch(navigationAuthAction);
        })
        
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

export default connect()(AuthLoading)

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
