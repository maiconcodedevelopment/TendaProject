import React from "react";
import { View, Text, Dimensions, ScrollView, Alert } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { productAll, categoryProductAll , promotionsAddProduct , promotionsMain } from "../../redux/actions/Products";

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
  wp,
  colors
} from "../../styles";

import CardSelectCategory from "../../components/cardSelectCategory";
import CardCategorySpotlight from "../../components/cardCategorySpotlight";

//actions route
import { navigationActionProdutcs  } from "../../router/actions/Produtcs";
import { requestCategoryProducts , requestPromotionsProduct, requestPromotionMain } from "../../redux/actions/Products/request";
import { ProductsModel } from "../../redux/model/ProductsModel";
import { URLModel } from "../../redux/model/URLModel";
import { request } from "../../config/requestConfig";
import HeaderSearch from "../../components/header";
import { navigationActionProduct } from "../../router/actions/Product";

class App extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: "App",
    header: <HeaderSearch navigation={navigation} onPress={() => navigation.toggleDrawer()} />
  });

  constructor(state) {
    super(state);
    console.log("bnai")
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

  onPressNavigation = () => {
    console.log("sim")
  }

  async componentDidMount() {
    // this.props.productAll(10);
    console.log("simsimsim")
    await requestPromotionMain().then((response) => {
      this.props.promotionsMain(response)
    })
    await requestPromotionsProduct().then((response) => {
       console.log(response)
       this.props.promotionsAddProduct(response)
    })

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

  onTouchSpotlight = (product) => {
    const { navigation } = this.props
    navigation.dispatch(navigationActionProduct(product));
    
  }

  _renderItem({ item, index }) {
    return (
      <CardCarrosel
        key={index}
        title={item.title}
        image={item.image}
        description={item.description}
      />
    );
  }

  render() {
    const { promotionsProduct , promotions } = this.props
   
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
              data={promotions}
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

          <Text style={{ paddingLeft : 25 , color : "white" , fontWeight : "bold" , fontSize : 15 , marginBottom : 15 }} >Promoções</Text>

          <View style={{ height: 190 }}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ flexGrow: 1, paddingLeft: 25 }}
              showsHorizontalScrollIndicator={false}
            >
            {
              promotionsProduct.map((promotion,index) => (
                <CardCategorySpotlight
                key={index}
                icon={promotion.category.icon}
                spotlight={promotion.image}
                onTouchSpotlight={() => this.onTouchSpotlight(promotion.product)}
                />
              ))
            }
            </ScrollView>
          </View>
        </ScrollView>
      </ContainerLayout>
    );
  }
}

const mapStateProps = state => {
  return { products: state.products, categorys: state.products.categorys , promotionsProduct : state.products.promotionsProduct , promotions : state.products.promotions };
};

const mapDispatchProps = dispatch =>
  bindActionCreators({ productAll, categoryProductAll , promotionsAddProduct , promotionsMain }, dispatch);

export default connect(
  mapStateProps,
  mapDispatchProps
)(App);
