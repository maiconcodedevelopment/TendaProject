import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Expo from "expo";

import { Route } from "./app/router";

import { createStore } from "redux";
import { NativeComponent } from "react-native";
import { NavigationAction, NavigationContainer } from "react-navigation";
import { Provider } from "react-redux";
import { connect } from "react-redux";

import { storeRedux } from "./app/redux"

import Login from "./app/views/app";

import LoginFacebook from "./app/LoginFacebook";

const id = "821462101536988";

const initialState = {
  count: 0
};

const reducer = (state = initialState, action) => {
  if (action.type === "INCREASE_COUNT") {
    console.warn(state);
    return {
      count: state.count + 1
    };
  }
  if (action.type === "LIKE") {
    return "like word";
  }
  return state;
};

const store = createStore(reducer);

export default class App extends React.Component {
  // login = async () => {
  //   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
  //     "821462101536988",
  //     {
  //       permissions: ["public_profile", "email", "user_firends"]
  //     }
  //   );

  //   console.warn(token);

  //   if (type == "success") {
  //     const response = await fetch(
  //       `https://graph.facebook.com/me?access_token=${token}`
  //     );
  //     console.log(resposne);

  //     const json = response.json();

  //     console.log(json);
  //   } else {
  //     alert(type);
  //   }
  // };

  render() {
    return ( 
       <Provider store={storeRedux} >
         <Route />
      </Provider>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
