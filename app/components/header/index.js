import React from "react";

//import liraries
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  FlatList,
  Image,
  Platform
} from "react-native";
import LeftElement from "./LeftElement";
import CenterElement from "./CenterElement";
import RightElement from "./RightElement";

import { width, height } from "../../styles";
import { URLModel } from "../../redux/model/URLModel";
import { request } from "../../config/requestConfig";
import { requestProductSearch } from "../../redux/actions/Products/request";

const isAndroid = Platform.OS === "android";

// create a component
export default class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchActive: false,
      focusInput: false,
      searchValue: "",
      toolBar: new Animated.Value(0),
      products: []
    };
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate() {}

  searchDispatch(search) {
    let model = new URLModel(request.product.search, "GET");
    model.append("search", search.length > 0 ? search : "");
    model.concatURL();

    requestProductSearch(model.getURL()).then(response => {
      console.log(response);
      this.setState({
        products: response
      });
    });
  }

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
    this.searchDispatch(this.state.searchValue);
  };

  onSearchClearPressed = () => {
    this.setState({ searchValue: "" });
  };

  render() {
    const { searchValue, isSearchActive, products } = this.state;

    let bar = this.state.toolBar.interpolate({
      inputRange: [0, 150],
      outputRange: ["rgb(0,0,0)", "rgb(255,255,255)"]
    });

    let animatedMask = this.state.toolBar.interpolate({
      inputRange: [0, 150],
      outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,1)"]
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
          <View style={[styles.searchList]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                borderBottomLeftRadius: 2,
                borderBottomRightRadius: 2
              }}
              horizontal={false}
              keyExtrador={(item, index) => index.toString()}
              data={products}
              renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 10
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item.images[0] }}
                    />
                  </View>
                  <Text> {item.name} </Text>
                </View>
              )}
            />
          </View>
        </View>
        <Animated.View
          style={[
            {
              backgroundColor: isSearchActive
                ? "rgba(0,0,0,0.4)"
                : "rgba(0,0,0,0)"
            },
            {
              width,
              height,
              zIndex: isSearchActive ? 2 : -1,
              position: "absolute",
              left: 0,
              right: 0,
              top: 0
            }
          ]}
        />
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
    zIndex: 3,
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
  },
  searchList: {
    position: "absolute",
    top: heightHeader,
    left: 0,
    right: 0,
    marginHorizontal: 5,
    backgroundColor: "red",
    flex: 1
  }
});
