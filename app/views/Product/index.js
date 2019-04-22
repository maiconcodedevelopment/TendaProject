import React from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback,
  Touchable,
  Image,
  Easing
} from "react-native";

import { connect } from "react-redux";

import { IconNode } from "react-native-elements";
import { width, colors } from "../../styles";
import ContainerLayout from "../../components/containerLayout";

import { LinearGradient } from "expo"
import { requestProductrelated } from "../../redux/actions/Products/request";
import { navigationActionProduct } from "../../router/actions/Product";
import { CardProduct } from "../../components/cardProduct";

HEIGHT_CARD_PRODUCTS = 300;
HEIGHT_CARD_PRODUCTS_MIN = 100;

SIZE_BUTTON_LIKE = 60;

class Product extends React.Component {


  static navigationOptions = ({navigation}) => {
    return {
      header : null
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      productsList : [
     
      ],
      id : this.props.navigation.state.params.id,
      scrollY: new Animated.Value(0),
      like : new Animated.Value(0)
    };
  }

  async componentDidMount(){
    await requestProductrelated(this.state.id,1).then((response) => {
      console.log("products list related")
      this.setState((state) => {
        return {
          productsList : response
        }
      })
    })
  }

  componentWillUpdate(nextProps) {
    console.warn(nextProps);
  }

  screenLikeProduct = () => {
    Animated.sequence([
      Animated.timing(this.state.like, {
        toValue: 1.5,
        duration: 1000,
        easing: Easing.bounce
      }),
      Animated.timing(this.state.like, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce
      })
    ]).start();
  }

  getProduct() {}

  activeLikeProduct(){

  }

  onScreenProduct(product) {
    const { navigation } = this.props;
    navigation.dispatch(navigationActionProduct(product));
  }

  activeLike(active) {
    if (active) {
      return require("../../assets/icons/png/love_shash_black.png");
    } else {
      return require("../../assets/icons/png/love_white.png");
    }
  }

  render() {
    const { productsList } = this.state
    const { navigation  } = this.props;
    const { images , name , descont , price , category , like , subcategory , times  } = navigation.state.params;

    console.log(this.props.products)
    console.log("------------asdfasdfds")

    console.log(navigation.state.params)

    const heightProduct = {
      height: HEIGHT_CARD_PRODUCTS
    };

    const heightAnimtedScroll = this.state.scrollY.interpolate({
      inputRange: [0, HEIGHT_CARD_PRODUCTS - HEIGHT_CARD_PRODUCTS_MIN],
      outputRange: [HEIGHT_CARD_PRODUCTS, HEIGHT_CARD_PRODUCTS_MIN],
      extrapolate: "clamp"
    });

    const topAnimtedScroll = this.state.scrollY.interpolate({
      inputRange: [0, HEIGHT_CARD_PRODUCTS - HEIGHT_CARD_PRODUCTS_MIN],
      outputRange: [
        HEIGHT_CARD_PRODUCTS - (SIZE_BUTTON_LIKE + 15),
        HEIGHT_CARD_PRODUCTS_MIN - SIZE_BUTTON_LIKE / 2
      ],
      extrapolate: "clamp"
    });

    const rightAnimtedScroll = this.state.scrollY.interpolate({
      inputRange: [0, HEIGHT_CARD_PRODUCTS - HEIGHT_CARD_PRODUCTS_MIN],
      outputRange: [width / 2 - SIZE_BUTTON_LIKE / 2, 20],
      extrapolate: "clamp"
    });

    let ChipTagProduct = props => (
      <View style={[props.style,{ paddingHorizontal : 25 , paddingVertical : 10 , overflow : "hidden" , justifyContent : "center" , alignItems : "center" , borderColor : "white" , borderWidth : 1 }]} >
         <Text style={{ color : "white" }} >{ props.name }</Text>
      </View>
    )

    return (
      <ContainerLayout style={{ flex: 1 , width : width }}>

      <TouchableOpacity>
        <Animated.View
          style={{
            width: SIZE_BUTTON_LIKE,
            height: SIZE_BUTTON_LIKE,
            backgroundColor: colors.lightSlash,
            position: "absolute",
            top: topAnimtedScroll,
            right: rightAnimtedScroll,
            zIndex: 2,
            borderRadius: SIZE_BUTTON_LIKE / 2,
            marginLeft: 10,
            alignItems : "center",
            justifyContent : "center",
          }}
        >
        {/* <TouchableNativeFeedback onPress={this.screenLikeProduct()} > */}
         <Image style={{ width : 40 , height : 40 }} source={this.activeLike(false)} />
         {/* </TouchableNativeFeedback> */}
        </Animated.View>
        </TouchableOpacity>

        <Animated.ScrollView
          style={[
            {
              height: heightAnimtedScroll,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1
            }
          ]}
          //   onScrollBeginDrag={() => console.warn("sim")}
          contentOffset={c => console.warn(c)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          {images.map((image, index) => (
            <Animated.View
              key={index}
              style={[{ width, flex: 1, backgroundColor: "white" }]}
            >
              <ImageBackground
                source={{ uri: image }}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </Animated.View>
          ))}
        </Animated.ScrollView>

        {/* <Animated.View style={{ width : width , height : heightAnimtedScroll }} ></Animated.View> */}

        <Animated.ScrollView
          style={{
            paddingTop: heightAnimtedScroll,
            flex: 1
          }}
          contentContainerStyle={{ paddingTop : 25 }}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          <View style={{paddingLeft : 30}} >  
              <Text style={styles.title} >
                 { name }
              </Text>
    
              <View style={{ marginBottom : 45 }} >
                <Text style={styles.price} >
                    $ { price }
                </Text>
                <Text style={styles.times} >{times} x sem juros</Text>
              </View>
    
              <View style={{ marginBottom : 30 }} >
                <TouchableOpacity>
                  <Text style={{ fontSize : 12 , fontWeight : "500" , color : "white" , paddingBottom : 3 }} >Sobre Produto</Text>
                  <View style={{ borderBottomColor : colors.lightSlash , borderBottomWidth : 2 , width : 70  }} >
      
                  </View>
                </TouchableOpacity>
              </View>
          </View>
         
          <View style={{ marginBottom : 30 }} >
            <FlatList
              keyExtractor={(item,index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft : 30 }}
              data={[ { name : "Vibrador" } , { name : "Holder" } , { name : "Produto" } , { name : "Page" } ]}
              renderItem={({item}) => (
                <ChipTagProduct style={{ marginRight : 10 }} name={item.name} />
              )}
            />
          </View>

          <View style={{ paddingLeft : 30 , marginBottom : 15 }}>
             <Text style={{ fontSize  : 18 , color : "white" , fontWeight : "500" }} >Produtos Relacionados</Text>
          </View>

          <View style={{ marginBottom : 200 }} >

          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft : 25 }} horizontal={true}  >
             {
               productsList.map((item) => {
                console.log(item) 
                return (
                  <View key={item.id} >
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
               
                 </View>
                 )  
             })
             }
          </ScrollView>
          </View>


        </Animated.ScrollView>
      </ContainerLayout>
    );
  }
}

const mapStateProps = state => ({
  products : state.products.products
});

export default connect(mapStateProps)(Product);

const styles = StyleSheet.create({
  cardProductView: {
    flex: 1,
    width
  },
  likeLove: {},
  title : {
    fontSize : 25 , fontWeight : "bold" , width : 250 , color : "#fb4570" , marginBottom : 30
  },
  price : {
    fontSize : 30 , fontWeight : "bold" , color : "white" 
  },
  times : {
    fontSize : 14 , fontWeight : "500" , color : "white" 
  }
});
