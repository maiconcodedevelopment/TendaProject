import React, { Easing, Animated , View , Text } from "react-native";

import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  StackNavigator,
  DrawerNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from "react-navigation";

import AuthLoading from "../views/AuthLoading";
import Auth from "../views/login/index";
import App from "../views/app/index";
import Produtcs from "../views/Produts";
import SearchProducts from "../views/SearchProducts"
import Product from "../views/Product";
import CardProducts from "../views/CartProducts"
import FilterProducts from "../views/FilterProducts";
import FilterTypes from "../views/FilterProducts/screen/FilterTypes";
import FilterColors from "../views/FilterProducts/screen/FilterColors";
import Cart from "../views/Cart";

import  Sidebar from "../components/drawer";
import HeaderCheckout from "../components/header/HeaderCheckout"

import AdressTransaction from "../views/Transaction/screen/Adress";
import Transaction from "../views/Transaction"
import TransactionList from "../views/TransactionList";

let transitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      let params = scene.route.params || {};

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;
      const height = layout.initHeight;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0]
      });

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      });

      const translateOpacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1]
      });

      const translateYAnimation = {
        transform: [
          {
            translateY
          }
        ]
      };

      const transformAnimationFilter = {
        transform: [
          {
            translateY
          }
        ]
      };

      if (params.animatetop) return translateYAnimation;
      if (params.animateFilter) return transformAnimationFilter;

      return {
        transform: [
          {
            translateX
          }
        ]
      };
    }
  };
};

const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

export let RouteBottomTransaction = createAppContainer(createBottomTabNavigator({
   AdressTransaction : {
      screen : AdressTransaction,
   }
},{
  // navigationOptions : ({navigation}) => {
  //   return {
  //     header : props => <HeaderCheckout navigation={navigation} />
  //   }
  // }
  //  tabBarComponent : ({ navigation }) => <HeaderCheckout navigation={navigation} />
}))

const routeAuth = createStackNavigator({
  Auth: {
    screen: Auth,
    navigationOptions: {
      header: null
    }
  }
});

const routerApp = createStackNavigator(
  {
    App: {
      screen: App,
      navigationOptions: {}
    },
    Produtcs: {
      screen: Produtcs
    },
    SearchProducts : {
      screen : SearchProducts,
    },
    Product: {
      screen: Product,
    },
    FilterProducts: {
      screen: FilterProducts,
      navigationOptions: {
        header: null
      }
    },
    FilterTypes: {
      screen: FilterTypes,
      navigationOptions: {}
    },
    FilterColors: {
      screen: FilterColors,
      navigationOptions: {}
    },
    Transaction : { 
      screen :  Transaction,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    transitionConfig: transitionConfiguration,
    initialRouteName: "App",
  }
);

const menuDrawer = createDrawerNavigator(
  {
    Home: {
      screen: routerApp
    },
    CardProducts : {
      screen : CardProducts
    },
    TransactionList : {
      screen : TransactionList
    }
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
    contentComponent: Sidebar
  }
);

export let Route = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      Auth: routeAuth,
      App: menuDrawer
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
