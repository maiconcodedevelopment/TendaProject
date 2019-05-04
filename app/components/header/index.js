import React from "react";

//import liraries
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";

import { bindActionCreators } from "redux"
import { connect  } from "react-redux"

import LeftElement from "./LeftElement";
import CenterElement from "./CenterElement";
import RightElement from "./RightElement";

import { width, height } from "../../styles";
import { URLModel } from "../../redux/model/URLModel";
import { request } from "../../config/requestConfig";
import { requestProductSearch } from "../../redux/actions/Products/request";
import { navigationActionProduct } from "../../router/actions/Product";

import { searchAddProducts } from "../../redux/actions/Products"
import { navigationActionSearchProducts } from "../../router/actions/SearchProducts";

const isAndroid = Platform.OS === "android";

// create a component
class HeaderSearch extends React.Component {

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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps)
  }

  searchDispatch(search) {
    const { user } = this.props

    let model = new URLModel(`${request.product.search}${user.id}`, "GET");
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
    this.setState({ products : [] })
  };

  onSearchTextChange = searchValue => {
    this.setState({ searchValue },() => {
       this.searchDispatch(this.state.searchValue);
    });
  };

  onSearchSubmit = (value) => {

    const { searchAddProducts , user } = this.props
    console.log(value)

    if(value.length > 0){
      let model = new URLModel(`${request.product.search}${user.id}`, "GET");
      model.append("search", value.length > 0 ? value : "");
      model.concatURL();
  
      requestProductSearch(model.getURL()).then(response => {
        searchAddProducts(response)
        this.props.navigation.dispatch(navigationActionSearchProducts(value))
      }).then(() => {
        this.onSearchClose()
      });
      
    }


    // let model = new URLModel(request.product.search, "GET");
    // model.append("search", value.length > 0 ? value : "");
    // model.concatURL();

    // requestProductSearch(model.getURL()).then((response) => {
    //   this.props.searchAddProducts(response)
    // })
  }

  onSearchClearPressed = () => {
    this.setState({ searchValue: "" });
    this.setState({ products : [] })
  };

  onPressBack = () => {

  }

  render() {
    const { navigation , onPressBack , onPress } = this.props
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
              onPressBack={onPressBack}
              onPress={onPress}
            />
            <CenterElement
              isSearchActive={isSearchActive}
              onSearchTextChange={this.onSearchTextChange}
              onSearchSubmit={this.onSearchSubmit}
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
          <View style={[styles.searchList,{ display : isSearchActive ? "flex" : "none" }]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                borderBottomLeftRadius: 2,
                borderBottomRightRadius: 2
              }}
              
              horizontal={false}
              keyExtrador={(item, index) => item.id}
              data={products}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ zIndex : 6,flex: 1, flexDirection: "row" , padding : 10 , alignItems : "center" }} onPress={() => console.warn("simfd")} >
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
                  </TouchableOpacity>
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

let mapStateProps = state => ({
  user : state.user,
  products : state.products.products
})

let mapDispatchProps = dispatch => bindActionCreators({ searchAddProducts },dispatch)

export default connect(mapStateProps,mapDispatchProps)(HeaderSearch)

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
    maxHeight : height * 0.4,
    top: heightHeader,
    left: 0,
    right: 0,
    marginHorizontal: 5,
    backgroundColor: "white",
    flex: 1,
    borderBottomLeftRadius : 4,
    borderBottomRightRadius : 4,
    overflow : "hidden"
  }
});
