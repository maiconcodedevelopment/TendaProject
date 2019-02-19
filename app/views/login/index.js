import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Dimensions,
  AsyncStorage,
  TouchableWithoutFeedback
} from "react-native";

import { StackActions, NavigationActions } from "react-navigation";

import { LinearGradient, Font } from "expo";
import { navigationAppAction } from "../../router/actions/App";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const navigationActions = NavigationActions.navigate({
  routeName: "Home",
  params: {},
  action: NavigationActions.navigate({ routeName: "Home" })
});

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "App" })]
});

export default class Login extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      user: {
        data: "",
        password: ""
      }
    };

    console.warn(this.props);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../../assets/fonts/roboto/Roboto-Medium.ttf")
    });
  }

  componentWillReceiveProps() {
    console.warn("sim");
  }

  async onLogin() {
    await AsyncStorage.setItem("user", JSON.stringify(this.state.user));
    await AsyncStorage.getItem("user").then(user => console.warn(user));

    this.props.navigation.dispatch(navigationAppAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#130e1b", "#1f0322"]}
          style={{
            flex: 1,
            width,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            style={styles.logo}
            source={require("../../assets/img/main-logo.png")}
          />
          <View style={styles.inputLogin}>
            <TextInput
              style={styles.inputTextLogin}
              placeholder="Login"
              underlineColorAndroid="#3e0644"
              onChangeText={text =>
                this.setState({ user: { ...this.state.user, data: text } })
              }
            />
          </View>
          <View style={styles.inputLogin}>
            <TextInput
              style={styles.inputTextLogin}
              placeholder="Senha"
              underlineColorAndroid="#3e0644"
              secureTextEntry={true}
              onChangeText={text =>
                this.setState({ user: { ...this.state.user, password: text } })
              }
            />
          </View>
          <View />
          <View
            style={{
              width: width * 0.8,
              height: 60,
              textTransform: "capitalize"
            }}
          >
            <Button
              onPress={this.onLogin.bind(this)}
              style={styles.buttonlogin}
              color="#65ff70"
              title="Entrar"
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  logo: {
    width: 100,
    height: 90
  },
  inputLogin: {
    width: width * 0.8,
    marginBottom: 5
  },
  inputTextLogin: {
    color: "white",
    height: 60,
    fontFamily: "Roboto"
  },
  buttonlogin: {
    flex: 1,
    textTransform: "capitalize",
    fontFamily: "Roboto",
    height: 60
  }
});
