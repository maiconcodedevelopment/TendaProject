import React from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackgroundComponent,
  StyleSheet,
  Image,
  ImageResizeMode,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { width, colors, wp, height, itemProductHorizontal } from "../../styles";
import ContainerLayout from "../../components/containerLayout";

import { Svg } from "expo";
import { CardProduct } from "../../components/cardProduct";

//methots request
import { requestAddProduct , requestPromotionsProduct } from "../../redux/actions/Products/request";

//methos dispatch
import { userAddProduct , promotionsAddProduct } from "../../redux/actions/Products";

//routes dispatch
import { navigationActionFilterProducts } from "../../router/actions/FilterProducts";
import HeaderSearch from "../../components/header";
import { navigationActionProduct } from "../../router/actions/Product";

class Produtcs extends React.Component {
  
  static navigationOptions = ({navigation}) => {
    return {
       header: <HeaderSearch  navigation={navigation} onPressBack={() => navigation.goBack()} onPressNavigation={() => { console.log("sim ism") } } />
    }
  };

  constructor(state) {
    super(state);
    this.state = {
      products: [],
      productQuantity: 10,
      refreging: false
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  navigatefilterProducts() {
    const { navigation } = this.props;
    navigation.dispatch(navigationActionFilterProducts);
  }



  updateProducts(products) {
    this.setState({ products });
  }

  requestProducts() {
    setTimeout(() => {
      this.setState({
        refreging: false
      });
    }, 2000);
  }

  onRefreshProducts() {
    this.setState(
      {
        refreging: true
      },
      () => {
        this.requestProducts();
      }
    );
  }

  activeLikeProduct(id) {
    requestAddProduct(1, id)
      .then(response => {
        this.props.userAddProduct(id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onScreenProduct(product) {
    const { navigation } = this.props;
    navigation.dispatch(navigationActionProduct(product));
  }

  render() {
    const { products } = this.props.products;
    const { refreging } = this.state;

    return (
      <ContainerLayout
        style={{
          width,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flex: 1
        }}
      >
        <View style={styles.headerFilter}>
          <TouchableNativeFeedback
            style={styles.buttonFilter}
            onPress={this.navigatefilterProducts.bind(this)}
          >
            <Image  source={require("../../assets/icons/png/filter_shash.png")} style={{ width : 25 , height : 25 }} />
          </TouchableNativeFeedback>
        </View>

        <FlatList
          contentContainerStyle={styles.containerProducts}
          refreshing={refreging}
          onRefresh={this.onRefreshProducts.bind(this)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={products}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <CardProduct
              like={item.like}
              id={item.id}
              name={item.name}
              price={item.price}
              descont={item.descont}
              image={item.images}
              product={item}
              onScreen={this.onScreenProduct.bind(this)}
              activeLikeProduct={this.activeLikeProduct.bind(this)}
            />
          )}
        />
      </ContainerLayout>
    );
  }
}

const mapStateProps = state => ({
  products: state.products
});

const mapDispatchProps = dispatch =>
  bindActionCreators({ userAddProduct, promotionsAddProduct }, dispatch);

export default connect(
  mapStateProps,
  mapDispatchProps
)(Produtcs);

const styles = StyleSheet.create({
  headerFilter: {
    alignItems: "flex-end",
    justifyContent: "center",
    width,
    height: 30,
    paddingHorizontal: 10,
    marginTop: 95,
    paddingBottom : 15,
  },
  buttonFilter: {
    borderBottomColor: colors.slashStrong,
    borderWidth: 2,
    borderLeftWidth: -50
  },
  buttonFiltertext: {
    color: "white"
  },
  containerProducts: {
    width,
    alignItems: "center",
    justifyContent: "center"
  }
});
