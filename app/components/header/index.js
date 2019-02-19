import React from "react";

//import liraries
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  Platform
} from "react-native";
import LeftElement from "./LeftElement";
import CenterElement from "./CenterElement";
import RightElement from "./RightElement";

import { width } from "../../styles";

const isAndroid = Platform.OS === "android";

// create a component
export default class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchActive: false,
      focusInput: false,
      searchValue: "",
      toolBar: new Animated.Value(0)
    };
  }

  componentWillReceiveProps(nextProps) {}

  animated = toValue => {
    Animated.timing(this.state.toolBar, {
      toValue: 75,
      duration: 122
    }).start(() => {
      Animated.timing(this.state.toolBar, {
        toValue,
        duration: 122
      });
    });
  };

  onPressPressed = () => {
    this.animated(150);
    this.setState({ isSearchActive: true });
  };

  onSearchClose = () => {
    this.animated(0);
    this.setState({ isSearchActive: false, searchValue: "" });
  };

  onSearchTextChange = searchValue => {
    this.setState({ searchValue });
  };

  onSearchClearPressed = () => {
    this.setState({ searchValue: "" });
  };

  render() {
    const { searchValue, isSearchActive } = this.state;

    let bar = this.state.toolBar.interpolate({
      inputRange: [0, 150],
      outputRange: ["rgb(0,0,0)", "rgb(255,255,255)"]
    });

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={styles.container}>
          <View style={styles.statusBar} />
          <Animated.View
            style={[
              styles.toolBarContainer,
              { backgroundColor: isSearchActive ? "white" : "transparent" }
            ]}
          >
            <LeftElement
              isSearchActive={isSearchActive}
              onSearchClose={this.onSearchClose}
            />
            <CenterElement
              isSearchActive={isSearchActive}
              onSearchTextChange={this.onSearchTextChange}
              searchValue={searchValue}
              title=""
            />
            <RightElement
              isSearchActive={isSearchActive}
              searchValue={searchValue}
              onPressPressed={this.onPressPressed}
              onSearchClear={this.onSearchClearPressed}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const heightHeader = 80;
const statusBar = 30;

// define your styles
const styles = StyleSheet.create({
  container: {
    height: heightHeader,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: "transparent",
    marginHorizontal: 5,
    elevation: 4
  },
  statusBar: {
    height: statusBar + 5
  },
  toolBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    height: heightHeader - statusBar - 5,
    flex: 1
  }
});
