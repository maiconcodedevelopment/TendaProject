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
import { requestAddProduct , requestPromotionsProduct, requestCategoryProducts , requestFilterCategoryWidthSubCategory , requestFilterCategoryWitdhColors , requestProductsFilter } from "../../redux/actions/Products/request";

//methos dispatch
import { userAddProduct , promotionsAddProduct , categoryProductAll , 
  filterAddIncrementProduct,
  filterResetCategory,
  filterAddProducts,
  filterUpdatePrice,
  filterAddCategory,
  filterAddTypes,
  filterAddType,
  filterAddColors,
  filterAddColor } from "../../redux/actions/Products";
import { userAddAndRemoveProduct } from "../../redux/actions/Users"

//routes dispatch
import { navigationActionFilterProducts } from "../../router/actions/FilterProducts";
import HeaderSearch from "../../components/header";
import { navigationActionProduct } from "../../router/actions/Product";
import TDStatus from "../../components/alert/td-status";
import { URLModel } from "../../redux/model/URLModel";
import { request } from "../../config/requestConfig";

class Produtcs extends React.Component {
  
  static navigationOptions = ({navigation}) => {
    return {
       header: <HeaderSearch  navigation={navigation} onPressBack={() => navigation.goBack()} onPressNavigation={() => { console.log("sim ism") } } />
    }
  };

  constructor(state) {
    super(state);
    this.state = {
      activeBarStatus : false,
      refreging: false,
      page : 1,
      filter : {}
    };
  }


  componentDidMount() {
    const { navigation , user } = this.props
    const { params } = navigation.state

    let promisefilter = new Promise((resolve, reject) => {
      resolve(this.props.filterResetCategory(params));
    }).catch(error => {
      console.log(error);
    });

    let category = new URLModel(request.category.subcategory, "GET");
    let categorycolors = new URLModel(request.colors.category, "GET");

    promisefilter
      .then(promise => {
        this.props.categorys.forEach(element => {
          if (element.active) {
            category.append("idcategory", element.id);
            categorycolors.append("idcategory", element.id);
          }
        });
        category.concatURL();
        categorycolors.concatURL();
      })
      .then(promise => {
        requestFilterCategoryWidthSubCategory(category.getURL()).then(
          response => {
            this.props.filterAddTypes(response);
          }
        );
        requestFilterCategoryWitdhColors(categorycolors.getURL()).then(
          response => {
            this.props.filterAddColors(response);
          }
        );
      });

    let products = new URLModel(request.product.all, "GET");
    products.append("categorys", params);
    products.append("iduser", user.id);
    products.append("page",this.state.page)
    products.concatURL();


    requestCategoryProducts(products.getURL()).then(response => {
      this.props.categoryProductAll(params, response);
    });

  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    console.log("----- este daqui")
  }

  resetProducts = ({ categorys , types , price  }) => {

    const { user } = this.props

    this.setState({
      page : 1,
      filter : {
        categorys : categorys,
        types : types ,
        price : price
      }
    },() => {

      let products = new URLModel(request.product.all, "GET");

      products.append("pricestart", price.start);
      products.append("priceend", price.end);
  
      categorys.map(category => {
        if (category.active) {
          products.append("categorys", category.id);
        }
      });
  
      types.map(type => {
        products.append("subcategorys", type.id);
      });
  
      products.append("iduser", user.id);
      
      products.append("page",this.state.page)
  
      products.concatURL();
  
      requestProductsFilter(products.getURL()).then(response => {
          console.log(response);
          this.props.filterAddProducts(response);
        }).then(send => {
          console.log(send)
        });
    })

    

  }

  navigatefilterProducts() {
    const { navigation } = this.props;
    navigation.dispatch(navigationActionFilterProducts({ params : { resetProducts : this.resetProducts } }));
  }

  requestProductsPage = () => {

    const { user } = this.props
    const { params } = this.props.navigation.state

    
    this.setState({
      page : this.state.page = this.state.page + 1
    },() => {

      var products = new URLModel(request.product.all, "GET");

      if (this.state.filter.hasOwnProperty("categorys") ){

        const { categorys , types , price } = this.state.filter
        
        products.append("pricestart", price.start);
        products.append("priceend", price.end);

        categorys.map(category => {
          if (category.active) {
            products.append("categorys", category.id);
          }
        });

        if(this.state.filter.hasOwnProperty("types")){
          types.map(type => {
            products.append("subcategorys", type.id);
          });
        }

       
      }else{
       
       products.append("categorys", params);

      }

      products.append("iduser", user.id);
      products.append("page",this.state.page)

      products.concatURL();

       requestCategoryProducts(products.getURL()).then(response => {
         this.props.filterAddIncrementProduct(response)
       });

    })
   
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

  activeLikeProduct(id,product) {

    const { user } = this.props


    requestAddProduct(user.id, id)
      .then(response => {

        const { like } = response

        if(like){
          this.setState({
            activeBarStatus : true
          })
        }

        this.props.userAddProduct(id);
        this.props.userAddAndRemoveProduct(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onScreenProduct(product) {
    const { navigation } = this.props;
    navigation.dispatch(navigationActionProduct({ ...product , typeProduct : "product" }));
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
            onPress={this.navigatefilterProducts.bind(this)}
          >
            <View style={styles.buttonFilter} >
                <Text style={styles.textFilter} >Filtrar</Text>
                <Image  source={require("../../assets/icons/png/filter_shash.png")} style={{ width : 25 , height : 25 }} resizeMethod="resize" resizeMode="contain" />
            </View>
            
          </TouchableNativeFeedback>
        </View>

        <FlatList
          contentContainerStyle={styles.containerProducts}
          refreshing={refreging}
          onRefresh={this.onRefreshProducts.bind(this)}
          numColumns={2}
          onEndReachedThreshold={1}
          onEndReached={() => {
            this.requestProductsPage()
          }}
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

        <TDStatus active={this.state.activeBarStatus} callbackActive={() => { this.setState({ activeBarStatus : false }) }} />
        
      </ContainerLayout>
    );
  }
}

const mapStateProps = state => ({
  user : state.user,
  products: state.products,
  categorys: state.products.categorys,
  price: state.products.filter.price,
  colors: state.products.filter.colors,
  types: state.products.filter.types
});

const mapDispatchProps = dispatch =>
  bindActionCreators({ 
    userAddProduct, 
    userAddAndRemoveProduct , 
    promotionsAddProduct , 
    categoryProductAll ,
    filterAddIncrementProduct,
    filterResetCategory,
    filterAddProducts,
    filterUpdatePrice,
    filterAddCategory,
    filterAddTypes,
    filterAddType,
    filterAddColors,
    filterAddColor }, dispatch);

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
    marginTop: 100,
    paddingBottom : 15,
  },
  textFilter : {
    color : colors.lightSlash,
    fontSize : 16,
    marginRight : 5
  },
  buttonFilter: {
    borderBottomColor: colors.slashStrong,
    borderWidth: 2,
    borderLeftWidth: -50,
    borderRadius : 4,
    borderColor : colors.lightSlash,
    alignItems : "center",
    flexDirection : "row",
    padding : 5
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
