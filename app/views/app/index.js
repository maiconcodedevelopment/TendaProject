import React from "react";
import { View, Text, Dimensions, ScrollView, Alert } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { productAll, categoryProductAll } from "../../redux/actions/Products";

import Carrosel from "react-native-snap-carousel";
import ContainerLayout from "../../components/containerLayout";
import CardCarrosel from "../../components/cardCarrosel";

import {
  width,
  height,
  sliderHeight,
  sliderWidth,
  itemHorizontalMargin,
  itemWidth,
  wp
} from "../../styles";

import CardSelectCategory from "../../components/cardSelectCategory";
import CardCategorySpotlight from "../../components/cardCategorySpotlight";

//actions route
import { navigationActionProdutcs } from "../../router/actions/Produtcs";
import { requestCategoryProducts } from "../../redux/actions/Products/request";
import { ProductsModel } from "../../redux/model/ProductsModel";
import { URLModel } from "../../redux/model/URLModel";
import { request } from "../../config/requestConfig";
import HeaderSearch from "../../components/header";

class App extends React.Component {
  static navigationOptions = {
    title: "App",
    header: <HeaderSearch />
  };

  constructor(state) {
    super(state);
    this.state = {
      entries: [
        {
          title: "Comesticos",
          description:
            "Produtos muito bom esta aqui no sexo muito bom mesmo venha comprar"
        },
        {
          title: "Anal",
          description:
            "Produtos muito bom esta aqui no sexo muito bom mesmo venha comprar"
        },
        {
          title: "Freate Grátis",
          description:
            "Produtos muito bom esta aqui no sexo muito bom mesmo venha comprar"
        }
      ]
    };
  }

  componentDidMount() {
    this.props.productAll(10);
  }

  onTouchSelectCategory(id) {
    const { navigation } = this.props;

    let products = new URLModel(request.product.all, "GET");
    products.append("categorys", id);
    products.append("iduser", 1);
    products.concatURL();

    console.log(products.getURL());
    // products.pushUser(1);
    // products.pushCategorys({ categorys: [id] });

    requestCategoryProducts(products.getURL()).then(response => {
      this.props.categoryProductAll(id, response);
      navigation.dispatch(navigationActionProdutcs);
    });
  }

  onTouchSpotlight() {
    Alert.alert("Aperto");
    this.props.products.then(value => console.warn(value));
  }

  _renderItem({ item, index }) {
    return (
      <CardCarrosel
        key={index}
        title={item.title}
        description={item.description}
      />
    );
  }

  render() {
    return (
      <ContainerLayout
        style={{
          width,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flex: 1
        }}
      >
        <ScrollView
          contentContainerStyle={{ paddingTop: 80 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ width, height: sliderHeight, marginTop: 10 }}>
            <Carrosel
              ref={c => (this._carosel = c)}
              data={this.state.entries}
              layout={"default"}
              loop={true}
              renderItem={this._renderItem}
              sliderHeight={sliderHeight}
              sliderWidth={sliderWidth}
              itemWidth={wp(80)}
            />
          </View>

          <View style={{ height: 100, marginVertical: 15 }}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ flexGrow: 1, paddingLeft: 25 }}
              showsHorizontalScrollIndicator={false}
            >
              <CardSelectCategory
                name="Vestidos"
                icon={require("../../assets/icons/png/vestido_white.png")}
                onTouchSelectCategory={this.onTouchSelectCategory.bind(this)}
                id={1}
              />
              <CardSelectCategory
                name="Anal"
                icon={require("../../assets/icons/png/anal_white.png")}
                onTouchSelectCategory={this.onTouchSelectCategory.bind(this)}
                id={2}
              />
              <CardSelectCategory
                name="Vribadores"
                icon={require("../../assets/icons/png/vibrador_white.png")}
                onTouchSelectCategory={this.onTouchSelectCategory.bind(this)}
                id={3}
              />
              <CardSelectCategory
                name="Comésticos"
                icon={require("../../assets/icons/png/comestico_white.png")}
                onTouchSelectCategory={this.onTouchSelectCategory.bind(this)}
                id={4}
              />
              <CardSelectCategory
                name="Pênis"
                icon={require("../../assets/icons/png/penis_white.png")}
                onTouchSelectCategory={this.onTouchSelectCategory.bind(this)}
                id={5}
              />
              <CardSelectCategory
                name="Quismo"
                icon={require("../../assets/icons/png/sata_white.png")}
                onTouchSelectCategory={this.onTouchSelectCategory.bind(this)}
                id={6}
              />
              <CardSelectCategory
                name="Mastubador"
                icon={require("../../assets/icons/png/mastubador_white.png")}
                onTouchSelectCategory={this.onTouchSelectCategory.bind(this)}
                id={7}
              />
            </ScrollView>
          </View>

          <View style={{ height: 190 }}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ flexGrow: 1, paddingLeft: 25 }}
              showsHorizontalScrollIndicator={false}
            >
              <CardCategorySpotlight
                icon={require("../../assets/icons/png/mastubador_shash.png")}
                spotlight={require("../../assets/img/cardCategorySpotlight/promotion.jpg")}
                onTouchSpotlight={this.onTouchSpotlight.bind(this)}
              />
              <CardCategorySpotlight
                icon={require("../../assets/icons/png/comestico_shash.png")}
                spotlight={require("../../assets/img/cardCategorySpotlight/promotion.jpg")}
                onTouchSpotlight={this.onTouchSpotlight.bind(this)}
              />
              <CardCategorySpotlight
                icon={require("../../assets/icons/png/penis_shash.png")}
                spotlight={require("../../assets/img/cardCategorySpotlight/promotion.jpg")}
                onTouchSpotlight={this.onTouchSpotlight.bind(this)}
              />
              <CardCategorySpotlight
                icon={require("../../assets/icons/png/sata_shash.png")}
                spotlight={require("../../assets/img/cardCategorySpotlight/promotion.jpg")}
                onTouchSpotlight={this.onTouchSpotlight.bind(this)}
              />
              <CardCategorySpotlight
                icon={require("../../assets/icons/png/vibrador_shash.png")}
                spotlight={require("../../assets/img/cardCategorySpotlight/promotion.jpg")}
                onTouchSpotlight={this.onTouchSpotlight.bind(this)}
              />
              <CardCategorySpotlight
                icon={require("../../assets/icons/png/anal_shash.png")}
                spotlight={require("../../assets/img/cardCategorySpotlight/promotion.jpg")}
                onTouchSpotlight={this.onTouchSpotlight.bind(this)}
              />
              <CardCategorySpotlight
                icon={require("../../assets/icons/png/vestido_shash.png")}
                spotlight={require("../../assets/img/cardCategorySpotlight/promotion.jpg")}
                onTouchSpotlight={this.onTouchSpotlight.bind(this)}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </ContainerLayout>
    );
  }
}

const mapStateProps = state => {
  return { products: state.products, categorys: state.products.categorys };
};

const mapDispatchProps = dispatch =>
  bindActionCreators({ productAll, categoryProductAll }, dispatch);

export default connect(
  mapStateProps,
  mapDispatchProps
)(App);
